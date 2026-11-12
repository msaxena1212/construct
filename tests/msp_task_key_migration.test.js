'use strict';
/**
 * Migration 20261104000001: PROJECT_TASK.msp_uid and its index.
 * Up adds the nullable column and the (milestone_id, msp_uid) index. Down drops the index and rebuilds PROJECT_TASK
 * without the column. A child table with ON DELETE CASCADE must keep its rows through the rebuild: a plain table drop
 * would cascade into it. Runs on an in-memory SQLite database with a small fixture, not the full baseline.
 */
const { Sequelize, DataTypes } = require('sequelize');
const migration = require('../migrations/20261104000001-add-project-task-msp-uid');

const INDEX = 'idx_project_task_milestone_msp_uid';

describe('PROJECT_TASK.msp_uid migration', () => {
  let seq;

  beforeAll(async () => {
    seq = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
    const qi = seq.getQueryInterface();
    await qi.createTable('PROJECT_MILESTONE', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    });
    await qi.createTable('PROJECT_TASK', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      milestone_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'PROJECT_MILESTONE', key: 'id' },
        onDelete: 'SET NULL',
      },
      title: { type: DataTypes.STRING, allowNull: false },
    });
    await qi.createTable('TASK_CHILD', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'PROJECT_TASK', key: 'id' },
        onDelete: 'CASCADE',
      },
      note: { type: DataTypes.STRING, allowNull: false },
    });
    await seq.query("INSERT INTO PROJECT_MILESTONE (name) VALUES ('MS Project: Test')");
    await seq.query("INSERT INTO PROJECT_TASK (project_id, milestone_id, title) VALUES (1, 1, 'Pour slab')");
    await seq.query("INSERT INTO TASK_CHILD (task_id, note) VALUES (1, 'site note')");
  });

  afterAll(async () => {
    await seq.close();
  });

  const columns = async () =>
    (await seq.query("PRAGMA table_info('PROJECT_TASK')", { type: seq.QueryTypes.SELECT })).map((c) => c.name);
  const indexes = async () =>
    (await seq.query("PRAGMA index_list('PROJECT_TASK')", { type: seq.QueryTypes.SELECT })).map((i) => i.name);

  test('up adds the column and index; down removes both and keeps every task and child row', async () => {
    const qi = seq.getQueryInterface();

    // Called without a transaction: the migration runner supplies one in production, and an in-memory SQLite database
    // gives a separate connection, and so a separate database, to each transaction.
    await migration.up(qi, Sequelize, undefined);
    expect(await columns()).toContain('msp_uid');
    expect(await indexes()).toContain(INDEX);
    await seq.query('UPDATE PROJECT_TASK SET msp_uid = 7 WHERE id = 1');
    const [withKey] = await seq.query('SELECT msp_uid FROM PROJECT_TASK WHERE id = 1');
    expect(withKey).toEqual([{ msp_uid: 7 }]);

    await migration.down(qi, Sequelize, undefined);
    expect(await columns()).not.toContain('msp_uid');
    expect(await indexes()).not.toContain(INDEX);
    const [tasks] = await seq.query('SELECT id, milestone_id, title FROM PROJECT_TASK');
    expect(tasks).toEqual([{ id: 1, milestone_id: 1, title: 'Pour slab' }]);
    const [children] = await seq.query('SELECT task_id, note FROM TASK_CHILD');
    expect(children).toEqual([{ task_id: 1, note: 'site note' }]);
  });
});
