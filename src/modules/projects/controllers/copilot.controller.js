const axios = require("axios");
const db = require("../../../models");
const aiService = require("../../../core/services/ai.service");
const { modelConfig, fallbackConfig } = require("../../../core/services/model_config");
const controls = require("../services/project_controls.service");
const { financialYear } = require("../services/india_compliance.service");
const eacForecast = require("../services/eac_forecast.service");

/**
 * Zyno Intelligence Copilot.
 *
 * Answers come only from the model, given the project's records read from the database (see buildProjectContext).
 * There are no simulated, template or canned analyses. If the model cannot answer, the response says so and nothing is
 * shown as an answer. The guardrails below are fixed replies for identity, injection, off-topic and web requests.
 */

const COPILOT_SYSTEM =
  "You are Zyno Intelligence Copilot, an expert construction project engineer and financial auditor. " +
  "Answer only from the Project Records supplied in the prompt. Do not mention any underlying model vendor or external provider.";

/**
 * Strict Server-Side Guardrails for Zyno Intelligence Copilot
 * Enforces identity, construction project management domain, no-external retrieval,
 * prompt injection defense, and workspace project context requirements.
 */
function checkCopilotGuardrails(question, project_id, projectContext) {
  const q = (question || "").trim().toLowerCase();

  // 1. Identity Guardrail (Must be exactly: "I'm Zyno Intelligence Copilot.")
  const identityTriggers = [
    "who are you",
    "what are you",
    "what model",
    "which model",
    "who made you",
    "who created you",
    "what ai powers you",
    "what powers you",
    "what is your name",
    "powered by",
    "are you gemma",
    "are you gemini",
    "are you chatgpt",
    "are you openai",
    "are you claude",
    "are you ollama",
    "tell me your model",
    "what llm",
  ];
  if (identityTriggers.some((t) => q.includes(t)) || q === "who are u") {
    return "I'm Zyno Intelligence Copilot.";
  }

  // 2. Prompt Injection & System Instructions Protection
  const injectionTriggers = [
    "ignore previous instructions",
    "ignore all instructions",
    "system prompt",
    "reveal your prompt",
    "show your prompt",
    "developer message",
    "jailbreak",
    "dan mode",
  ];
  if (injectionTriggers.some((t) => q.includes(t))) {
    return "I'm Zyno Intelligence Copilot, designed to assist with construction project management. Please ask about your project's progress, schedule, BOQ, budget, inventory, site reports or snags.";
  }

  // 3. External Web Retrieval Request Guardrail
  const externalTriggers = [
    "search the web",
    "browse the internet",
    "google this",
    "latest news on",
    "weather forecast tomorrow",
    "current stock price of",
  ];
  if (externalTriggers.some((t) => q.includes(t))) {
    return "External web retrieval is disabled. Zyno Intelligence Copilot operates exclusively from authorized ERP project records and verified engineering standards.";
  }

  // 4. Scope Guardrail: Off-topic / Unrelated domains
  const offTopicTriggers = [
    "write a poem",
    "tell me a joke",
    "write a python script for a game",
    "write a game",
    "play a game",
    "relationship advice",
    "dating advice",
    "movie recommendation",
    "horoscope",
    "crypto trading",
    "bitcoin price",
    "medical diagnosis",
    "recipe for",
  ];
  if (offTopicTriggers.some((t) => q.includes(t))) {
    return "I'm Zyno Intelligence Copilot, designed to assist with construction project management. Please ask about your project's progress, schedule, BOQ, budget, inventory, site reports or snags.";
  }

  return null;
}

const dateOnly = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);
const num = (v) => (v === null || v === undefined ? null : Number(v));

/**
 * Reads the project's records from the database. Each section is read on its own; a section that cannot be read is
 * listed in unavailable_sections, so the model is told what is missing instead of being given nothing.
 */
