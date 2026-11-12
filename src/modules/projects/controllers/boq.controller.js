const db = require("../../../models");
const aiService = require("../../../core/services/ai.service");

// Deterministic table parser for CSV, TSV, pipe-delimited, and semi-structured text
function parseDeterministicBOQ(rawText) {
  if (!rawText || !rawText.trim()) return [];
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const items = [];
  const firstLine = lines[0];
  let delimiter = ',';
  if (firstLine.includes('\t')) delimiter = '\t';
  else if (firstLine.includes('|')) delimiter = '|';
  else if (firstLine.includes(';') && !firstLine.includes(',')) delimiter = ';';

  const headerTokens = firstLine.toLowerCase().split(delimiter).map(t => t.trim().replace(/^["']|["']$/g, ''));
  const isHeader = headerTokens.some(t => ['code', 'item', 'description', 'desc', 'qty', 'quantity', 'rate', 'unit', 'price'].includes(t));

  const startIdx = isHeader ? 1 : 0;
  let codeIdx = -1, descIdx = -1, catIdx = -1, unitIdx = -1, qtyIdx = -1, rateIdx = -1, totalIdx = -1;

  if (isHeader) {
    headerTokens.forEach((h, i) => {
      if (h.includes('code') || h === 'item no' || h === 'sl' || h === 'sr') codeIdx = i;
      else if (h.includes('desc') || h.includes('particular') || h === 'item' || h === 'specification') descIdx = i;
      else if (h.includes('cat') || h.includes('trade')) catIdx = i;
      else if (h.includes('unit') || h === 'uom') unitIdx = i;
      else if (h.includes('qty') || h.includes('quantity')) qtyIdx = i;
      else if (h.includes('rate') || h.includes('price') || h.includes('unit price')) rateIdx = i;
      else if (h.includes('total') || h.includes('amount')) totalIdx = i;
    });
  }

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    let parts = line.split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));
    if (delimiter === '|' && parts.length > 2 && parts[0] === '' && parts[parts.length - 1] === '') {
      parts = parts.slice(1, -1);
    }
    if (parts.length < 2) continue;

    let item_code = '';
    let description = '';
    let category = 'Civil';
    let unit = 'nos';
    let estimated_qty = 0;
    let unit_rate = 0;
    let raw_total = null;

    if (descIdx !== -1) {
      item_code = codeIdx !== -1 && parts[codeIdx] ? parts[codeIdx] : `BOQ-${i + 1}`;
      description = parts[descIdx] || '';
      category = catIdx !== -1 && parts[catIdx] ? parts[catIdx] : 'Civil';
      unit = unitIdx !== -1 && parts[unitIdx] ? parts[unitIdx] : 'nos';
      estimated_qty = qtyIdx !== -1 ? parseFloat(String(parts[qtyIdx]).replace(/,/g, '')) || 0 : 0;
      unit_rate = rateIdx !== -1 ? parseFloat(String(parts[rateIdx]).replace(/[₹$,]/g, '')) || 0 : 0;
      if (totalIdx !== -1 && parts[totalIdx]) {
        raw_total = parseFloat(String(parts[totalIdx]).replace(/[₹$,]/g, ''));
      }
    } else {
      if (parts.length >= 4) {
        if (isNaN(parseFloat(parts[0])) && parts[0].length < 15 && isNaN(parseFloat(parts[1]))) {
          item_code = parts[0];
          description = parts[1];
          unit = parts[2] || 'nos';
          estimated_qty = parseFloat(parts[3]) || 0;
          unit_rate = parts[4] ? parseFloat(parts[4]) || 0 : 0;
        } else {
          item_code = `BOQ-${i + 1}`;
          description = parts[0];
          unit = isNaN(parseFloat(parts[1])) ? parts[1] : 'nos';
          estimated_qty = parseFloat(parts[2]) || (parseFloat(parts[1]) || 0);
          unit_rate = parseFloat(parts[3]) || 0;
        }
      } else if (parts.length >= 2) {
        item_code = `BOQ-${i + 1}`;
        description = parts[0];
        estimated_qty = parseFloat(parts[1]) || 1;
        unit_rate = parts[2] ? parseFloat(parts[2]) || 0 : 0;
      }
    }

    if (description) {
      items.push({
        item_code: item_code.trim(),
        description: description.trim(),
        category: category.trim(),
        unit: unit.trim() || 'nos',
        estimated_qty: isNaN(estimated_qty) ? 0 : Number(estimated_qty),
        unit_rate: isNaN(unit_rate) ? 0 : Number(unit_rate),
        raw_total: isNaN(raw_total) ? null : raw_total,
      });
    }
  }

  return items;
}

