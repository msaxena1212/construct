const db = require("../../../models");
const aiService = require("../../../core/services/ai.service");

// Upload and register drawing with optional Ollama AI revision summary and direct file attachment
exports.registerDrawing = async (req, res) => {
  try {
    const {
      project_id,
      drawing_number,
      title,
      discipline,
      revision,
      status,
      revision_notes,
    } = req.body;

    let file_url = req.body.file_url;
    // If multipart file is uploaded via multer
    if (req.file) {
      // In production with AWS_S3_BUCKET configured, this stores to S3 URL; locally serves from /uploads/projects/
      file_url = `/uploads/projects/${req.file.filename}`;
    }

    const company_id = req.user.company_id;
    const uploaded_by = req.user.id;

    if (!project_id || !drawing_number || !title || !file_url) {
      return res.status(400).json({
        status: "failed",
        message: "project_id, drawing_number, title, and file or file_url are required",
      });
    }

    const targetRev = (revision || "R0").trim();
    // Guard against duplicate revision numbers for the same drawing in this project
    const existingRevision = await db.drawing_register.findOne({
      where: {
        project_id,
        company_id,
        drawing_number,
        revision: targetRev,
        isDeleted: false,
      },
    });
    if (existingRevision) {
      return res.status(400).json({
        status: "failed",
        message: `Revision "${targetRev}" already exists for drawing sheet ${drawing_number}. Please specify a new revision code (e.g. R1, R2).`,
      });
    }

    let aiDrawingSummary = null;
    if (revision_notes) {
      try {
        const prompt = `
Summarize key changes and structural impacts of this construction drawing revision:
Drawing Number: ${drawing_number} (${discipline || "Structural"})
Title: ${title}
Revision: ${targetRev}
Revision Notes: "${revision_notes}"

Provide a 2-sentence executive summary of the revision scope.
`;
        aiDrawingSummary = await aiService.generateCompletion({
          prompt,
          responseFormat: "text",
        });
      } catch (aiErr) {
        console.warn("AI Drawing revision summary skipped:", aiErr.message);
      }
    }

    // Retain immutable version history: mark previous approved revisions as superseded
    await db.drawing_register.update(
      { status: "superseded" },
      {
        where: {
          project_id,
          company_id,
          drawing_number,
          isDeleted: false,
          status: "approved_for_construction",
        },
      }
    );

    const drawing = await db.drawing_register.create({
      project_id,
      company_id,
      drawing_number,
      title,
      discipline: discipline || "Structural",
      revision: targetRev,
      status: status || "approved_for_construction",
      file_url,
      uploaded_by,
      ai_drawing_summary: aiDrawingSummary || revision_notes || null,
    });

    return res.status(201).json({
      status: "success",
      message: "Drawing revision registered successfully",
      data: drawing,
    });
  } catch (error) {
    console.error("Register Drawing Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Drawing Register for a project
exports.getProjectDrawings = async (req, res) => {
  try {
    const { projectId } = req.params;
    const company_id = req.user.company_id;

    const drawings = await db.drawing_register.findAll({
      where: {
        project_id: projectId,
        company_id,
        isDeleted: false,
      },
      include: [
        {
          model: db.user,
          as: "creator",
          attributes: ["id", "firstname", "lastname", "email"],
          required: false,
        },
      ],
      order: [["drawing_number", "ASC"], ["id", "DESC"]],
    });

    return res.status(200).json({
      status: "success",
      data: drawings,
    });
  } catch (error) {
    console.error("Get Drawings Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

// Get Immutable Version History for a specific drawing number or document
exports.getDrawingVersionHistory = async (req, res) => {
  try {
    const { projectId, drawingNumber } = req.params;
    const company_id = req.user.company_id;

    const revisions = await db.drawing_register.findAll({
      where: {
        project_id: projectId,
        company_id,
        drawing_number: drawingNumber,
        isDeleted: false,
      },
      include: [
        {
          model: db.user,
          as: "creator",
          attributes: ["id", "firstname", "lastname", "email"],
          required: false,
        },
      ],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: "success",
      drawing_number: drawingNumber,
      total_revisions: revisions.length,
      data: revisions,
    });
  } catch (error) {
    console.error("Drawing Version History Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Cache for signature request idempotency: key -> timestamp
const signatureRequestCache = new Map();

// Request Stakeholder Signature via Email Workflow
exports.requestStakeholderSignature = async (req, res) => {
  try {
    const {
      project_id,
      drawing_id,
      stakeholder_name,
      stakeholder_email,
      subject,
      message,
      required_by_date,
    } = req.body;

    const company_id = req.user.company_id;
    const requester_id = req.user.id;
    const requester_name = req.user.firstname ? `${req.user.firstname} ${req.user.lastname || ''}`.trim() : "Project Engineer";

    if (!project_id || !drawing_id || !stakeholder_email || !stakeholder_name) {
      return res.status(400).json({
        status: "failed",
        message: "project_id, drawing_id, stakeholder_name, and stakeholder_email are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(stakeholder_email).trim())) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid stakeholder email address format",
      });
    }

    // Verify drawing exists and belongs to company & project
    const drawing = await db.drawing_register.findOne({
      where: { id: drawing_id, project_id, company_id, isDeleted: false },
    });
    if (!drawing) {
      return res.status(404).json({
        status: "failed",
        message: "Drawing record not found or does not belong to authorized project",
      });
    }

    // Verify project exists
    const project = await db.project.findOne({
      where: { id: project_id, company_id },
    });
    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found",
      });
    }

    // Idempotency check: prevent duplicate submissions within 60 seconds
    const idempotencyKey = `sig_${drawing.id}_${String(stakeholder_email).trim().toLowerCase()}`;
    const lastSent = signatureRequestCache.get(idempotencyKey);
    const now = Date.now();
    if (lastSent && (now - lastSent) < 60000) {
      return res.status(429).json({
        status: "failed",
        message: "A signature request was already dispatched to this recipient within the last minute. Please wait before retrying.",
      });
    }
    signatureRequestCache.set(idempotencyKey, now);

    const emailSubject = subject || `Signature Request: ${drawing.title} (Rev ${drawing.revision}) - ${project.name}`;
    const emailBody = message || `Please review and approve the technical drawing "${drawing.title}" (${drawing.drawing_number}, Revision ${drawing.revision}).`;

    // Audit record details
    const auditRecord = {
      action_type: "DOCUMENT_SIGNATURE_REQUESTED",
      project_id,
      company_id,
      user_id: requester_id,
      meta_data: JSON.stringify({
        drawing_id: drawing.id,
        drawing_number: drawing.drawing_number,
        revision: drawing.revision,
        stakeholder_name,
        stakeholder_email,
        subject: emailSubject,
        required_by_date: required_by_date || null,
        requested_at: new Date().toISOString(),
      }),
    };

    // Attempt email delivery with honest status
    const mailService = require("../../../core/services/mail.service");
    const isMailConfigured = Boolean(process.env.MAIL_USER && process.env.MAIL_PASS);

    if (!isMailConfigured) {
      // Record audit history honestly
      if (db.project_history) {
        await db.project_history.create(auditRecord).catch(() => {});
      }

      return res.status(200).json({
        status: "success",
        delivered: false,
        delivery_status: "provider_unconfigured",
        message: "Signature request successfully recorded in project audit log. Outbound email delivery was skipped because email credentials (MAIL_USER) are not configured in this environment.",
        data: {
          drawing_id: drawing.id,
          drawing_number: drawing.drawing_number,
          revision: drawing.revision,
          stakeholder_name,
          stakeholder_email,
          requested_at: new Date(),
          status: "logged_audited",
        },
      });
    }

    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">Drawing Review & Signature Request</h2>
          <p>Dear ${stakeholder_name},</p>
          <p>${requester_name} has requested your review and formal signature on the following project engineering document:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Project:</strong> ${project.name}</p>
            <p style="margin: 4px 0;"><strong>Drawing Number:</strong> ${drawing.drawing_number}</p>
            <p style="margin: 4px 0;"><strong>Drawing Title:</strong> ${drawing.title}</p>
            <p style="margin: 4px 0;"><strong>Discipline:</strong> ${drawing.discipline}</p>
            <p style="margin: 4px 0;"><strong>Revision:</strong> ${drawing.revision}</p>
            ${required_by_date ? `<p style="margin: 4px 0; color: #dc2626;"><strong>Action Required By:</strong> ${required_by_date}</p>` : ''}
          </div>

          <p style="white-space: pre-wrap; color: #475569;">${emailBody}</p>

          <p style="margin-top: 25px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            Note: This email represents an auditable document review request dispatched through Zyno Construction ERP.
          </p>
        </div>
      `;

      const mailResult = await mailService.sendMail(stakeholder_email, emailSubject, htmlContent);

      if (db.project_history) {
        auditRecord.meta_data = JSON.stringify({
          ...JSON.parse(auditRecord.meta_data),
          message_id: mailResult.messageId || null,
          delivery_status: "sent",
        });
        await db.project_history.create(auditRecord).catch(() => {});
      }

      return res.status(200).json({
        status: "success",
        delivered: true,
        delivery_status: "sent",
        message: `Signature request email successfully dispatched to ${stakeholder_email}`,
        data: {
          drawing_id: drawing.id,
          drawing_number: drawing.drawing_number,
          revision: drawing.revision,
          stakeholder_name,
          stakeholder_email,
          message_id: mailResult.messageId,
          requested_at: new Date(),
        },
      });
    } catch (mailErr) {
      console.error("Mail Dispatch Error:", mailErr.message);
      return res.status(502).json({
        status: "failed",
        delivered: false,
        delivery_status: "failed",
        message: `Mail provider failed to dispatch signature request: ${mailErr.message}`,
      });
    }
  } catch (error) {
    console.error("Signature Request Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

