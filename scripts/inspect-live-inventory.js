#!/usr/bin/env node
'use strict';
require('dotenv').config();
const { sequelize } = require('../src/config/db');

async function inspectInventory() {
  console.log('Connecting to database...');
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL successfully.\n');

    // 1. Check existing tables
    const [tables] = await sequelize.query('SHOW TABLES;');
    const tableNames = tables.map((t) => Object.values(t)[0]);
    console.log('--- Database Tables ---');
    console.log(`Total Tables: ${tableNames.length}`);
    const relevantTables = tableNames.filter((t) =>
      /stock|material|equipment|ledger|project/i.test(t)
    );
    console.log('Relevant tables:', relevantTables.join(', '), '\n');

    // 2. Material Project Stock inspection
    if (tableNames.includes('MATERIAL_PROJECT_STOCK') || tableNames.includes('material_project_stocks')) {
      const matStockTable = tableNames.includes('MATERIAL_PROJECT_STOCK') ? 'MATERIAL_PROJECT_STOCK' : 'material_project_stocks';
      const [matRecords] = await sequelize.query(`SELECT * FROM \`${matStockTable}\`;`);
      console.log(`--- Material Stock Records (\`${matStockTable}\` count: ${matRecords.length}) ---`);
      console.table(matRecords);
    } else {
      console.log('MATERIAL_PROJECT_STOCK table not found.');
    }

    // 3. Equipment Project Stock inspection
    if (tableNames.includes('EQUIPMENT_PROJECT_STOCK') || tableNames.includes('equipment_project_stocks')) {
      const eqStockTable = tableNames.includes('EQUIPMENT_PROJECT_STOCK') ? 'EQUIPMENT_PROJECT_STOCK' : 'equipment_project_stocks';
      const [eqRecords] = await sequelize.query(`SELECT * FROM \`${eqStockTable}\`;`);
      console.log(`\n--- Equipment Stock Records (\`${eqStockTable}\` count: ${eqRecords.length}) ---`);
      console.table(eqRecords);
    } else {
      console.log('EQUIPMENT_PROJECT_STOCK table not found.');
    }

    // 4. Stock Ledger inspection
    if (tableNames.includes('STOCK_LEDGER') || tableNames.includes('stock_ledgers')) {
      const ledgerTable = tableNames.includes('STOCK_LEDGER') ? 'STOCK_LEDGER' : 'stock_ledgers';
      const [ledgerRecords] = await sequelize.query(`SELECT * FROM \`${ledgerTable}\`;`);
      console.log(`\n--- Stock Ledger Records (\`${ledgerTable}\` count: ${ledgerRecords.length}) ---`);
      console.table(ledgerRecords);
    } else {
      console.log('STOCK_LEDGER table not found in live MySQL.');
    }

    // 5. Material Master inspection
    if (tableNames.includes('MATERIAL_MASTERS') || tableNames.includes('material_masters')) {
      const mmTable = tableNames.includes('MATERIAL_MASTERS') ? 'MATERIAL_MASTERS' : 'material_masters';
      const [mmRecords] = await sequelize.query(`SELECT id, name, sku, category, unit, cost FROM \`${mmTable}\` LIMIT 20;`);
      console.log(`\n--- Material Master Records (\`${mmTable}\` count: ${mmRecords.length}) ---`);
      console.table(mmRecords);
    }

    // 6. Equipment Master inspection
    if (tableNames.includes('EQUIPMENT_MASTERS') || tableNames.includes('equipment_masters')) {
      const emTable = tableNames.includes('EQUIPMENT_MASTERS') ? 'EQUIPMENT_MASTERS' : 'equipment_masters';
      const [emRecords] = await sequelize.query(`SELECT id, name, sku, category, cost FROM \`${emTable}\` LIMIT 20;`);
      console.log(`\n--- Equipment Master Records (\`${emTable}\` count: ${emRecords.length}) ---`);
      console.table(emRecords);
    }

  } catch (err) {
    console.error('Inspection error:', err.message);
  } finally {
    await sequelize.close();
  }
}

inspectInventory();
