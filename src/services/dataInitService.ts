import _ = require('lodash');
import {configs} from '../config';
import {createChildLogger} from '../logging/logger';

const Postgrator = require('postgrator');
const path = require('path');

const logger = createChildLogger({
  moduleId: 'dataMigration',
  fileName: 'dataMigration',
});

export async function dataInit() {
  await dbMigration();
}

function dbMigration() {
  const postgrator = new Postgrator({
    migrationDirectory: path.join(__dirname, configs.evolution.location),
    schemaTable: configs.evolution.schemaTable,
    driver: 'mysql2',
    host: configs.db.host,
    port: configs.db.port,
    database: configs.db.database,
    username: configs.db.user,
    password: configs.db.password,
  });

  postgrator.on('validation-started', (migration: any) => {
    logger.info(`validation-started.\n${JSON.stringify(migration)}`);
  });
  postgrator.on('validation-finished', (migration: any) => {
    logger.info(`validation-finished.\n${JSON.stringify(migration)}`);
  });
  postgrator.on('migration-started', (migration: any) => {
    logger.info(`migration-started.\n${JSON.stringify(migration)}`);
  });
  postgrator.on('migration-finished', (migration: any) => {
    logger.info(`migration-finished.\n${JSON.stringify(migration)}`);
  });

  return postgrator.migrate('max');
}
