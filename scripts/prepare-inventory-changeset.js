#!/usr/bin/env node
'use strict';
require('dotenv').config();
const { sequelize } = require('../src/config/db');

async function prepareChangeSet() {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL.\n');

    // 1. MATERIAL_INVENTORY (Warehouse inventory)
    const [matInv] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, (stockIn - stockUsed) AS available, company_id
      FROM MATERIAL_INVENTORY
      WHERE isDeleted = 0;
    `);

    const matInvPlan = matInv.map(item => {
      const avail = Number(item.available);
      const targetAvail = 105; // Target > 100
      const delta = avail >= 101 ? 0 : (targetAvail - avail);
      const newStockIn = Number(item.stockIn) + delta;
      const newAvail = newStockIn - Number(item.stockUsed);
      return {
        id: item.id,
        name: item.name,
        sku: item.sku,
        company_id: item.company_id,
        current_stockIn: Number(item.stockIn),
        stockUsed: Number(item.stockUsed),
        current_available: avail,
        delta,
        new_stockIn: newStockIn,
        new_available: newAvail,
        status: delta === 0 ? 'RETAIN (>100)' : 'ADJUST_UP'
      };
    });

    console.log('=== MATERIAL_INVENTORY AUDIT & CHANGE SET PLAN ===');
    console.log(`Total active records: ${matInvPlan.length}`);
    console.log(`Already > 100: ${matInvPlan.filter(p => p.status === 'RETAIN (>100)').length}`);
    console.log(`Needs adjustment: ${matInvPlan.filter(p => p.status === 'ADJUST_UP').length}`);
    console.table(matInvPlan);

    // 2. EQUIPMENT_INVENTORY (Warehouse equipment)
    const [eqInv] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, (stockIn - stockUsed) AS available, company_id
      FROM EQUIPMENT_INVENTORY
      WHERE isDeleted = 0;
    `);

    const eqInvPlan = eqInv.map(item => {
      const avail = Number(item.available);
      const targetAvail = 105;
      const delta = avail >= 101 ? 0 : (targetAvail - avail);
      const newStockIn = Number(item.stockIn) + delta;
      const newAvail = newStockIn - Number(item.stockUsed);
      return {
        id: item.id,
        name: item.name,
        sku: item.sku,
        company_id: item.company_id,
        current_stockIn: Number(item.stockIn),
        stockUsed: Number(item.stockUsed),
        current_available: avail,
        delta,
        new_stockIn: newStockIn,
        new_available: newAvail,
        status: delta === 0 ? 'RETAIN (>100)' : 'ADJUST_UP'
      };
    });

    console.log('\n=== EQUIPMENT_INVENTORY AUDIT & CHANGE SET PLAN ===');
    console.log(`Total active records: ${eqInvPlan.length}`);
    console.log(`Already > 100: ${eqInvPlan.filter(p => p.status === 'RETAIN (>100)').length}`);
    console.log(`Needs adjustment: ${eqInvPlan.filter(p => p.status === 'ADJUST_UP').length}`);
    console.table(eqInvPlan);

    // 3. MATERIAL_PROJECT_STOCK
    const [matProj] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, (stockIn - stockUsed) AS available, company_id, project_id, project_name
      FROM MATERIAL_PROJECT_STOCK
      WHERE isDeleted = 0;
    `);

    const matProjPlan = matProj.map(item => {
      const avail = Number(item.available);
      const targetAvail = 105;
      const delta = avail >= 101 ? 0 : (targetAvail - avail);
      const newStockIn = Number(item.stockIn) + delta;
      const newAvail = newStockIn - Number(item.stockUsed);
      return {
        id: item.id,
        name: item.name,
        sku: item.sku,
        project_id: item.project_id,
        project_name: item.project_name,
        current_stockIn: Number(item.stockIn),
        stockUsed: Number(item.stockUsed),
        current_available: avail,
        delta,
        new_stockIn: newStockIn,
        new_available: newAvail,
        status: delta === 0 ? 'RETAIN (>100)' : 'ADJUST_UP'
      };
    });

    console.log('\n=== MATERIAL_PROJECT_STOCK AUDIT & CHANGE SET PLAN ===');
    console.log(`Total active records: ${matProjPlan.length}`);
    console.log(`Already > 100: ${matProjPlan.filter(p => p.status === 'RETAIN (>100)').length}`);
    console.log(`Needs adjustment: ${matProjPlan.filter(p => p.status === 'ADJUST_UP').length}`);
    console.table(matProjPlan);

    // 4. EQUIPMENT_PROJECT_STOCK
    const [eqProj] = await sequelize.query(`
      SELECT id, name, sku, category, stockIn, stockUsed, (stockIn - stockUsed) AS available, company_id, project_id, project_name
      FROM EQUIPMENT_PROJECT_STOCK
      WHERE isDeleted = 0;
    `);

    const eqProjPlan = eqProj.map(item => {
      const avail = Number(item.available);
      const targetAvail = 105;
      const delta = avail >= 101 ? 0 : (targetAvail - avail);
      const newStockIn = Number(item.stockIn) + delta;
      const newAvail = newStockIn - Number(item.stockUsed);
      return {
        id: item.id,
        name: item.name,
        sku: item.sku,
        project_id: item.project_id,
        project_name: item.project_name,
        current_stockIn: Number(item.stockIn),
        stockUsed: Number(item.stockUsed),
        current_available: avail,
        delta,
        new_stockIn: newStockIn,
        new_available: newAvail,
        status: delta === 0 ? 'RETAIN (>100)' : 'ADJUST_UP'
      };
    });

    console.log('\n=== EQUIPMENT_PROJECT_STOCK AUDIT & CHANGE SET PLAN ===');
    console.log(`Total active records: ${eqProjPlan.length}`);
    console.log(`Already > 100: ${eqProjPlan.filter(p => p.status === 'RETAIN (>100)').length}`);
    console.log(`Needs adjustment: ${eqProjPlan.filter(p => p.status === 'ADJUST_UP').length}`);
    console.table(eqProjPlan);

  } catch (err) {
    console.error('Error preparing change set:', err.message);
  } finally {
    await sequelize.close();
  }
}

prepareChangeSet();
