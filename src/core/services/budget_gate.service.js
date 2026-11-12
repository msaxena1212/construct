'use strict';
/**
 * Budget gate for subcontractor RA bills (benchmark item 5). Before an RA bill posts its cost to a budget head, the
 * head's headroom is checked against the approved budget. The company policy is RBAC_COMPANY_MASTER.budget_gate_mode:
 *   'block' - a bill that would exceed the headroom is refused (the approval is rolled back)
 *   'warn'  - the bill proceeds and the excess is returned with the bill as a warning (default)
 *   'off'   - no check
 * An unknown stored value is treated as 'block' (fail closed).
 *
 * Headroom = the head's allocation in the latest APPROVED budget revision, minus the net cost already recognized
 * against that head in the cost ledger. Reversals are negative ledger rows, so the sum is net.
 *
 * Limits, stated so nobody relies on more than this gives:
 *   - Purchase orders carry no budget head, so open PO commitments are NOT deducted. The gate checks recognized cost.
 *   - Not applicable when the project has no approved budget, or the head has no allocation. The result says why.
 */
const db = require('../../models');

const MODES = ['block', 'warn', 'off'];

const round2 = (n) => Number(Number(n || 0).toFixed(2));

/** Maps a stored policy value to a mode. Missing means 'warn' (the default); an unknown value means 'block'. */
function normaliseMode(value) {
  if (value === null || value === undefined || value === '') return 'warn';
  return MODES.includes(value) ? value : 'block';
}

async function headroomForHead({ company_id, project_id, budget_head_id, transaction = null }) {
  const budget = await db.budget.findOne({
    where: { company_id, project_id, status: 'approved' },
    order: [['revision_number', 'DESC']],
    transaction,
  });
  if (!budget) return { applicable: false, reason: 'no_approved_budget' };

  const allocation = await db.budget_head_allocation.findOne({
    where: { company_id, budget_id: budget.id, budget_head_id },
    transaction,
  });
  if (!allocation) return { applicable: false, reason: 'head_not_allocated', budget_id: budget.id };

  const recognized = round2(
    await db.cost_ledger.sum('amount', {
      where: { company_id, project_id, budget_head_id },
      transaction,
    })
  );
  const allocated = round2(allocation.allocated_amount);
  return {
    applicable: true,
    budget_id: budget.id,
    allocated,
    recognized,
    headroom: round2(allocated - recognized),
  };
}

/**
 * Checks one amount against the head's headroom under the given mode.
 * @returns {{ status: 'off'|'not_applicable'|'within'|'exceeded', mode: string, requested: number, reason?: string,
 *   allocated?: number, recognized?: number, headroom?: number, excess?: number }}
 */
async function checkBudgetGate({ company_id, project_id, budget_head_id, amount, mode, transaction = null }) {
  const effectiveMode = normaliseMode(mode);
  const requested = round2(amount);
  if (effectiveMode === 'off') return { status: 'off', mode: effectiveMode, requested };

  const headroom = await headroomForHead({ company_id, project_id, budget_head_id, transaction });
  if (!headroom.applicable) {
    return { status: 'not_applicable', mode: effectiveMode, requested, reason: headroom.reason };
  }
  const excess = round2(requested - headroom.headroom);
  if (excess <= 0) {
    return { status: 'within', mode: effectiveMode, requested, allocated: headroom.allocated, recognized: headroom.recognized, headroom: headroom.headroom, excess: 0 };
  }
  return { status: 'exceeded', mode: effectiveMode, requested, allocated: headroom.allocated, recognized: headroom.recognized, headroom: headroom.headroom, excess };
}

module.exports = { checkBudgetGate, headroomForHead, normaliseMode, MODES };