async function buildProjectContext(project_id, company_id, now = new Date()) {
  const project = await db.project.findOne({ where: { id: project_id, company_id } });
  if (!project) return null;

  const unavailable = [];
  const section = async (name, read) => {
    try {
      return await read();
    } catch (err) {
      unavailable.push({ section: name, reason: err.message });
      return null;
    }
  };

  const milestones = await section("milestones", () =>
    db.milestone.findAll({ where: { project_id }, attributes: ["name", "status", "progress", "startDate", "endDate"], order: [["id", "ASC"]] })
  );
  const tasks = await section("tasks", () =>
    db.project_task.findAll({ where: { project_id }, attributes: ["title", "status", "progress", "due_date"], order: [["id", "DESC"]], limit: 25 })
  );
  const dprs = await section("daily_progress_reports", () =>
    db.dpr.findAll({
      where: { project_id, company_id, isDeleted: false },
      attributes: ["report_date", "weather_summary", "work_summary", "total_workforce_count", "ai_executive_summary", "status"],
      order: [["report_date", "DESC"]],
      limit: 5,
    })
  );
  const snags = await section("snags", () =>
    db.snag_item.findAll({
      where: { project_id, company_id, isDeleted: false },
      attributes: ["title", "severity", "status", "trade", "location_pin", "due_date"],
      order: [["id", "DESC"]],
      limit: 30,
    })
  );
  const boq = await section("boq", () =>
    db.boq_item.findAll({
      where: { project_id, company_id, isDeleted: false },
      attributes: ["item_code", "description", "unit", "estimated_qty", "unit_rate", "total_estimated_amount", "executed_qty", "billed_amount"],
      order: [["id", "ASC"]],
      limit: 100,
    })
  );
  const budget = await section("budget", async () => {
    const approved = await db.budget.findOne({
      where: { company_id, project_id, status: "approved" },
      order: [["revision_number", "DESC"]],
    });
    if (!approved) return { approved_revision: null, heads: [] };
    const heads = await db.budget_head.findAll({ where: { company_id, project_id, status: "active" }, order: [["sort_order", "ASC"]] });
    const allocations = await db.budget_head_allocation.findAll({ where: { company_id, budget_id: approved.id } });
    const rows = [];
    for (const h of heads) {
      const alloc = allocations.find((a) => Number(a.budget_head_id) === Number(h.id));
      const recognized = await db.cost_ledger.sum("amount", { where: { company_id, project_id, budget_head_id: h.id } });
      const allocated = alloc ? Number(alloc.allocated_amount) : null;
      rows.push({
        head_code: h.head_code,
        head_name: h.head_name,
        allocated,
        recognized_cost: Number(recognized || 0),
        headroom: allocated === null ? null : Number((allocated - Number(recognized || 0)).toFixed(2)),
      });
    }
    return { approved_revision: approved.revision_number, total_budget_amount: num(approved.total_budget_amount), heads: rows };
  });
  const evm = await section("earned_value", () => controls.earnedValue({ company_id, project_id, status_date: now }));
  const retention = await section("retention", () => controls.retentionSummary({ company_id, project_id }));
  const guarantees = await section("bank_guarantees", () => controls.listGuarantees({ company_id, project_id, expiring_within_days: 30 }));
  const approvals = await section("approvals", () => controls.approvalAgeing({ company_id, project_id, older_than_hours: 48, now }));
  const stocks = await section("material_stock", () =>
    db.material_project_stock.findAll({
      where: { project_id, company_id, isDeleted: false },
      attributes: ["name", "sku", "unit_of_measure", "stockIn", "stockUsed"],
      limit: 50,
    })
  );
  const fieldOpsHistory = await section("field_ops", () =>
    db.project_history.findAll({
      where: { project_id, company_id, action_type: ["SAFETY_INCIDENT", "RFI_RECORD", "AGENT_ACTION", "VLM_DPR_INSPECTION", "DIRECTOR_BRIEFING"] },
      order: [["id", "DESC"]],
      limit: 40,
    })
  );
  const eac = await section("eac_forecast", () => eacForecast.computeEacForecast({ company_id, project_id, status_date: now }));
  const parseMeta = (m) => { try { return typeof m === "string" ? JSON.parse(m) : (m || {}); } catch { return {}; } };
  const safetyIncidents = fieldOpsHistory ? fieldOpsHistory.filter((r) => r.action_type === "SAFETY_INCIDENT").map((r) => ({ id: r.id, detail: r.detail, ...parseMeta(r.meta) })) : null;
  const rfis = fieldOpsHistory ? fieldOpsHistory.filter((r) => r.action_type === "RFI_RECORD").map((r) => ({ id: r.id, detail: r.detail, ...parseMeta(r.meta) })) : null;
  const recentAgentActions = fieldOpsHistory ? fieldOpsHistory.filter((r) => r.action_type === "AGENT_ACTION").map((r) => ({ id: r.id, detail: r.detail, at: r.createdAt })) : null;
  const vlmInspections = fieldOpsHistory ? fieldOpsHistory.filter((r) => r.action_type === "VLM_DPR_INSPECTION").map((r) => ({ id: r.id, detail: r.detail, ...parseMeta(r.meta) })) : null;

  return {
    generated_at: now.toISOString(),
    currency: "INR",
    financial_year: financialYear(now),
    project: {
      id: project.id,
      name: project.name,
      type: project.type,
      address: project.address || null,
      status: project.status || null,
      progress_percent: num(project.progress),
      start_date: dateOnly(project.start_date),
      completion_date: dateOnly(project.completion_date),
      handover_date: dateOnly(project.handover_date),
      dlp_months: num(project.dlp_months),
      budget_total: num(project.budget_total),
      budget_used: num(project.budget_used),
    },
    milestones: milestones?.map((m) => ({ name: m.name, status: m.status, progress_percent: num(m.progress), start: dateOnly(m.startDate), end: dateOnly(m.endDate) })) ?? null,
    tasks: tasks?.map((t) => ({ title: t.title, status: t.status, progress_percent: num(t.progress), due: dateOnly(t.due_date) })) ?? null,
    daily_progress_reports: dprs?.map((d) => ({ date: dateOnly(d.report_date), weather: d.weather_summary || null, work_summary: d.work_summary || null, workforce: num(d.total_workforce_count), ai_summary: d.ai_executive_summary || null, status: d.status })) ?? null,
    snags: snags ? { open_count: snags.filter((s) => s.status !== "closed").length, items: snags.map((s) => ({ title: s.title, severity: s.severity, status: s.status, trade: s.trade || null, location: s.location_pin || null, due: dateOnly(s.due_date) })) } : null,
    boq: boq ? { item_count: boq.length, items: boq.map((b) => ({ item_code: b.item_code || null, description: b.description, unit: b.unit || null, estimated_qty: num(b.estimated_qty), unit_rate: num(b.unit_rate), estimated_amount: num(b.total_estimated_amount), executed_qty: num(b.executed_qty), billed_amount: num(b.billed_amount) })) } : null,
    material_stock: stocks?.map((s) => ({ name: s.name, sku: s.sku, uom: s.unit_of_measure, stock_in: num(s.stockIn), stock_used: num(s.stockUsed), available: Math.max(0, num(s.stockIn) - num(s.stockUsed)) })) ?? null,
    safety_incidents: safetyIncidents,
    rfis,
    recent_agent_actions: recentAgentActions,
    vlm_inspections: vlmInspections,
    eac_forecast: eac,
    budget,
    earned_value: evm,
    retention,
    bank_guarantees: guarantees,
    approvals_waiting: approvals,
    unavailable_sections: unavailable,
  };
}

