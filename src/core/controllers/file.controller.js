const path = require("path");
const fs = require("fs");
const db = require("../../models");
const { assertProjectAccess, handleAccessError } = require("../utils/access");

// Approved storage root directories
const STATIC_UPLOADS_DIR = path.resolve(__dirname, "../../static/uploads");
const VAR_UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

/**
 * Validates filename against path traversal, control chars, and null bytes.
 * Must match standard alphanumeric, timestamp, hyphen, underscore, and safe extensions.
 */
function sanitizeFilename(filename) {
  if (!filename || typeof filename !== "string") return null;
  // Strict basename check to forbid '..' or '/' or '\'
  const base = path.basename(filename);
  if (base !== filename) return null;
  if (!/^[a-zA-Z0-9_\-\.]+$/.test(base)) return null;
  return base;
}

/**
 * Authenticated & Authorized File Handler
 * GET /api/v1/files/:category/:filename
 */
async function serveProtectedFile(req, res) {
  try {
    const category = req.params.category;
    const safeFilename = sanitizeFilename(req.params.filename);

    if (!safeFilename) {
      return res.status(400).json({ status: "failed", message: "Invalid filename or path traversal detected" });
    }

    const company_id = req.user.company_id;

    // Locate the physical file across allowed storage roots
    let resolvedFilePath = null;
    const possiblePaths = [
      path.join(STATIC_UPLOADS_DIR, category, safeFilename),
      path.join(VAR_UPLOADS_DIR, category, safeFilename)
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        // Enforce strict containment within allowed root directory
        const resolved = path.resolve(p);
        if (resolved.startsWith(STATIC_UPLOADS_DIR) || resolved.startsWith(VAR_UPLOADS_DIR)) {
          resolvedFilePath = resolved;
          break;
        }
      }
    }

    if (!resolvedFilePath) {
      return res.status(404).json({ status: "failed", message: "File not found" });
    }

    // Ownership & Tenant Authorization Check by Category
    const fileRelativeUrl = `/uploads/${category}/${safeFilename}`;

    if (category === "avatars") {
      // User avatar: Must belong to a user in the same company
      const user = await db.user.findOne({
        where: { avatar: fileRelativeUrl, company_id }
      });
      if (!user) {
        return res.status(403).json({ status: "failed", message: "Access denied to avatar" });
      }
    } else if (category === "projects") {
      // Could be a drawing, a project document, or a project thumbnail
      const drawing = await db.drawing_register.findOne({
        where: { file_url: fileRelativeUrl, company_id }
      });

      if (drawing) {
        // Verify project access under current PROJECT_ACCESS_MODE
        await assertProjectAccess(req, drawing.project_id);
      } else {
        const doc = await db.project_document.findOne({
          where: { url: fileRelativeUrl }
        });

        if (doc) {
          await assertProjectAccess(req, doc.project_id);
        } else {
          // Check if project thumbnail
          const project = await db.project.findOne({
            where: { thumbnail: fileRelativeUrl, company_id }
          });
          if (project) {
            await assertProjectAccess(req, project.id);
          } else {
            return res.status(404).json({ status: "failed", message: "Document record not found or access denied" });
          }
        }
      }
    } else if (category === "contracts") {
      // Vendor contracts: verify vendor belongs to caller's company
      const vendors = await db.vendors.findAll({
        where: { company_id },
        attributes: ["id", "contract_file", "project_id"]
      });

      const matchedVendor = vendors.find(v => {
        if (!v.contract_file) return false;
        try {
          const files = JSON.parse(v.contract_file);
          if (Array.isArray(files)) return files.includes(fileRelativeUrl);
        } catch {
          return v.contract_file === fileRelativeUrl;
        }
        return false;
      });

      if (!matchedVendor) {
        return res.status(403).json({ status: "failed", message: "Access denied to contract file" });
      }

      if (matchedVendor.project_id) {
        await assertProjectAccess(req, matchedVendor.project_id);
      }
    } else if (category === "tasks") {
      // Task attachment: check task -> project belongs to caller's company
      const attachment = await db.task_attachment.findOne({
        where: { url: fileRelativeUrl },
        include: [{
          model: db.project_task,
          attributes: ["project_id"]
        }]
      });

      if (!attachment || !attachment.PROJECT_TASK) {
        return res.status(404).json({ status: "failed", message: "Task attachment not found or access denied" });
      }

      await assertProjectAccess(req, attachment.PROJECT_TASK.project_id);
    } else {
      // Unrecognized private category
      return res.status(403).json({ status: "failed", message: "Unauthorized file category" });
    }

    // Set secure headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res.sendFile(resolvedFilePath);

  } catch (err) {
    if (handleAccessError(err, res)) return;
    console.error("[serveProtectedFile]", err && err.message);
    return res.status(500).json({ status: "failed", message: "Internal server error" });
  }
}

module.exports = {
  serveProtectedFile,
  sanitizeFilename
};
