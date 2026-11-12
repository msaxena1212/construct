#!/usr/bin/env node
'use strict';
require('dotenv').config();
const { sequelize } = require('../src/config/db');

async function executeAdjustments() {
  const transaction = await sequelize.transaction();
  try {
    console.log('Connected to MySQL. Starting live stock balance adjustment transaction...');

    const timestamp = new Date();
    const actorId = 1; // superadmin@zyno.com
    const reason = 'User-authorized balance adjustment for ERP validation: target available > 100';

    // 1. MATERIAL_INVENTORY adjustments
    const [matRows] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, cost, vendor_name, status,
             company_id, vendor_id, material_master_id, (stockIn - stockUsed) AS available
      FROM MATERIAL_INVENTORY
      WHERE isDeleted = 0
      FOR UPDATE;
    `, { transaction });

    let matAdjustedCount = 0;
    const matChangeLog = [];

    for (const item of matRows) {
      const avail = Number(item.available);
      if (avail > 100) {
        matChangeLog.push({
          id: item.id,
          name: item.name,
          sku: item.sku,
          prevStockIn: Number(item.stockIn),
          prevAvail: avail,
          delta: 0,
          newStockIn: Number(item.stockIn),
          newAvail: avail,
          action: 'RETAINED (>100)'
        });
        continue;
      }

      const targetAvail = 105;
      const delta = targetAvail - avail;
      const newStockIn = Number(item.stockIn) + delta;
      const newStockRemaining = newStockIn - Number(item.stockUsed);

      // Update MATERIAL_INVENTORY
      await sequelize.query(`
        UPDATE MATERIAL_INVENTORY
        SET stockIn = :newStockIn, stockRemaining = :newStockRemaining, updatedAt = :timestamp
        WHERE id = :id;
      `, {
        replacements: { newStockIn, newStockRemaining, timestamp, id: item.id },
        transaction
      });

      // Update MATERIAL_MASTER stockAvailable if linked
      if (item.material_master_id) {
        await sequelize.query(`
          UPDATE MATERIAL_MASTER
          SET stockAvailable = stockAvailable + :delta, updatedAt = :timestamp
          WHERE id = :masterId;
        `, {
          replacements: { delta, timestamp, masterId: item.material_master_id },
          transaction
        });
      }

      // Insert audit history in MATERIAL_INVENTORY_HISTORY
      await sequelize.query(`
        INSERT INTO MATERIAL_INVENTORY_HISTORY
        (name, sku, category, stockIn, stockUsed, cost, vendor_name, status, note,
         material_id, company_id, vendor_id, material_master_id, user_id, isDeleted, isActive, createdAt, updatedAt)
        VALUES
        (:name, :sku, :category, :delta, :stockUsed, :cost, :vendor_name, 'ADJUSTMENT', :note,
         :material_id, :company_id, :vendor_id, :material_master_id, :user_id, 0, 1, :timestamp, :timestamp);
      `, {
        replacements: {
          name: item.name,
          sku: item.sku,
          category: item.category || 'General',
          delta,
          stockUsed: Number(item.stockUsed || 0),
          cost: item.cost || '0',
          vendor_name: item.vendor_name || 'System Adjustment',
          note: reason,
          material_id: item.id,
          company_id: item.company_id || 1,
          vendor_id: item.vendor_id || null,
          material_master_id: item.material_master_id || null,
          user_id: actorId,
          timestamp
        },
        transaction
      });

      matAdjustedCount++;
      matChangeLog.push({
        id: item.id,
        name: item.name,
        sku: item.sku,
        prevStockIn: Number(item.stockIn),
        prevAvail: avail,
        delta,
        newStockIn,
        newAvail: newStockRemaining,
        action: 'ADJUSTED_UP'
      });
    }

    // 2. EQUIPMENT_INVENTORY adjustments
    const [eqRows] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, cost, vendor_name, status,
             company_id, vendor_id, equipment_master_id, (stockIn - stockUsed) AS available
      FROM EQUIPMENT_INVENTORY
      WHERE isDeleted = 0
      FOR UPDATE;
    `, { transaction });

    let eqAdjustedCount = 0;
    const eqChangeLog = [];

    for (const item of eqRows) {
      const avail = Number(item.available);
      if (avail > 100) {
        eqChangeLog.push({
          id: item.id,
          name: item.name,
          sku: item.sku,
          prevStockIn: Number(item.stockIn),
          prevAvail: avail,
          delta: 0,
          newStockIn: Number(item.stockIn),
          newAvail: avail,
          action: 'RETAINED (>100)'
        });
        continue;
      }

      const targetAvail = 105;
      const delta = targetAvail - avail;
      const newStockIn = Number(item.stockIn) + delta;
      const newStockRemaining = newStockIn - Number(item.stockUsed);

      // Update EQUIPMENT_INVENTORY
      await sequelize.query(`
        UPDATE EQUIPMENT_INVENTORY
        SET stockIn = :newStockIn, stockRemaining = :newStockRemaining, updatedAt = :timestamp
        WHERE id = :id;
      `, {
        replacements: { newStockIn, newStockRemaining, timestamp, id: item.id },
        transaction
      });

      // Update EQUIPMENT_MASTER stockAvailable if linked
      if (item.equipment_master_id) {
        await sequelize.query(`
          UPDATE EQUIPMENT_MASTER
          SET stockAvailable = stockAvailable + :delta, updatedAt = :timestamp
          WHERE id = :masterId;
        `, {
          replacements: { delta, timestamp, masterId: item.equipment_master_id },
          transaction
        });
      }

      // Insert audit history in EQUIPMENT_INVENTORY_HISTORY
      await sequelize.query(`
        INSERT INTO EQUIPMENT_INVENTORY_HISTORY
        (name, sku, category, stockIn, stockUsed, cost, vendor_name, status, note,
         equipment_id, company_id, vendor_id, equipment_master_id, user_id, isDeleted, isActive, createdAt, updatedAt)
        VALUES
        (:name, :sku, :category, :delta, :stockUsed, :cost, :vendor_name, 'ADJUSTMENT', :note,
         :equipment_id, :company_id, :vendor_id, :equipment_master_id, :user_id, 0, 1, :timestamp, :timestamp);
      `, {
        replacements: {
          name: item.name,
          sku: item.sku,
          category: item.category || 'Heavy Machinery',
          delta,
          stockUsed: Number(item.stockUsed || 0),
          cost: item.cost || '0',
          vendor_name: item.vendor_name || 'System Adjustment',
          note: reason,
          equipment_id: item.id,
          company_id: item.company_id || 1,
          vendor_id: item.vendor_id || null,
          equipment_master_id: item.equipment_master_id || null,
          user_id: actorId,
          timestamp
        },
        transaction
      });

      eqAdjustedCount++;
      eqChangeLog.push({
        id: item.id,
        name: item.name,
        sku: item.sku,
        prevStockIn: Number(item.stockIn),
        prevAvail: avail,
        delta,
        newStockIn,
        newAvail: newStockRemaining,
        action: 'ADJUSTED_UP'
      });
    }

    // 3. MATERIAL_PROJECT_STOCK adjustments
    const [matProjRows] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, cost, vendor_name, status,
             company_id, vendor_id, material_master_id, material_id, project_id, project_name, quotation_id,
             (stockIn - stockUsed) AS available
      FROM MATERIAL_PROJECT_STOCK
      WHERE isDeleted = 0
      FOR UPDATE;
    `, { transaction });

    let matProjAdjustedCount = 0;
    const matProjChangeLog = [];

    for (const item of matProjRows) {
      const avail = Number(item.available);
      if (avail > 100) {
        matProjChangeLog.push({
          id: item.id,
          name: item.name,
          project_id: item.project_id,
          prevStockIn: Number(item.stockIn),
          prevAvail: avail,
          delta: 0,
          newStockIn: Number(item.stockIn),
          newAvail: avail,
          action: 'RETAINED (>100)'
        });
        continue;
      }

      const targetAvail = 105;
      const delta = targetAvail - avail;
      const newStockIn = Number(item.stockIn) + delta;
      const newAvail = newStockIn - Number(item.stockUsed);

      await sequelize.query(`
        UPDATE MATERIAL_PROJECT_STOCK
        SET stockIn = :newStockIn, updatedAt = :timestamp
        WHERE id = :id;
      `, {
        replacements: { newStockIn, timestamp, id: item.id },
        transaction
      });

      await sequelize.query(`
        INSERT INTO MATERIAL_PROJECT_STOCK_HISTORY
        (material_project_stock_id, material_id, project_id, name, sku, category, vendor_name,
         stockIn, stockUsed, cost, status, vendor_id, material_master_id, project_name, quotation_id, company_id,
         isDeleted, isActive, createdAt, updatedAt)
        VALUES
        (:mps_id, :material_id, :project_id, :name, :sku, :category, :vendor_name,
         :delta, :stockUsed, :cost, 'ADJUSTMENT', :vendor_id, :material_master_id, :project_name, :quotation_id, :company_id,
         0, 1, :timestamp, :timestamp);
      `, {
        replacements: {
          mps_id: item.id,
          material_id: item.material_id || null,
          project_id: item.project_id || null,
          name: item.name,
          sku: item.sku,
          category: item.category || 'General',
          vendor_name: item.vendor_name || 'System Adjustment',
          delta,
          stockUsed: Number(item.stockUsed || 0),
          cost: item.cost || '0',
          vendor_id: item.vendor_id || null,
          material_master_id: item.material_master_id || null,
          project_name: item.project_name || null,
          quotation_id: item.quotation_id || null,
          company_id: item.company_id || 1,
          timestamp
        },
        transaction
      });

      matProjAdjustedCount++;
      matProjChangeLog.push({
        id: item.id,
        name: item.name,
        project_id: item.project_id,
        prevStockIn: Number(item.stockIn),
        prevAvail: avail,
        delta,
        newStockIn,
        newAvail,
        action: 'ADJUSTED_UP'
      });
    }

    // 4. EQUIPMENT_PROJECT_STOCK adjustments
    const [eqProjRows] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, cost, vendor_name, status,
             company_id, vendor_id, equipment_master_id, equipment_id, project_id, project_name, quotation_id,
             (stockIn - stockUsed) AS available
      FROM EQUIPMENT_PROJECT_STOCK
      WHERE isDeleted = 0
      FOR UPDATE;
    `, { transaction });

    let eqProjAdjustedCount = 0;
    const eqProjChangeLog = [];

    for (const item of eqProjRows) {
      const avail = Number(item.available);
      if (avail > 100) {
        eqProjChangeLog.push({
          id: item.id,
          name: item.name,
          project_id: item.project_id,
          prevStockIn: Number(item.stockIn),
          prevAvail: avail,
          delta: 0,
          newStockIn: Number(item.stockIn),
          newAvail: avail,
          action: 'RETAINED (>100)'
        });
        continue;
      }

      const targetAvail = 105;
      const delta = targetAvail - avail;
      const newStockIn = Number(item.stockIn) + delta;
      const newAvail = newStockIn - Number(item.stockUsed);

      await sequelize.query(`
        UPDATE EQUIPMENT_PROJECT_STOCK
        SET stockIn = :newStockIn, updatedAt = :timestamp
        WHERE id = :id;
      `, {
        replacements: { newStockIn, timestamp, id: item.id },
        transaction
      });

      await sequelize.query(`
        INSERT INTO EQUIPMENT_PROJECT_STOCK_HISTORY
        (equipment_project_stock_id, equipment_id, project_id, name, sku, category, vendor_name,
         stockIn, stockUsed, cost, status, vendor_id, equipment_master_id, project_name, quotation_id, company_id,
         isDeleted, isActive, createdAt, updatedAt)
        VALUES
        (:eps_id, :equipment_id, :project_id, :name, :sku, :category, :vendor_name,
         :delta, :stockUsed, :cost, 'ADJUSTMENT', :vendor_id, :equipment_master_id, :project_name, :quotation_id, :company_id,
         0, 1, :timestamp, :timestamp);
      `, {
        replacements: {
          eps_id: item.id,
          equipment_id: item.equipment_id || null,
          project_id: item.project_id || null,
          name: item.name,
          sku: item.sku,
          category: item.category || 'Heavy Machinery',
          vendor_name: item.vendor_name || 'System Adjustment',
          delta,
          stockUsed: Number(item.stockUsed || 0),
          cost: item.cost || '0',
          vendor_id: item.vendor_id || null,
          equipment_master_id: item.equipment_master_id || null,
          project_name: item.project_name || null,
          quotation_id: item.quotation_id || null,
          company_id: item.company_id || 1,
          timestamp
        },
        transaction
      });

      eqProjAdjustedCount++;
      eqProjChangeLog.push({
        id: item.id,
        name: item.name,
        project_id: item.project_id,
        prevStockIn: Number(item.stockIn),
        prevAvail: avail,
        delta,
        newStockIn,
        newAvail,
        action: 'ADJUSTED_UP'
      });
    }

    // Commit transaction
    await transaction.commit();
    console.log('Transaction committed successfully!\n');

    console.log('=== SUMMARY OF ADJUSTMENTS COMMITTED ===');
    console.log(`MATERIAL_INVENTORY: Total ${matRows.length}, Adjusted ${matAdjustedCount}, Retained ${matRows.length - matAdjustedCount}`);
    console.log(`EQUIPMENT_INVENTORY: Total ${eqRows.length}, Adjusted ${eqAdjustedCount}, Retained ${eqRows.length - eqAdjustedCount}`);
    console.log(`MATERIAL_PROJECT_STOCK: Total ${matProjRows.length}, Adjusted ${matProjAdjustedCount}, Retained ${matProjRows.length - matProjAdjustedCount}`);
    console.log(`EQUIPMENT_PROJECT_STOCK: Total ${eqProjRows.length}, Adjusted ${eqProjAdjustedCount}, Retained ${eqProjRows.length - eqProjAdjustedCount}`);

    // Verification Read-Only Query
    console.log('\n=== POST-ADJUSTMENT VERIFICATION (READ-ONLY) ===');
    const [verifMat] = await sequelize.query(`
      SELECT COUNT(*) AS total,
             SUM(CASE WHEN (stockIn - stockUsed) > 100 THEN 1 ELSE 0 END) AS count_gt_100,
             MIN(stockIn - stockUsed) AS min_available,
             MAX(stockIn - stockUsed) AS max_available
      FROM MATERIAL_INVENTORY WHERE isDeleted = 0;
    `);
    const [verifEq] = await sequelize.query(`
      SELECT COUNT(*) AS total,
             SUM(CASE WHEN (stockIn - stockUsed) > 100 THEN 1 ELSE 0 END) AS count_gt_100,
             MIN(stockIn - stockUsed) AS min_available,
             MAX(stockIn - stockUsed) AS max_available
      FROM EQUIPMENT_INVENTORY WHERE isDeleted = 0;
    `);
    const [verifMatProj] = await sequelize.query(`
      SELECT COUNT(*) AS total,
             SUM(CASE WHEN (stockIn - stockUsed) > 100 THEN 1 ELSE 0 END) AS count_gt_100,
             MIN(stockIn - stockUsed) AS min_available,
             MAX(stockIn - stockUsed) AS max_available
      FROM MATERIAL_PROJECT_STOCK WHERE isDeleted = 0;
    `);
    const [verifEqProj] = await sequelize.query(`
      SELECT COUNT(*) AS total,
             SUM(CASE WHEN (stockIn - stockUsed) > 100 THEN 1 ELSE 0 END) AS count_gt_100,
             MIN(stockIn - stockUsed) AS min_available,
             MAX(stockIn - stockUsed) AS max_available
      FROM EQUIPMENT_PROJECT_STOCK WHERE isDeleted = 0;
    `);

    console.table({
      'MATERIAL_INVENTORY': verifMat[0],
      'EQUIPMENT_INVENTORY': verifEq[0],
      'MATERIAL_PROJECT_STOCK': verifMatProj[0],
      'EQUIPMENT_PROJECT_STOCK': verifEqProj[0]
    });

  } catch (err) {
    await transaction.rollback();
    console.error('Adjustment transaction rolled back due to error:', err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

executeAdjustments();