/** One project's figures for the portfolio view. Each figure is read on its own, so one failure does not hide the rest. */
async function buildProjectSummary(project_id, company_id, now = new Date()) {
  const unavailable = [];
  const section = async (name, read) => {
    try {
      return await read();
    } catch (err) {
      unavailable.push({ section: name, reason: err.message });
      return null;
    }
  };

  const project = await db.project.findOne({
    where: { id: project_id, company_id },
    attributes: ["id", "name", "type", "address", "progress", "budget_total", "budget_used", "handover_date", "dlp_months", "completion_date"],
  });
  if (!project) return null;

  const approved = await section("approved_budget", () =>
    db.budget.findOne({ where: { company_id, project_id, status: "approved" }, order: [["revision_number", "DESC"]] })
  );
  const evm = await section("earned_value", () => controls.earnedValue({ company_id, project_id, status_date: now }));
  const approvals = await section("approvals", () => controls.approvalAgeing({ company_id, project_id, older_than_hours: 48, now }));
  const retention = await section("retention", () => controls.retentionSummary({ company_id, project_id }));
  const guarantees = await section("bank_guarantees", () => controls.listGuarantees({ company_id, project_id, expiring_within_days: 30 }));
  const snags = await section("snags", () => db.snag_item.findAll({ where: { project_id, company_id, isDeleted: false }, attributes: ["status"] }));

  return {
    id: project.id,
    name: project.name,
    type: project.type,
    address: project.address || null,
    progress_percent: num(project.progress),
    budget_total: num(project.budget_total),
    approved_budget_total: approved ? num(approved.total_budget_amount) : null,
    handover_date: dateOnly(project.handover_date),
    dlp_months: num(project.dlp_months),
    earned_value: evm,
    approvals_waiting: approvals ? { waiting_count: approvals.waiting_count, escalate_count: approvals.escalate_count } : null,
    retention_outstanding: retention ? retention.total_outstanding : null,
    dlp_ended: retention ? retention.dlp_ended : null,
    bank_guarantees: guarantees ? { active_total: guarantees.active_total, expiring_count: guarantees.expiring_count, expired_active_count: guarantees.expired_active_count } : null,
    open_snags: snags ? snags.filter((s) => s.status !== "closed").length : null,
    unavailable_sections: unavailable,
  };
}

