'use strict';
/** HTTP handlers for the agents: run, log, India compliance and model status. Rules live in the services. */
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');
const agents = require('../services/control_agents.service');
const compliance = require('../services/india_compliance.service');
const briefing = require('../services/control_agent.service');
const scheduler = require('../services/agent_scheduler');
const eacForecast = require('../services/eac_forecast.service');
const directorBriefing = require('../services/director_briefing.service');
const vlmInspector = require('../services/vlm_inspector.service');

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    if (err.status) return res.status(err.status).json({ success: false, message: err.message });
    console.error('[agents]', err);
    return res.status(500).json({ success: false, message: 'The agents could not complete the request.' });
  }
};

const companyOf = (req) => req.user.company_id;
const projectOf = (req) => Number(req.params.projectId);

/** Runs every agent for the project. Acting agents create tasks; a repeat run creates none for the same findings. */
exports.run = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const withNarrative = req.query.narrative !== '0';
  const data = await agents.runAgents({
    company_id: companyOf(req),
    project_id: projectOf(req),
    user_id: req.user.id,
    withNarrative,
  });
  return res.status(200).json({ success: true, message: `Agents ran: ${data.created} new action(s).`, data });
});

/** Runs the agents for every project in every company. Same rules as the scheduler; for demonstrations and checks. */
exports.runAll = handle(async (req, res) => {
  // Scoped to the caller's company. Only the timer (AGENTS_AUTORUN_MINUTES) runs across every company.
  const data = await scheduler.runAllProjects({ company_id: companyOf(req), withNarrative: req.query.narrative === '1' });
  return res.status(200).json({ success: true, message: `Agents ran for ${data.projects} project(s).`, data });
});

exports.log = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await agents.agentLog({ project_id: projectOf(req), limit: req.query.limit });
  return res.status(200).json({ success: true, data });
});

exports.indiaCompliance = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await compliance.indiaCompliance({ company_id: companyOf(req), project_id: projectOf(req) });
  return res.status(200).json({ success: true, data });
});

/** Whether the language model answers, and which provider and model are configured. */
exports.modelStatus = handle(async (req, res) => {
  const data = await briefing.modelStatus();
  return res.status(200).json({ success: true, data });
});

exports.roster = handle(async (req, res) => {
  const data = agents.getAgentRoster();
  return res.status(200).json({ success: true, data });
});

exports.insights = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await agents.getProjectInsights({ company_id: companyOf(req), project_id: projectOf(req) });
  return res.status(200).json({ success: true, data });
});

exports.eacForecast = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await eacForecast.computeEacForecast({ company_id: companyOf(req), project_id: projectOf(req) });
  return res.status(200).json({ success: true, data });
});

exports.listBriefings = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await directorBriefing.listDirectorBriefings({
    company_id: companyOf(req),
    project_id: projectOf(req),
    limit: req.query.limit,
  });
  return res.status(200).json({ success: true, data });
});

exports.runBriefing = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const withNarrative = req.query.narrative !== '0' && req.body?.withNarrative !== false;
  const data = await directorBriefing.generateDirectorBriefing({
    company_id: companyOf(req),
    project_id: projectOf(req),
    user_id: req.user.id,
    withNarrative,
    scheduled: false,
    force: true,
  });
  return res.status(201).json({ success: true, data });
});

exports.dailyPortfolioBriefings = handle(async (req, res) => {
  const data = await directorBriefing.getPortfolioDailyBriefings({ company_id: companyOf(req) });
  return res.status(200).json({ success: true, data });
});

exports.vlmInspections = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await vlmInspector.listVlmInspections({
    company_id: companyOf(req),
    project_id: projectOf(req),
    limit: req.query.limit,
  });
  return res.status(200).json({ success: true, data });
});
