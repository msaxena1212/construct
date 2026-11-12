'use strict';
const db = require('../../../models');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');

const getCompanyId = (req) => req.user?.company_id || req.user?.companyId || null;

class BudgetWBSController {
  // ── WBS Endpoints ────────────────────────────────────────────────────────

  async createWBS(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const { project_id, parent_id, wbs_code, name, description, milestone_id } = req.body;

      if (!project_id || !wbs_code || !name) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'project_id, wbs_code, and name are required.' });
      }

      await assertProjectAccess(req, project_id);

      // Validate project belongs to company
      const proj = await db.project.findOne({ where: { id: project_id, company_id }, transaction: t });
      if (!proj) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      let level = 1;
      if (parent_id) {
        const parentNode = await db.wbs.findOne({
          where: { id: parent_id, company_id, project_id },
          transaction: t,
        });
        if (!parentNode) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: 'Parent WBS node must belong to the same project and company.',
          });
        }
        level = parentNode.level + 1;
      }

      // Check unique code per project
      const existing = await db.wbs.findOne({
        where: { company_id, project_id, wbs_code: String(wbs_code).trim() },
        transaction: t,
      });
      if (existing) {
        await t.rollback();
        return res.status(409).json({
          success: false,
          message: `WBS code '${wbs_code}' already exists in this project.`,
        });
      }

      const node = await db.wbs.create(
        {
          company_id,
          project_id,
          parent_id: parent_id || null,
          wbs_code: String(wbs_code).trim(),
          name: String(name).trim(),
          description: description || null,
          level,
          milestone_id: milestone_id || null,
          status: 'active',
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(201).json({ success: true, message: 'WBS node created successfully.', data: node });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[createWBS]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async getProjectWBS(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { projectId } = req.params;

      await assertProjectAccess(req, projectId);

      const nodes = await db.wbs.findAll({
        where: { company_id, project_id: projectId },
        order: [['level', 'ASC'], ['wbs_code', 'ASC']],
      });

      return res.status(200).json({ success: true, count: nodes.length, data: nodes });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[getProjectWBS]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateWBS(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const { id } = req.params;
      const { name, description, status, parent_id } = req.body;

      const node = await db.wbs.findOne({
        where: { id, company_id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!node) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'WBS node not found.' });
      }

      await assertProjectAccess(req, node.project_id);

      if (parent_id !== undefined && parent_id !== node.parent_id) {
        if (Number(parent_id) === Number(id)) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'A WBS node cannot be its own parent.' });
        }
        if (parent_id !== null) {
          const parentNode = await db.wbs.findOne({
            where: { id: parent_id, company_id, project_id: node.project_id },
            transaction: t,
          });
          if (!parentNode) {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'Target parent not found in same project.' });
          }

          // Circular check: ensure target parent is not a descendant of current node
          let curr = parentNode;
          while (curr && curr.parent_id) {
            if (Number(curr.parent_id) === Number(id)) {
              await t.rollback();
              return res.status(400).json({
                success: false,
                message: 'Circular reference detected: cannot move node under one of its descendants.',
              });
            }
            curr = await db.wbs.findOne({
              where: { id: curr.parent_id, company_id },
              transaction: t,
            });
          }
          node.parent_id = parent_id;
          node.level = parentNode.level + 1;
        } else {
          node.parent_id = null;
          node.level = 1;
        }
      }

      if (name) node.name = String(name).trim();
      if (description !== undefined) node.description = description;
      if (status) node.status = status;

      await node.save({ transaction: t });
      await t.commit();
      return res.status(200).json({ success: true, message: 'WBS node updated successfully.', data: node });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[updateWBS]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ── CBS Endpoints ────────────────────────────────────────────────────────

  async createCBS(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { cost_code, name, category, description } = req.body;

      if (!cost_code || !name || !category) {
        return res.status(400).json({ success: false, message: 'cost_code, name, and category are required.' });
      }

      const validCategories = ['material', 'labour', 'equipment', 'subcontractor', 'overhead'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: `Category must be one of: ${validCategories.join(', ')}`,
        });
      }

      const existing = await db.cbs.findOne({
        where: { company_id, cost_code: String(cost_code).trim().toUpperCase() },
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Cost code '${cost_code}' already exists for this company.`,
        });
      }

      const cbs = await db.cbs.create({
        company_id,
        cost_code: String(cost_code).trim().toUpperCase(),
        name: String(name).trim(),
        category,
        description: description || null,
        status: 'active',
      });

      return res.status(201).json({ success: true, message: 'CBS cost code created successfully.', data: cbs });
    } catch (err) {
      console.error('[createCBS]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async getCompanyCBS(req, res) {
    try {
      const company_id = getCompanyId(req);
      const codes = await db.cbs.findAll({
        where: { company_id },
        order: [['category', 'ASC'], ['cost_code', 'ASC']],
      });
      return res.status(200).json({ success: true, count: codes.length, data: codes });
    } catch (err) {
      console.error('[getCompanyCBS]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ── Batch N: Budget Head Management ────────────────────────────────────

  async createBudgetHead(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { project_id, head_code, head_name, description, sort_order } = req.body;

      if (!project_id || !head_code || !head_name) {
        return res.status(400).json({ success: false, message: 'project_id, head_code, and head_name are required.' });
      }

      await assertProjectAccess(req, project_id);

      const proj = await db.project.findOne({ where: { id: project_id, company_id } });
      if (!proj) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      const existing = await db.budget_head.findOne({
        where: { company_id, project_id, head_code: String(head_code).trim().toUpperCase() },
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Budget head code '${head_code}' already exists for this project.`,
        });
      }

      const head = await db.budget_head.create({
        company_id,
        project_id,
        head_code: String(head_code).trim().toUpperCase(),
        head_name: String(head_name).trim(),
        description: description || null,
        sort_order: sort_order ? parseInt(sort_order, 10) : 0,
        status: 'active',
        created_by: req.user?.id || null,
      });

      return res.status(201).json({ success: true, message: 'Budget head created successfully.', data: head });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[createBudgetHead]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async getProjectBudgetHeads(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { projectId } = req.params;

      await assertProjectAccess(req, projectId);

      const heads = await db.budget_head.findAll({
        where: { company_id, project_id: projectId },
        order: [['sort_order', 'ASC'], ['head_code', 'ASC']],
      });

      return res.status(200).json({ success: true, count: heads.length, data: heads });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[getProjectBudgetHeads]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateBudgetHead(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { id } = req.params;
      const { head_name, description, sort_order, status } = req.body;

      const head = await db.budget_head.findOne({ where: { id, company_id } });
      if (!head) {
        return res.status(404).json({ success: false, message: 'Budget head not found.' });
      }

      await assertProjectAccess(req, head.project_id);

      if (head_name) head.head_name = String(head_name).trim();
      if (description !== undefined) head.description = description;
      if (sort_order !== undefined) head.sort_order = parseInt(sort_order, 10);
      if (status) head.status = status;

      await head.save();
      return res.status(200).json({ success: true, message: 'Budget head updated successfully.', data: head });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[updateBudgetHead]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteBudgetHead(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { id } = req.params;

      const head = await db.budget_head.findOne({ where: { id, company_id } });
      if (!head) {
        return res.status(404).json({ success: false, message: 'Budget head not found.' });
      }

      await assertProjectAccess(req, head.project_id);

      // Check if referenced in any approved budget revision
      const approvedAllocation = await db.budget_head_allocation.findOne({
        where: { budget_head_id: id, company_id },
        include: [{
          model: db.budget,
          as: 'budget',
          where: { status: 'approved' },
        }],
      });

      if (approvedAllocation) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete budget head: it is referenced by an approved budget baseline.',
        });
      }

      await head.destroy();
      return res.status(200).json({ success: true, message: 'Budget head deleted successfully.' });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[deleteBudgetHead]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ── Versioned Project Budget Endpoints ────────────────────────────────────

  async createBudget(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const { project_id, change_reason, head_allocations, lines } = req.body;

      if (!project_id) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'project_id is required.' });
      }

      await assertProjectAccess(req, project_id);

      // Determine next revision number for this project
      const latestBudget = await db.budget.findOne({
        where: { company_id, project_id },
        order: [['revision_number', 'DESC']],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      const nextRev = latestBudget ? latestBudget.revision_number + 1 : 1;

      let totalAmount = 0;
      const validatedAllocations = [];
      const validatedLines = [];

      // 1. Process Budget Head Allocations if provided (Batch N Structure)
      if (Array.isArray(head_allocations) && head_allocations.length > 0) {
        for (const ha of head_allocations) {
          if (!ha.budget_head_id || ha.allocated_amount == null) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: 'Each head allocation must specify budget_head_id and allocated_amount.',
            });
          }

          const amt = parseFloat(ha.allocated_amount);
          if (isNaN(amt) || amt < 0) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: 'allocated_amount must be a non-negative number.',
            });
          }

          const head = await db.budget_head.findOne({
            where: { id: ha.budget_head_id, company_id, project_id },
            transaction: t,
          });
          if (!head) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: `Budget head #${ha.budget_head_id} is invalid for this project.`,
            });
          }

          totalAmount += amt;
          validatedAllocations.push({
            company_id,
            project_id,
            budget_head_id: ha.budget_head_id,
            allocated_amount: Number(amt.toFixed(2)),
            notes: ha.notes || null,
          });
        }
      }

      // 2. Process Detailed Lines (Optional or fallback)
      if (Array.isArray(lines) && lines.length > 0) {
        for (const line of lines) {
          if (!line.wbs_id || !line.cbs_id || line.budgeted_amount == null) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: 'Each line must specify wbs_id, cbs_id, and budgeted_amount.',
            });
          }

          const amt = parseFloat(line.budgeted_amount);
          if (isNaN(amt) || amt < 0) {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'budgeted_amount must be a non-negative number.' });
          }

          const wbs = await db.wbs.findOne({
            where: { id: line.wbs_id, company_id, project_id },
            transaction: t,
          });
          if (!wbs) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: `WBS node #${line.wbs_id} is invalid for this project.`,
            });
          }

          const cbs = await db.cbs.findOne({
            where: { id: line.cbs_id, company_id },
            transaction: t,
          });
          if (!cbs) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: `CBS code #${line.cbs_id} is invalid.`,
            });
          }

          // If budget_head_id provided on line, validate scope
          if (line.budget_head_id) {
            const head = await db.budget_head.findOne({
              where: { id: line.budget_head_id, company_id, project_id },
              transaction: t,
            });
            if (!head) {
              await t.rollback();
              return res.status(400).json({
                success: false,
                message: `Line budget head #${line.budget_head_id} is invalid.`,
              });
            }
          }

          // If no head_allocations, sum from lines for backward compatibility
          if (validatedAllocations.length === 0) {
            totalAmount += amt;
          }

          validatedLines.push({
            company_id,
            project_id,
            budget_head_id: line.budget_head_id || null,
            wbs_id: line.wbs_id,
            cbs_id: line.cbs_id,
            boq_item_id: line.boq_item_id || null,
            line_description: line.line_description || null,
            quantity: line.quantity ? parseFloat(line.quantity) : 0,
            unit_of_measure: line.unit_of_measure || null,
            unit_rate: line.unit_rate ? parseFloat(line.unit_rate) : 0,
            budgeted_amount: Number(amt.toFixed(2)),
            notes: line.notes || null,
          });
        }
      }

      if (validatedAllocations.length === 0 && validatedLines.length === 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'Either head_allocations or lines array must be provided.',
        });
      }

      // Check that detailed lines under a head do not exceed the head's allocated amount
      if (validatedAllocations.length > 0 && validatedLines.length > 0) {
        for (const alloc of validatedAllocations) {
          const linesUnderHead = validatedLines.filter((l) => Number(l.budget_head_id) === Number(alloc.budget_head_id));
          const lineSum = linesUnderHead.reduce((acc, l) => acc + l.budgeted_amount, 0);
          if (lineSum > alloc.allocated_amount) {
            await t.rollback();
            return res.status(400).json({
              success: false,
              message: `Detailed lines total (₹${lineSum}) exceeds allocated amount (₹${alloc.allocated_amount}) for budget head #${alloc.budget_head_id}.`,
            });
          }
        }
      }

      const budget = await db.budget.create(
        {
          company_id,
          project_id,
          revision_number: nextRev,
          preceding_budget_id: latestBudget ? latestBudget.id : null,
          status: 'draft',
          total_budget_amount: Number(totalAmount.toFixed(2)),
          change_reason: change_reason || null,
          created_by: req.user?.id || null,
        },
        { transaction: t }
      );

      // Create head allocations
      for (const va of validatedAllocations) {
        va.budget_id = budget.id;
        await db.budget_head_allocation.create(va, { transaction: t });
      }

      // Create detailed lines
      for (const vl of validatedLines) {
        vl.budget_id = budget.id;
        await db.budget_line.create(vl, { transaction: t });
      }

      await t.commit();
      return res.status(201).json({
        success: true,
        message: `Project budget revision #${nextRev} created with total ₹${totalAmount.toFixed(2)}.`,
        data: budget,
      });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[createBudget]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async approveBudget(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const { id } = req.params;

      const budget = await db.budget.findOne({
        where: { id, company_id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!budget) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Budget not found.' });
      }

      await assertProjectAccess(req, budget.project_id);

      if (budget.status !== 'draft' && budget.status !== 'submitted') {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Cannot approve budget in '${budget.status}' status.`,
        });
      }

      // Segregation of duties: creator cannot approve their own budget
      if (budget.created_by && Number(budget.created_by) === Number(req.user?.id)) {
        await t.rollback();
        return res.status(403).json({
          success: false,
          message: 'Segregation of duties: Budget creator cannot approve their own budget.',
        });
      }

      // Supersede any previously approved budget for this project
      await db.budget.update(
        { status: 'superseded' },
        {
          where: { company_id, project_id: budget.project_id, status: 'approved' },
          transaction: t,
        }
      );

      await budget.update(
        {
          status: 'approved',
          approved_by: req.user?.id || null,
          approved_at: new Date(),
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).json({
        success: true,
        message: `Budget revision #${budget.revision_number} approved and locked as active baseline.`,
        data: budget,
      });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[approveBudget]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async getBudgetRevisions(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { projectId } = req.params;

      await assertProjectAccess(req, projectId);

      const budgets = await db.budget.findAll({
        where: { company_id, project_id: projectId },
        order: [['revision_number', 'DESC']],
        include: [
          {
            model: db.budget_head_allocation,
            as: 'head_allocations',
            include: [{ model: db.budget_head, as: 'head' }],
          },
          { model: db.budget_line, as: 'lines' },
        ],
      });

      return res.status(200).json({ success: true, count: budgets.length, data: budgets });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[getBudgetRevisions]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async linkBOQToWBS(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const { boq_item_id, wbs_id, cbs_id } = req.body;

      if (!boq_item_id || !wbs_id || !cbs_id) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'boq_item_id, wbs_id, and cbs_id are required.',
        });
      }

      const boq = await db.boq_item.findOne({
        where: { id: boq_item_id, company_id },
        transaction: t,
      });
      if (!boq) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'BOQ item not found.' });
      }

      await assertProjectAccess(req, boq.project_id);

      const wbs = await db.wbs.findOne({
        where: { id: wbs_id, company_id, project_id: boq.project_id },
        transaction: t,
      });
      if (!wbs) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'WBS node does not exist or does not belong to the same project.',
        });
      }

      const cbs = await db.cbs.findOne({
        where: { id: cbs_id, company_id },
        transaction: t,
      });
      if (!cbs) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'CBS cost code not found.' });
      }

      await boq.update({ wbs_id, cbs_id }, { transaction: t });
      await t.commit();

      return res.status(200).json({
        success: true,
        message: 'BOQ item mapped to WBS and CBS successfully.',
        data: boq,
      });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[linkBOQToWBS]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ── Batch M: Project Cost Reconciliation Endpoint ────────────────────────

  async getProjectCostReconciliation(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { projectId } = req.params;

      await assertProjectAccess(req, projectId);

      const CommitmentLedgerService = require('../../../core/services/commitment_ledger.service');
      const reconciliation = await CommitmentLedgerService.getProjectFinancialReconciliation(
        projectId,
        company_id
      );

      return res.status(200).json({
        success: true,
        message: 'Project financial and commitment reconciliation retrieved successfully.',
        data: reconciliation,
      });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[getProjectCostReconciliation]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ── Batch Q: Project Cost Ledger Endpoints ───────────────────────────────

  async recordActualCost(req, res) {
    try {
      const company_id = getCompanyId(req);
      const {
        project_id,
        cost_category,
        budget_head_id,
        wbs_id,
        cbs_id,
        source_type,
        source_id,
        source_line_identifier,
        recognition_date,
        quantity,
        rate,
        amount,
        currency,
        idempotency_key,
        reason,
      } = req.body;

      if (!project_id) {
        return res.status(400).json({ success: false, message: 'project_id is required.' });
      }

      await assertProjectAccess(req, project_id);

      const ProjectCostLedgerService = require('../../../core/services/project_cost_ledger.service');
      const result = await ProjectCostLedgerService.recordCost({
        company_id,
        project_id,
        cost_category,
        budget_head_id,
        wbs_id,
        cbs_id,
        source_type,
        source_id,
        source_line_identifier,
        recognition_date,
        quantity,
        rate,
        amount,
        currency,
        idempotency_key,
        reason,
        posted_by: req.user?.id || null,
      });

      return res.status(result.idempotent ? 200 : 201).json({
        success: true,
        message: result.idempotent
          ? 'Cost already posted (idempotent replay).'
          : 'Actual cost posted successfully to project cost ledger.',
        data: result.entry,
        idempotent: result.idempotent,
      });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[recordActualCost]', err);
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async reverseActualCost(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { id } = req.params;
      const { reason } = req.body;

      if (!reason || String(reason).trim() === '') {
        return res.status(400).json({ success: false, message: 'Audit reason is required for reversal.' });
      }

      const ProjectCostLedgerService = require('../../../core/services/project_cost_ledger.service');
      const result = await ProjectCostLedgerService.recordReversal({
        cost_ledger_id: id,
        company_id,
        reason,
        performed_by: req.user?.id || null,
      });

      return res.status(result.idempotent ? 200 : 201).json({
        success: true,
        message: result.idempotent
          ? 'Reversal already recorded (idempotent replay).'
          : 'Compensating reversal recorded successfully in project cost ledger.',
        data: result.entry,
        idempotent: result.idempotent,
      });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[reverseActualCost]', err);
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new BudgetWBSController();