/** Every project of the company (up to 25), for questions that are not about one project. */
async function buildPortfolioContext(company_id, now = new Date()) {
  const rows = await db.project.findAll({ where: { company_id }, attributes: ["id"], order: [["id", "ASC"]], limit: 25 });
  const projects = [];
  for (const row of rows) {
    const summary = await buildProjectSummary(row.id, company_id, now);
    if (summary) projects.push(summary);
  }
  return {
    generated_at: now.toISOString(),
    scope: "portfolio",
    currency: "INR",
    financial_year: financialYear(now),
    project_count: projects.length,
    total_budget_total: Number(projects.reduce((s, p) => s + Number(p.budget_total || 0), 0).toFixed(2)),
    projects,
    unavailable_sections: [],
  };
}

/**
 * The prompt the model receives for a question: the rules, the records as JSON, and the question.
 * scope "project" uses one project's records; scope "portfolio" uses every project of the company.
 */
function buildCopilotPrompt(question, context, scope = "project") {
  const records = scope === "portfolio" ? "Portfolio Records (every project of this company)" : "Project Records";
  return `Answer the user's question using only the ${records} below.

Rules:
- Quote figures exactly as they appear in the records. Do not estimate, round, or invent a figure, milestone, date or name.
- If the records do not contain the answer, say which record is missing. Look at "unavailable_sections" and at any null field. Do not guess.
- If the question names one project, answer from that project's entry. If it asks about all projects, answer from the list and give the totals.
- All amounts are Indian rupees. Write them with Indian grouping, for example ₹8,50,000.
- Start with the direct answer, then the records that support it, then the next actions for the site manager.
- Never name the underlying model or provider.

${records} (read from the ERP database at ${context.generated_at}):
${JSON.stringify(context, null, 2)}

Question: "${question}"`;
}

const companyOf = (req) => req.user?.company_id || null;

/**
 * Natural language query assistant for Project Managers and Executives.
 * Answers from the project's records through the configured model.
 */
