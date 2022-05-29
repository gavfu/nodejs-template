require('mysql2');
const {Sequelize} = require('sequelize');

import {configs} from '../config';

const sequelize = new Sequelize(
  configs.db.database,
  configs.db.user,
  configs.db.password,
  {
    host: configs.db.host,
    port: configs.db.port,
    dialect: 'mysql',
    logging: false,
    // logging: console.log,
    operatorsAliases: false,
    // Note: As a best practice, we should make sure UTC time is used across OS server, mysql server and DB connection sessions.
    timezone: '+00:00',

    dialectOptions: {
      connectTimeout: 60000,
    },

    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },

    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
      ],
      max: 5,
    },

    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

export default sequelize;