// Validator for extracted BOQ rows
function validateExtractedBOQRows(items) {
  const codeCounts = new Map();
  for (const it of items) {
    const c = (it.item_code || '').trim().toLowerCase();
    if (c) codeCounts.set(c, (codeCounts.get(c) || 0) + 1);
  }

  return items.map((it, idx) => {
    const flags = [];
    const qty = Number(it.estimated_qty || 0);
    const rate = Number(it.unit_rate || 0);
    const total = Number((qty * rate).toFixed(2));

    if (!it.description || !it.description.trim()) {
      flags.push({ field: 'description', type: 'missing_field', message: 'Description is required' });
    }
    if (!it.unit || !it.unit.trim()) {
      flags.push({ field: 'unit', type: 'missing_field', message: 'Unit of measurement is missing' });
    }
    if (isNaN(qty) || qty <= 0) {
      flags.push({ field: 'estimated_qty', type: 'invalid_number', message: 'Estimated quantity must be greater than 0' });
    }
    if (isNaN(rate) || rate < 0) {
      flags.push({ field: 'unit_rate', type: 'invalid_number', message: 'Unit rate cannot be negative' });
    }
    const c = (it.item_code || '').trim().toLowerCase();
    if (c && codeCounts.get(c) > 1) {
      flags.push({ field: 'item_code', type: 'duplicate_code', message: `Duplicate item code: ${it.item_code}` });
    }
    if (it.raw_total !== null && it.raw_total !== undefined && !isNaN(it.raw_total)) {
      if (Math.abs(Number(it.raw_total) - total) > 0.05) {
        flags.push({ field: 'total', type: 'inconsistent_total', message: `Calculated total (₹${total}) differs from document total (₹${it.raw_total})` });
      }
    }

    return {
      id: idx + 1,
      item_code: it.item_code || `BOQ-${idx + 1}`,
      description: it.description || '',
      category: it.category || 'Civil',
      unit: it.unit || 'nos',
      estimated_qty: qty > 0 ? qty : 0,
      unit_rate: rate >= 0 ? rate : 0,
      total_estimated_amount: total,
      wbs_id: it.wbs_id || null,
      cbs_id: it.cbs_id || null,
      flags,
      isValid: flags.length === 0,
      isExcluded: false,
    };
  });
}