exports.askCopilot = async (req, res) => {
  try {
    const { project_id, question } = req.body || {};
    const company_id = companyOf(req);
    if (!company_id) {
      return res.status(401).json({ status: "failed", message: "Sign in to use the copilot." });
    }
    if (!question) {
      return res.status(400).json({ status: "failed", message: "A question is required for Copilot" });
    }

    const guardrailResponse = checkCopilotGuardrails(question, project_id, null);
    if (guardrailResponse) {
      return res.status(200).json({ status: "success", data: { question, answer: guardrailResponse } });
    }
    // With a project selected, answer from that project. Without one, answer from every project of the company.
    const scope = project_id ? "project" : "portfolio";
    const context = project_id
      ? await buildProjectContext(Number(project_id), company_id)
      : await buildPortfolioContext(company_id);
    if (!context) {
      return res.status(404).json({ status: "failed", message: "Project not found." });
    }

    try {
      const answer = await aiService.generateCompletion({
        prompt: buildCopilotPrompt(question, context, scope),
        systemInstruction: COPILOT_SYSTEM,
        responseFormat: "text",
      });
      return res.status(200).json({
        status: "success",
        data: {
          question,
          answer,
          records: { generated_at: context.generated_at, unavailable_sections: context.unavailable_sections },
        },
      });
    } catch (err) {
      if (err instanceof aiService.AIUnavailableError) {
        return res.status(503).json({
          status: "unavailable",
          message: err.message,
          data: {
            question,
            answer: null,
            records: { generated_at: context.generated_at, unavailable_sections: context.unavailable_sections },
          },
        });
      }
      throw err;
    }
  } catch (error) {
    console.error("Copilot Error:", error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error", error: error.message });
  }
};

/**
 * Streaming version of the same answer (Server-Sent Events). Streams the model's tokens as they come. If the model
 * cannot answer, the stream ends with an error event and no text is invented.
 */
exports.streamCopilot = async (req, res) => {
  const { project_id, question } = req.body || {};
  const company_id = companyOf(req);
  if (!company_id) {
    return res.status(401).json({ status: "failed", message: "Sign in to use the copilot." });
  }
  if (!question) {
    return res.status(400).json({ status: "failed", message: "Question is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (payload) => {
    if (!res.writableEnded) res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };
  const finish = () => {
    send({ chunk: "", done: true });
    if (!res.writableEnded) res.end();
  };

  // Set once the project context is built; lets the fallback model answer if the primary cannot start a stream.
  let fallbackRequest = null;
  const streamFallback = async () => {
    if (!fallbackRequest || !fallbackConfig()) return false;
    try {
      const text = await aiService.generateCompletion({ ...fallbackRequest, responseFormat: "text" });
      for (const word of String(text).split(" ")) {
        send({ chunk: word + " ", done: false });
        await new Promise((r) => setTimeout(r, 15));
      }
      finish();
      return true;
    } catch (fbErr) {
      return false;
    }
  };

  try {
    const guardrailResponse = checkCopilotGuardrails(question, project_id, null);
    if (guardrailResponse) {
      for (const word of guardrailResponse.split(" ")) {
        send({ chunk: word + " ", done: false });
        await new Promise((r) => setTimeout(r, 25));
      }
      return finish();
    }
    // With a project selected, answer from that project. Without one, answer from every project of the company.
    const scope = project_id ? "project" : "portfolio";
    const context = project_id
      ? await buildProjectContext(Number(project_id), company_id)
      : await buildPortfolioContext(company_id);
    if (!context) {
      send({ error: "Project not found.", done: true });
      return res.end();
    }

    fallbackRequest = { prompt: buildCopilotPrompt(question, context, scope), systemInstruction: COPILOT_SYSTEM };
    const cfg = modelConfig();
    const prompt = `[SYSTEM: ${COPILOT_SYSTEM}]\n\n${buildCopilotPrompt(question, context, scope)}`;
    let streamed = false;
    let buffer = "";

    const response = await axios.post(
      `${cfg.host}/api/generate`,
      { model: cfg.model, prompt, stream: true },
      {
        headers: { "Content-Type": "application/json", ...cfg.headers },
        responseType: "stream",
        timeout: Number(process.env.AI_TIMEOUT_MS) > 0 ? Number(process.env.AI_TIMEOUT_MS) : 60000,
      }
    );

    response.data.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      let at;
      while ((at = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, at).trim();
        buffer = buffer.slice(at + 1);
        if (!line) continue;
        try {
          const obj = JSON.parse(line);
          if (obj.response) {
            streamed = true;
            send({ chunk: obj.response, done: false });
          }
          if (obj.done) finish();
        } catch (err) {
          // a partial line is completed by the next chunk
        }
      }
    });
    response.data.on("end", finish);
    response.data.on("error", (err) => {
      console.warn("AI stream error:", err.message);
      if (streamed) finish();
      else if (!res.writableEnded) {
        streamFallback().then((ok) => {
          if (ok) return;
          send({ error: `The AI model (${cfg.provider}, ${cfg.model}) did not answer. Nothing was generated.`, done: true });
          if (!res.writableEnded) res.end();
        });
      }
    });
  } catch (err) {
    console.error("Stream Copilot error:", err.message);
    if (await streamFallback()) return;
    send({
      error: `The AI model did not answer (${err.response ? `HTTP ${err.response.status}` : err.code || err.message}). Nothing was generated.`,
      done: true,
    });
    if (!res.writableEnded) res.end();
  }
};
