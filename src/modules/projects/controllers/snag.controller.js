const db = require("../../../models");
const aiService = require("../../../core/services/ai.service");

// Helper to normalize and deduplicate defect tags
function normalizeDefectTags(rawTags) {
  if (!rawTags) return [];
  let list = [];
  if (Array.isArray(rawTags)) {
    list = rawTags;
  } else if (typeof rawTags === 'string') {
    try {
      const parsed = JSON.parse(rawTags);
      if (Array.isArray(parsed)) list = parsed;
      else list = rawTags.split(',');
    } catch {
      list = rawTags.split(',');
    }
  }
  const seen = new Set();
  const normalized = [];
  for (const t of list) {
    if (!t) continue;
    const clean = String(t)
      .trim()
      .replace(/^#+/, '')
      .replace(/^[\[\]"']+/, '')
      .replace(/[\[\]"']+$/, '')
      .trim();
    if (clean && clean.length <= 50 && !seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      normalized.push(clean);
      if (normalized.length >= 20) break;
    }
  }
  return normalized;
}

// Create a snag / punch list item with optional voice note transcription & AI defect classification
exports.createSnag = async (req, res) => {
  try {
    const {
      project_id,
      title,
      description,
      voice_note_text,
      location_pin,
      trade,
      severity,
      assigned_to,
      vendor_id,
      photo_url,
      due_date,
      ai_defect_tags,
    } = req.body;

    const company_id = req.user.company_id;

    if (!project_id || (!title && !voice_note_text)) {
      return res.status(400).json({
        status: "failed",
        message: "project_id and title or voice_note_text are required",
      });
    }

    let finalTitle = title;
    let finalDesc = description;
    let finalTrade = trade;
    let finalSeverity = severity || "medium";
    let extractedAiTags = [];

    // If voice note transcribed text is passed or automated classification requested
    if (voice_note_text) {
      try {
        const prompt = `
Analyze this construction field defect audio/transcription text and classify it:
Text: "${voice_note_text}"

Extract:
1. title: concise defect summary title
2. description: detailed description of defect
3. trade: one of (Civil, Electrical, Plumbing, HVAC, Carpentry, Painting, Finishing, Structural)
4. severity: one of (low, medium, high, critical)
5. tags: array of short classification keywords (e.g. ["honeycomb", "concrete", "spalling"])

Respond in strict JSON format:
{
  "title": "string",
  "description": "string",
  "trade": "string",
  "severity": "string",
  "tags": ["string"]
}
`;
        const aiResult = await aiService.generateCompletion({ prompt, responseFormat: "json" });
        if (aiResult) {
          finalTitle = finalTitle || aiResult.title;
          finalDesc = finalDesc || aiResult.description;
          finalTrade = finalTrade || aiResult.trade;
          finalSeverity = finalSeverity || aiResult.severity;
          extractedAiTags = aiResult.tags || [];
        }
      } catch (aiErr) {
        console.warn("AI Defect classification skipped:", aiErr.message);
        // The transcript is the user's own text. Keep it, rather than leaving the defect with no description.
        const transcript = String(voice_note_text).trim();
        if (!finalDesc) finalDesc = transcript;
        if (!finalTitle) finalTitle = transcript.split(/\s+/).slice(0, 6).join(" ");
      }
    }

    const explicitTags = normalizeDefectTags(ai_defect_tags);
    const finalTags = normalizeDefectTags([...explicitTags, ...extractedAiTags]);

    const snag = await db.snag_item.create({
      project_id,
      company_id,
      title: finalTitle || "Field Defect",
      description: finalDesc,
      location_pin,
      trade: finalTrade,
      severity: finalSeverity,
      assigned_to,
      vendor_id,
      photo_url,
      ai_defect_tags: finalTags,
      due_date,
      status: "open",
    });

    return res.status(201).json({
      status: "success",
      message: "Snag item recorded successfully",
      data: snag,
    });
  } catch (error) {
    console.error("Create Snag Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get snags for a project
exports.getProjectSnags = async (req, res) => {
  try {
    const { projectId } = req.params;
    const company_id = req.user.company_id;

    const snags = await db.snag_item.findAll({
      where: {
        project_id: projectId,
        company_id,
        isDeleted: false,
      },
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: "success",
      data: snags,
    });
  } catch (error) {
    console.error("Get Snags Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

// Update snag status (e.g., from open -> in_progress -> resolved -> closed)
exports.updateSnagStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const company_id = req.user.company_id;

    const snag = await db.snag_item.findOne({
      where: { id, company_id, isDeleted: false },
    });

    if (!snag) {
      return res.status(404).json({
        status: "failed",
        message: "Snag item not found",
      });
    }

    snag.status = status;
    await snag.save();

    return res.status(200).json({
      status: "success",
      message: "Snag status updated successfully",
      data: snag,
    });
  } catch (error) {
    console.error("Update Snag Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Analyze voice transcription text with AI and return structured defect suggestions
exports.analyzeVoiceNote = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ status: "failed", message: "Voice note text is required" });
    }

    const prompt = `
Analyze this construction field defect audio/transcription note.
If the transcript is in Hindi, Hinglish, Spanish, or other non-English phrasing, detect the language and translate it into professional English.

Input Text: "${text}"

Instructions:
1. title: Concise, relevant English defect title (under 50 characters, e.g. "Grader Not Operating Properly", "Exposed Rebar on Slab Beam")
2. description: Structured two-part English text:
   - Reported Issue: A clear summary of the reported defect and site context.
   - Proposed Rectification: Recommend specific inspection and repair by qualified personnel, requiring confirmation after inspection.
   (IMPORTANT: Never copy the entire raw transcript into both title and description. Keep them distinct.)
3. trade: One of (Civil, Electrical, Plumbing, HVAC, Carpentry, Painting, Finishing, Structural)
4. severity: One of (low, medium, high, critical)
5. location_pin: Specific grid or location if stated (or "Site Work Area")
6. tags: Array of 2 to 5 relevant technical keywords (e.g. ["grader", "equipment", "mechanical"])

Respond in strict JSON format:
{
  "title": "string",
  "description": "string",
  "trade": "string",
  "severity": "string",
  "location_pin": "string",
  "tags": ["string"]
}
`;

    let aiResult;
    try {
      aiResult = await aiService.generateCompletion({ prompt, responseFormat: "json" });
    } catch (err) {
      if (err instanceof aiService.AIUnavailableError) {
        return res.status(503).json({
          status: "unavailable",
          message: `${err.message} Enter the defect details manually.`,
          data: null,
        });
      }
      throw err;
    }

    // The answer must have the fields a snag needs. Anything else is refused, not filled in.
    if (!aiResult || typeof aiResult !== "object" || !aiResult.title || !aiResult.description) {
      return res.status(422).json({
        status: "failed",
        message: "The AI model did not return a usable defect classification. Enter the defect details manually.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        title: aiResult.title,
        description: aiResult.description,
        trade: aiResult.trade || null,
        severity: aiResult.severity || null,
        location_pin: aiResult.location_pin || null,
        tags: Array.isArray(aiResult.tags) ? aiResult.tags : [],
        source: "ai",
      },
    });
  } catch (error) {
    console.error("Analyze Voice Note Error:", error);
    return res.status(500).json({ status: "failed", message: "Failed to analyze voice note" });
  }
};

// Update an existing snag item (title, description, severity, trade, location, etc.)
exports.updateSnag = async (req, res) => {
  try {
    const { id } = req.params;
    const company_id = req.user.company_id;
    const { title, description, severity, trade, location_pin, due_date, status, assigned_to, ai_defect_tags } = req.body;

    const snag = await db.snag_item.findOne({
      where: { id, company_id, isDeleted: false },
    });

    if (!snag) {
      return res.status(404).json({
        status: "failed",
        message: "Snag item not found",
      });
    }

    if (title !== undefined) snag.title = title;
    if (description !== undefined) snag.description = description;
    if (severity !== undefined) {
      if (!["low", "medium", "high", "critical"].includes(severity)) {
        return res.status(400).json({ status: "failed", message: "Invalid severity level" });
      }
      snag.severity = severity;
    }
    if (trade !== undefined) snag.trade = trade;
    if (location_pin !== undefined) snag.location_pin = location_pin;
    if (due_date !== undefined) snag.due_date = due_date;
    if (assigned_to !== undefined) snag.assigned_to = assigned_to;
    if (ai_defect_tags !== undefined) {
      snag.ai_defect_tags = normalizeDefectTags(ai_defect_tags);
    }
    if (status !== undefined) {
      if (!["open", "in_progress", "resolved", "closed"].includes(status)) {
        return res.status(400).json({ status: "failed", message: "Invalid status" });
      }
      snag.status = status;
    }

    await snag.save();

    return res.status(200).json({
      status: "success",
      message: "Snag item updated successfully",
      data: snag,
    });
  } catch (error) {
    console.error("Update Snag Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Soft-delete a snag item
exports.deleteSnag = async (req, res) => {
  try {
    const { id } = req.params;
    const company_id = req.user.company_id;

    const snag = await db.snag_item.findOne({
      where: { id, company_id, isDeleted: false },
    });

    if (!snag) {
      return res.status(404).json({
        status: "failed",
        message: "Snag item not found",
      });
    }

    snag.isDeleted = true;
    await snag.save();

    return res.status(200).json({
      status: "success",
      message: "Snag item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Snag Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