// 1. Preview / Parse endpoint (deterministic parsing + AI fallback with validation, NO persistence)
exports.parseBOQContent = async (req, res) => {
  try {
    const { project_id, boq_raw_text } = req.body;
    if (!project_id) {
      return res.status(400).json({ status: "failed", message: "project_id is required" });
    }
    if (!boq_raw_text || !boq_raw_text.trim()) {
      return res.status(400).json({ status: "failed", message: "boq_raw_text or file content is required" });
    }

    // Step A: deterministic parsing
    let parsedRows = parseDeterministicBOQ(boq_raw_text);

    // Step B: AI parsing if deterministic parser found nothing
    if (parsedRows.length === 0) {
      try {
        const prompt = `
Extract construction BOQ (Bill of Quantities) items from this input text into structured JSON.
Each item must have:
- item_code (string like CW-01, STR-02, or leave empty if absent)
- description (string)
- category (Civil, Earthwork, MEP, Concrete, Finishing, etc.)
- unit (m3, sqm, kg, ton, nos, etc.)
- estimated_qty (number)
- unit_rate (number)

Input Text:
${boq_raw_text}

Respond in strict JSON format:
{
  "items": [
    {
      "item_code": "...",
      "description": "...",
      "category": "...",
      "unit": "...",
      "estimated_qty": 0,
      "unit_rate": 0
    }
  ]
}
`;
        const aiResult = await aiService.generateCompletion({ prompt, responseFormat: "json" });
        if (aiResult && Array.isArray(aiResult.items)) {
          parsedRows = aiResult.items;
        }
      } catch (aiErr) {
        console.warn("AI BOQ parse fallback skipped:", aiErr.message);
      }
    }

    // Step C: Validate rows
    const validatedRows = validateExtractedBOQRows(parsedRows);
    const validCount = validatedRows.filter(r => r.isValid).length;
    const totalAmount = validatedRows.reduce((sum, r) => sum + r.total_estimated_amount, 0);

    return res.status(200).json({
      status: "success",
      message: `Extracted and validated ${validatedRows.length} BOQ candidate rows`,
      data: {
        items: validatedRows,
        summary: {
          total_items: validatedRows.length,
          valid_count: validCount,
          invalid_count: validatedRows.length - validCount,
          total_estimated_amount: Number(totalAmount.toFixed(2))
        }
      }
    });
  } catch (error) {
    console.error("Parse BOQ Error:", error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error", error: error.message });
  }
};

// 2. Batch Create / Confirm & Persist BOQ items
exports.batchCreateBOQ = async (req, res) => {
  try {
    const { project_id, items = [] } = req.body;
    const company_id = req.user.company_id;

    if (!project_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ status: "failed", message: "project_id and a non-empty items array are required" });
    }

    const itemsToPersist = items
      .filter(item => !item.isExcluded)
      .map(item => {
        const qty = Number(item.estimated_qty || 0);
        const rate = Number(item.unit_rate || 0);
        const total = Number((qty * rate).toFixed(2));
        return {
          project_id,
          company_id,
          item_code: item.item_code ? String(item.item_code).trim() : null,
          description: String(item.description || "").trim(),
          category: item.category ? String(item.category).trim() : "Civil",
          unit: item.unit ? String(item.unit).trim() : "nos",
          estimated_qty: qty,
          unit_rate: rate,
          total_estimated_amount: total,
          wbs_id: item.wbs_id || null,
          cbs_id: item.cbs_id || null,
        };
      })
      .filter(item => Boolean(item.description));

    if (itemsToPersist.length === 0) {
      return res.status(400).json({ status: "failed", message: "No valid items selected for persistence" });
    }

    const createdRecords = await db.boq_item.bulkCreate(itemsToPersist);

    return res.status(201).json({
      status: "success",
      message: `Successfully persisted ${createdRecords.length} BOQ items`,
      data: createdRecords,
    });
  } catch (error) {
    console.error("Batch Create BOQ Error:", error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error", error: error.message });
  }
};

// 3. Update single BOQ line item
exports.updateBOQItem = async (req, res) => {
  try {
    const { id } = req.params;
    const company_id = req.user.company_id;
    const { item_code, description, category, unit, estimated_qty, unit_rate, wbs_id, cbs_id } = req.body;

    const item = await db.boq_item.findOne({
      where: { id, company_id, isDeleted: false },
    });

    if (!item) {
      return res.status(404).json({ status: "failed", message: "BOQ item not found" });
    }

    if (item_code !== undefined) item.item_code = item_code;
    if (description !== undefined) item.description = description;
    if (category !== undefined) item.category = category;
    if (unit !== undefined) item.unit = unit;
    if (estimated_qty !== undefined) item.estimated_qty = Number(estimated_qty);
    if (unit_rate !== undefined) item.unit_rate = Number(unit_rate);
    if (wbs_id !== undefined) item.wbs_id = wbs_id;
    if (cbs_id !== undefined) item.cbs_id = cbs_id;

    item.total_estimated_amount = Number((Number(item.estimated_qty || 0) * Number(item.unit_rate || 0)).toFixed(2));
    await item.save();

    return res.status(200).json({
      status: "success",
      message: "BOQ line item updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("Update BOQ Item Error:", error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error", error: error.message });
  }
};

