'use strict';
/**
 * Images attached to a daily progress report.
 *   POST /dpr/:id/images   multipart field "images", one or more files
 *   GET  /dpr/:id/images   list the images of the report
 *
 * Rules (owner decision, 2026-11-02): at most 10 images per report; each JPG, PNG or WEBP and at most 10 MB.
 * The declared MIME type and the file's first bytes must both agree, so a renamed file is refused. Every file in a
 * request is checked before any file is stored, so a rejected request leaves nothing behind.
 */
const multer = require('multer');
const db = require('../../../models');
const storage = require('../../../core/services/storage.service');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');
const vlmInspector = require('../services/vlm_inspector.service');

const MAX_IMAGES_PER_REPORT = 10;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Identifies the real image type from the file's leading bytes. Returns null when it is not a supported image. */
function sniffImageType(buffer) {
  if (!buffer || buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
    return 'image/webp';
  }
  return null;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES, files: MAX_IMAGES_PER_REPORT },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      const err = new Error('Only JPG, PNG and WEBP images are allowed.');
      err.status = 400;
      return cb(err);
    }
    return cb(null, true);
  },
});

/** Runs multer and turns its errors into the same JSON shape the rest of the API uses. */
function uploadMiddleware(req, res, next) {
  upload.array('images', MAX_IMAGES_PER_REPORT)(req, res, (err) => {
    if (!err) return next();
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : err.status || 400;
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Each image must be 10 MB or smaller.'
        : err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE'
          ? `Attach at most ${MAX_IMAGES_PER_REPORT} images in one request.`
          : err.message;
    return res.status(status).json({ status: 'failed', message });
  });
}

async function findReport(req, res) {
  const dpr = await db.dpr.findOne({ where: { id: req.params.id, company_id: req.user.company_id } });
  if (!dpr) {
    res.status(404).json({ status: 'failed', message: 'Daily progress report not found.' });
    return null;
  }
  await assertProjectAccess(req, dpr.project_id);
  return dpr;
}

exports.uploadMiddleware = uploadMiddleware;

exports.uploadImages = async (req, res) => {
  try {
    const dpr = await findReport(req, res);
    if (!dpr) return undefined;

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ status: 'failed', message: 'Attach at least one image in the "images" field.' });
    }

    // Validate every file before anything is stored.
    for (const file of files) {
      if (sniffImageType(file.buffer) !== file.mimetype) {
        return res.status(400).json({
          status: 'failed',
          message: `"${file.originalname}" is not a valid ${file.mimetype.replace('image/', '').toUpperCase()} image.`,
        });
      }
    }

    const existing = await db.dpr_image.count({ where: { dpr_id: dpr.id, company_id: req.user.company_id } });
    if (existing + files.length > MAX_IMAGES_PER_REPORT) {
      return res.status(400).json({
        status: 'failed',
        message: `This report has ${existing} image(s). The limit is ${MAX_IMAGES_PER_REPORT}; ${MAX_IMAGES_PER_REPORT - existing} more can be added.`,
      });
    }

    const created = [];
    for (const file of files) {
      const stored = await storage.uploadFile(file, 'dpr');
      const row = await db.dpr_image.create({
        company_id: req.user.company_id,
        project_id: dpr.project_id,
        dpr_id: dpr.id,
        file_name: file.originalname.slice(0, 255),
        file_url: stored.url,
        file_key: stored.key,
        mime_type: file.mimetype,
        size_bytes: file.size,
        uploaded_by: req.user.id,
      });
      created.push(row);
    }

    return res.status(201).json({ status: 'success', data: created });
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    console.error('DPR image upload failed:', err.message);
    return res.status(500).json({ status: 'failed', message: 'Image upload failed.' });
  }
};

exports.listImages = async (req, res) => {
  try {
    const dpr = await findReport(req, res);
    if (!dpr) return undefined;
    const rows = await db.dpr_image.findAll({
      where: { dpr_id: dpr.id, company_id: req.user.company_id },
      order: [['id', 'ASC']],
    });
    return res.json({ status: 'success', data: rows });
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    console.error('DPR image list failed:', err.message);
    return res.status(500).json({ status: 'failed', message: 'Could not load images.' });
  }
};

/**
 * GET /dpr/images/:imageId/file. Streams one image to a user of the owning company with read access to the project.
 * Only the local storage driver is served here. Other drivers return 501 until they are configured.
 */
exports.streamImage = async (req, res) => {
  try {
    const image = await db.dpr_image.findOne({ where: { id: req.params.imageId, company_id: req.user.company_id } });
    if (!image) return res.status(404).json({ status: 'failed', message: 'Image not found.' });
    await assertProjectAccess(req, image.project_id);
    if (storage.driver !== 'local') {
      return res.status(501).json({ status: 'failed', message: 'Image streaming is available for local storage only.' });
    }
    res.setHeader('Content-Type', image.mime_type);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'private, max-age=3600');
    return res.sendFile(image.file_key, (err) => {
      if (err && !res.headersSent) res.status(404).json({ status: 'failed', message: 'Image file is missing.' });
    });
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    console.error('DPR image stream failed:', err.message);
    return res.status(500).json({ status: 'failed', message: 'Could not load the image.' });
  }
};

exports.inspectImageVlm = async (req, res) => {
  try {
    const image = await db.dpr_image.findOne({
      where: { id: req.params.imageId, dpr_id: req.params.id, company_id: req.user.company_id },
    });
    if (!image) return res.status(404).json({ status: 'failed', message: 'Image not found.' });
    await assertProjectAccess(req, image.project_id);

    const data = await vlmInspector.inspectDprImage({
      company_id: req.user.company_id,
      project_id: image.project_id,
      imageRow: image,
      user_id: req.user.id,
    });
    return res.status(200).json({ status: 'success', data });
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    if (err.status) return res.status(err.status).json({ status: 'failed', message: err.message, code: err.code });
    console.error('VLM DPR inspection failed:', err.message);
    return res.status(500).json({ status: 'failed', message: 'VLM inspection failed.' });
  }
};

exports.sniffImageType = sniffImageType;
exports.MAX_IMAGES_PER_REPORT = MAX_IMAGES_PER_REPORT;
exports.MAX_IMAGE_BYTES = MAX_IMAGE_BYTES;
