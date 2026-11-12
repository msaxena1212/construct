'use strict';
/**
 * Runs the agents for every project on a timer, and on demand. Off unless AGENTS_AUTORUN_MINUTES is a positive number.
 * Scheduled runs have no signed-in user, so the tasks they create have no owner until someone assigns them. They do
 * not generate a narrative, which keeps each run quick.
 */
const db = require('../../../models');
const agents = require('./control_agents.service');
const directorBriefing = require('./director_briefing.service');

let timer = null;
let morningTimer = null;
let lastMorningRunDate = null;

/**
 * Runs the agents for every project, or only for one company when company_id is given (the on-demand endpoint always
 * passes the caller's company). One project failing does not stop the others.
 */
async function runAllProjects({ company_id = null, withNarrative = false } = {}) {
  const where = company_id ? { company_id } : {};
  const projects = await db.project.findAll({ where, attributes: ['id', 'company_id'], order: [['id', 'ASC']] });
  const results = [];
  for (const p of projects) {
    try {
      const r = await agents.runAgents({ company_id: p.company_id, project_id: p.id, user_id: null, withNarrative });
      results.push({ project_id: p.id, created: r.created, already_recorded: r.already_recorded });
    } catch (err) {
      results.push({ project_id: p.id, error: err.message });
    }
  }
  return { ran_at: new Date().toISOString(), projects: results.length, results };
}

/** Starts the timer when AGENTS_AUTORUN_MINUTES is a positive number. Returns the timer, or null when off. */
function startAgentScheduler(minutes) {
  const every = Number(minutes);
  if (!Number.isFinite(every) || every <= 0) return null;
  if (timer) return timer;
  timer = setInterval(() => {
    runAllProjects()
      .then((r) => console.log(`[agents] scheduled run: ${r.projects} project(s) at ${r.ran_at}`))
      .catch((err) => console.error('[agents] scheduled run failed:', err.message));
  }, every * 60000);
  if (typeof timer.unref === 'function') timer.unref();
  console.log(`[agents] scheduler on: every ${every} minute(s)`);
  return timer;
}

function stopAgentScheduler() {
  if (timer) clearInterval(timer);
  timer = null;
}

/**
 * Generates idempotent morning director briefings across all active projects (or one company).
 * Each project gets at most one scheduled briefing per calendar date (`morning:<project_id>:<YYYY-MM-DD>`).
 */
async function runMorningBriefings({ company_id = null, withNarrative = false, now = new Date() } = {}) {
  const where = company_id ? { company_id, isDeleted: false } : { isDeleted: false };
  const projects = await db.project.findAll({ where, attributes: ['id', 'company_id'], order: [['id', 'ASC']] });
  const results = [];
  for (const p of projects) {
    try {
      const r = await directorBriefing.generateDirectorBriefing({
        company_id: p.company_id,
        project_id: p.id,
        user_id: null,
        withNarrative,
        scheduled: true,
        now,
      });
      results.push({ project_id: p.id, skipped: Boolean(r.skipped), id: r.id || null });
    } catch (err) {
      results.push({ project_id: p.id, error: err.message });
    }
  }
  return { ran_at: now.toISOString(), projects: results.length, results };
}

/**
 * Starts the daily Morning Director Briefing timer when DIRECTOR_BRIEFING_HOUR (0-23) is configured.
 * Checks once per minute and executes `runMorningBriefings` once on the target local hour/minute.
 */
function startMorningBriefingScheduler(
  hourInput = process.env.DIRECTOR_BRIEFING_HOUR,
  minuteInput = process.env.DIRECTOR_BRIEFING_MINUTE ?? 0
) {
  if (hourInput === undefined || hourInput === null || String(hourInput).trim() === '') return null;
  const targetHour = Number(hourInput);
  const targetMinute = Number(minuteInput || 0);
  if (!Number.isInteger(targetHour) || targetHour < 0 || targetHour > 23) return null;
  if (!Number.isInteger(targetMinute) || targetMinute < 0 || targetMinute > 59) return null;
  if (morningTimer) return morningTimer;

  morningTimer = setInterval(() => {
    const now = new Date();
    const todayKey = now.toISOString().slice(0, 10);
    if (now.getHours() === targetHour && now.getMinutes() === targetMinute && lastMorningRunDate !== todayKey) {
      lastMorningRunDate = todayKey;
      runMorningBriefings({ withNarrative: true, now })
        .then((r) => console.log(`[briefings] morning director digest ran for ${r.projects} project(s)`))
        .catch((err) => console.error('[briefings] morning digest failed:', err.message));
    }
  }, 60000);
  if (typeof morningTimer.unref === 'function') morningTimer.unref();
  console.log(`[briefings] morning scheduler armed for ${String(targetHour).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}`);
  return morningTimer;
}

function stopMorningBriefingScheduler() {
  if (morningTimer) clearInterval(morningTimer);
  morningTimer = null;
  lastMorningRunDate = null;
}

module.exports = {
  runAllProjects,
  startAgentScheduler,
  stopAgentScheduler,
  runMorningBriefings,
  startMorningBriefingScheduler,
  stopMorningBriefingScheduler,
};