// 4. Archive / Soft-delete single BOQ line item
exports.deleteBOQItem = async (req, res) => {
  try {
    const { id } = req.params;
    const company_id = req.user.company_id;

    const item = await db.boq_item.findOne({
      where: { id, company_id, isDeleted: false },
    });

    if (!item) {
      return res.status(404).json({ status: "failed", message: "BOQ item not found" });
    }

    item.isDeleted = true;
    await item.save();

    return res.status(200).json({
      status: "success",
      message: "BOQ item removed successfully",
    });
  } catch (error) {
    console.error("Delete BOQ Item Error:", error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error", error: error.message });
  }
};

// Legacy backward-compatible extractAndCreateBOQ endpoint
exports.extractAndCreateBOQ = async (req, res) => {
  try {
    const { project_id, boq_raw_text, items = [] } = req.body;
    const company_id = req.user.company_id;

    if (!project_id) {
      return res.status(400).json({
        status: "failed",
        message: "project_id is required",
      });
    }

    let parsedItems = items;

    if (boq_raw_text && parsedItems.length === 0) {
      const deterministic = parseDeterministicBOQ(boq_raw_text);
      if (deterministic.length > 0) {
        parsedItems = deterministic;
      } else {
        try {
          const prompt = `
Extract construction BOQ items into JSON with item_code, description, category, unit, estimated_qty, unit_rate:
Text: ${boq_raw_text}
Response format: { "items": [{ "item_code": "...", "description": "...", "category": "...", "unit": "...", "estimated_qty": 0, "unit_rate": 0 }] }
`;
          const aiResult = await aiService.generateCompletion({ prompt, responseFormat: "json" });
          if (aiResult && Array.isArray(aiResult.items)) {
            parsedItems = aiResult.items;
          }
        } catch (aiErr) {
          console.warn("AI BOQ parsing fallback:", aiErr.message);
        }
      }
    }

    const createdItems = [];
    for (const item of parsedItems) {
      const total_estimated_amount = Number((Number(item.estimated_qty || 0) * Number(item.unit_rate || 0)).toFixed(2));
      const boq = await db.boq_item.create({
        project_id,
        company_id,
        item_code: item.item_code,
        description: item.description,
        category: item.category || "Civil",
        unit: item.unit || "nos",
        estimated_qty: item.estimated_qty || 0,
        unit_rate: item.unit_rate || 0,
        total_estimated_amount,
      });
      createdItems.push(boq);
    }

    return res.status(201).json({
      status: "success",
      message: `Successfully processed and created ${createdItems.length} BOQ items`,
      data: createdItems,
    });
  } catch (error) {
    console.error("BOQ Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get BOQ items for a project
exports.getProjectBOQ = async (req, res) => {
  try {
    const { projectId } = req.params;
    const company_id = req.user.company_id;

    const boqItems = await db.boq_item.findAll({
      where: {
        project_id: projectId,
        company_id,
        isDeleted: false,
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      status: "success",
      data: boqItems,
    });
  } catch (error) {
    console.error("Get BOQ Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

// Generate Vendor RFQ / Quotation Request from Selected BOQ items
exports.generateRFQFromBOQ = async (req, res) => {
  try {
    const { project_id, boq_item_ids = [], vendor_id, notes } = req.body;
    const company_id = req.user.company_id;
    const user_name = req.user.first_name ? `${req.user.first_name} ${req.user.last_name || ''}`.trim() : "Project Manager";

    if (!project_id || !Array.isArray(boq_item_ids) || boq_item_ids.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "project_id and a non-empty boq_item_ids array are required",
      });
    }

    // Fetch selected BOQ items
    const selectedBOQ = await db.boq_item.findAll({
      where: {
        id: boq_item_ids,
        project_id,
        company_id,
        isDeleted: false,
      },
    });

    if (selectedBOQ.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No matching BOQ items found for this project",
      });
    }

    // Map BOQ items to Quote items
    let totalEst = 0;
    const quoteItems = selectedBOQ.map((b) => {
      const itemTotal = Number(b.estimated_qty || 0) * Number(b.unit_rate || 0);
      totalEst += itemTotal;
      return {
        boq_id: b.id,
        materialSku: b.item_code || `BOQ-${b.id}`,
        materialName: b.description,
        category: b.category || "General",
        unit: b.unit,
        quantity: Number(b.estimated_qty || 0),
        estimatedRate: Number(b.unit_rate || 0),
        unitPrice: Number(b.unit_rate || 0),
        totalPrice: itemTotal,
      };
    });

    const quotationNumber = `RFQ-BOQ-${Date.now().toString().slice(-6)}`;

    // Create draft quotation in database
    const quotation = await db.quotation.create({
      quotation_number: quotationNumber,
      date: new Date(),
      sales_person: user_name,
      items: quoteItems,
      total_amount: totalEst,
      status: "Draft",
      vendor_feedback: notes || `Auto-generated RFQ from ${quoteItems.length} BOQ items.`,
      quotation_type: "BOQ_PROCUREMENT",
      company_id,
    });

    return res.status(201).json({
      status: "success",
      message: `Vendor RFQ ${quotationNumber} generated successfully with ${quoteItems.length} items`,
      data: quotation,
    });
  } catch (error) {
    console.error("Generate RFQ Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

