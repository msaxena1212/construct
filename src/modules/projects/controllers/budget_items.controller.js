'use strict';
/**
 * Item-wise budget allocation at budget creation (owner decision, 2026-11-02: budget heads).
 *
 *   POST /api/v1/projects/budget/item-allocations
 *   { project_id, budget_total?, items: [{ name, amount, description? }], change_reason? }
 *
 * Creates, in one transaction:
 *   - one budget head per item (reused when a head with the same code already exists for the project);
 *   - a new budget revision in status "draft" with total_budget_amount = the sum of the items;
 *   - one budget-head allocation per item, linked to that revision.
 *
 * Money is compared in paise (integer hundredths), so rounding cannot make the items disagree with budget_total.
 * The budget is left in "draft"; approval uses the existing approval endpoint.
 */
const db = require('../../../models');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');

const MAX_NAME = 100;
const MAX_ITEMS = 200;

const toPaise = (value) => Math.round(Number(value) * 100);
const fromPaise = (paise) => (paise / 100).toFixed(2);

/** Stable head code for an item name: ITEM-<NAME IN CAPITALS>. Names that differ only in punctuation collide. */
function headCodeFor(name) {
  return ('ITEM-' + name.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '')).slice(0, 50);
}

/** Checks the request and returns the cleaned items, or a message describing the first problem. */
function validateItems(items, budgetTotal) {
  if (!Array.isArray(items) || items.length === 0) return { error: 'At least one budget item is required.' };
  if (items.length > MAX_ITEMS) return { error: `A budget can hold at most ${MAX_ITEMS} items.` };

  const cleaned = [];
  const codes = new Set();
  for (const item of items) {
    const name = String(item && item.name != null ? item.name : '').trim();
    if (!name || name.length > MAX_NAME) return { error: `Each budget item needs a name of 1 to ${MAX_NAME} characters.` };
    const amount = Number(item.amount);
    if (!Number.isFinite(amount) || amount < 0) return { error: `The amount for "${name}" must be a non-negative number.` };
    const code = headCodeFor(name);
    if (codes.has(code)) return { error: `Budget item "${name}" repeats an existing item name.` };
    codes.add(code);
    cleaned.push({
      name,
      code,
      paise: toPaise(amount),
      description: item.description ? String(item.description).trim().slice(0, 255) : null,
    });
  }

  const itemsPaise = cleaned.reduce((sum, item) => sum + item.paise, 0);
  if (budgetTotal !== undefined && budgetTotal !== null && budgetTotal !== '') {
    const totalPaise = toPaise(budgetTotal);
    if (!Number.isFinite(totalPaise) || totalPaise < 0) return { error: 'budget_total must be a non-negative number.' };
    if (totalPaise !== itemsPaise) {
      return {
        error: `The budget items add up to ${fromPaise(itemsPaise)} but the budget total is ${fromPaise(totalPaise)}.`,
      };
    }
  }
  return { items: cleaned, itemsPaise };
}

exports.createItemBudget = async (req, res) => {
  const company_id = req.user.company_id;
  const { project_id, budget_total, items, change_reason } = req.body || {};

  if (!project_id) return res.status(400).json({ success: false, message: 'project_id is required.' });

  const checked = validateItems(items, budget_total);
  if (checked.error) return res.status(400).json({ success: false, message: checked.error });

  try {
    await assertProjectAccess(req, project_id);

    const result = await db.sequelize.transaction(async (t) => {
      const heads = [];
      for (const item of checked.items) {
        let head = await db.budget_head.findOne({
          where: { company_id, project_id, head_code: item.code },
          transaction: t,
        });
        if (!head) {
          head = await db.budget_head.create(
            {
              company_id,
              project_id,
              head_code: item.code,
              head_name: item.name,
              description: item.description,
              sort_order: heads.length + 1,
              status: 'active',
              created_by: req.user.id,
            },
            { transaction: t }
          );
        }
        heads.push({ head, paise: item.paise });
      }

      const latest = await db.budget.findOne({
        where: { company_id, project_id },
        order: [['revision_number', 'DESC']],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      const budget = await db.budget.create(
        {
          company_id,
          project_id,
          revision_number: latest ? latest.revision_number + 1 : 1,
          preceding_budget_id: latest ? latest.id : null,
          status: 'draft',
          total_budget_amount: fromPaise(checked.itemsPaise),
          change_reason: change_reason ? String(change_reason).trim().slice(0, 500) : 'Item-wise budget allocation',
          created_by: req.user.id,
        },
        { transaction: t }
      );

      const allocations = await db.budget_head_allocation.bulkCreate(
        heads.map(({ head, paise }) => ({
          company_id,
          project_id,
          budget_id: budget.id,
          budget_head_id: head.id,
          allocated_amount: fromPaise(paise),
          notes: null,
        })),
        { transaction: t }
      );

      return { budget, allocations };
    });

    return res.status(201).json({ success: true, message: 'Item-wise budget created.', data: result });
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    console.error('[createItemBudget]', err);
    return res.status(500).json({ success: false, message: 'Could not create the item-wise budget.' });
  }
};

exports.validateItems = validateItems;
