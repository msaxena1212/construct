'use strict';

/**
 * Vision Language Model (VLM) Site Inspection Service for DPR Photos.
 * Performs multimodal PPE safety compliance detection and physical progress estimation
 * strictly via aiService.analyzeMedia(). Never invents simulated results if AI is unavailable
 * or the image binary cannot be read.
 */
const fs = require('fs');
const db = require('../../../models');
const aiService = require('../../../core/services/ai.service');
const { modelConfig } = require('../../../core/services/model_config');

const VLM_ACTION_TYPE = 'VLM_DPR_INSPECTION';

function safeParse(text) {
  try {
    return typeof text === 'string' ? JSON.parse(text) : text;
  } catch {
    return null;
  }
}

function normalizeViolation(v) {
  const sevRaw = String(v?.severity || 'medium').toLowerCase();
  const severity = ['critical', 'high', 'medium', 'low'].includes(sevRaw) ? sevRaw : 'medium';
  return {
    severity,
    hazard: String(v?.hazard || v?.issue || 'PPE / Site Safety Hazard').slice(0, 200),
    zone: v?.zone ? String(v.zone).slice(0, 100) : 'Site Photo Area',
    recommended_action: String(v?.recommended_action || 'Verify PPE compliance and rectify immediately.').slice(0, 400),
  };
}

/**
 * Runs VLM PPE & construction progress analysis on a single DPR image row.
 * Optionally accepts base64/mimeType override (for direct upload buffers or test fixtures);
 * otherwise reads the stored local file from `imageRow.file_key`.
 */
async function inspectDprImage({ company_id, project_id, imageRow, user_id = null, imageBase64 = null, mimeType = null }) {
  if (!imageRow || Number(imageRow.company_id) !== Number(company_id) || Number(imageRow.project_id) !== Number(project_id)) {
    const err = new Error('DPR image not found in this project.');
    err.status = 404;
    throw err;
  }

  let base64 = imageBase64;
  const resolvedMime = mimeType || imageRow.mime_type || 'image/jpeg';

  if (!base64) {
    if (!imageRow.file_key || !fs.existsSync(imageRow.file_key)) {
      const err = new Error('Image binary is not readable from local storage for VLM inspection.');
      err.status = 422;
      throw err;
    }
    base64 = fs.readFileSync(imageRow.file_key).toString('base64');
  }

  const prompt = `Inspect this construction site DPR photograph for:
1. Worker PPE safety compliance (hard hats, high-visibility vests, safety harnesses at height, safety footwear, edge protection).
2. Current construction stage and estimated completion percentage for the visible activity.
3. Site housekeeping score (0-100).

Return ONLY strict JSON matching:
{
  "ppe_compliant": boolean,
  "ppe_violations": [
    { "severity": "critical" | "high" | "medium" | "low", "hazard": "string", "zone": "string", "recommended_action": "string" }
  ],
  "observed_stage": "string",
  "estimated_progress_pct": number,
  "housekeeping_score": number,
  "summary": "string"
}`;

  const raw = await aiService.analyzeMedia({
    prompt,
    imageParts: [{ inlineData: { mimeType: resolvedMime, data: base64 } }],
    responseFormat: 'json',
  });

  if (!raw || typeof raw !== 'object' || typeof raw.summary !== 'string' || !raw.summary.trim()) {
    throw new aiService.AIUnavailableError('VLM returned an incomplete site inspection response.', 'AI_INVALID_JSON');
  }

  const violations = Array.isArray(raw.ppe_violations) ? raw.ppe_violations.map(normalizeViolation) : [];
  const ppeCompliant = typeof raw.ppe_compliant === 'boolean' ? raw.ppe_compliant : violations.length === 0;
  const estimatedProgressPct = Math.max(0, Math.min(100, Math.round(Number(raw.estimated_progress_pct || 0))));
  const housekeepingScore = Math.max(0, Math.min(100, Math.round(Number(raw.housekeeping_score ?? 80))));
  const observedStage = String(raw.observed_stage || 'General Construction Work').slice(0, 120);
  const cfg = modelConfig();

  // Auto-escalate critical/high PPE hazards into the project's Snag / HSE register
  const escalatedSnagIds = [];
  for (const v of violations.filter((item) => item.severity === 'critical' || item.severity === 'high')) {
    const snag = await db.snag_item.create({
      company_id,
      project_id,
      title: `[VLM HSE] ${v.hazard}`.slice(0, 255),
      description: `${v.recommended_action}\n\nDetected automatically by VLM inspection on DPR #${imageRow.dpr_id} (${imageRow.file_name}).`,
      trade: 'HSE / Safety',
      location_pin: v.zone || 'DPR Photo Area',
      severity: v.severity,
      status: 'open',
      photo_url: imageRow.file_url || null,
      reported_by: user_id,
    });
    escalatedSnagIds.push(snag.id);
  }

  const record = {
    dpr_id: imageRow.dpr_id,
    image_id: imageRow.id,
    file_name: imageRow.file_name,
    file_url: imageRow.file_url,
    ppe_compliant: ppeCompliant,
    ppe_violations: violations,
    observed_stage: observedStage,
    estimated_progress_pct: estimatedProgressPct,
    housekeeping_score: housekeepingScore,
    summary: raw.summary.trim().slice(0, 1000),
    escalated_snag_ids: escalatedSnagIds,
    model: `${cfg.provider}:${cfg.model}`,
    inspected_at: new Date().toISOString(),
  };

  const historyRow = await db.project_history.create({
    company_id,
    project_id,
    user_id,
    action_type: VLM_ACTION_TYPE,
    detail: `VLM inspected ${imageRow.file_name}: ${observedStage} (${estimatedProgressPct}%), PPE ${ppeCompliant ? 'Compliant' : `${violations.length} violation(s)`}`,
    meta: JSON.stringify(record),
  });

  return { id: historyRow.id, ...record };
}

async function listVlmInspections({ company_id, project_id, limit = 50 }) {
  const rows = await db.project_history.findAll({
    where: { company_id, project_id, action_type: VLM_ACTION_TYPE },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
    limit: Math.min(Math.max(Number(limit) || 50, 1), 200),
  });
  return rows.map((r) => {
    const meta = safeParse(r.meta) || {};
    return { id: r.id, at: r.createdAt, detail: r.detail, ...meta };
  });
}

module.exports = { inspectDprImage, listVlmInspections, VLM_ACTION_TYPE };
