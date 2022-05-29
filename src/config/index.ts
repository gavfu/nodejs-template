import * as _ from 'lodash';
import {getEnv} from '../utils/commonUtils';

export const configs = {
  isDev: getEnv('NODE_ENV', 'development') === 'development',
  db: {
    host: getEnv('MYSQL_HOST', 'localhost'),
    port: _.parseInt(getEnv('MYSQL_PORT', 3306)),
    database: getEnv('MYSQL_DATABASE', 'test'),
    user: getEnv('MYSQL_USER', 'root'),
    password: getEnv('MYSQL_PASSWORD', 'root'),
  },
  evolution: {
    schemaTable: 'data_migrations',
    location: '../migrations',
  },
  server: {
    port: getEnv('API_SERVICE_PORT', 3000),
  },
  dingtalk: {
    notificationUrl: getEnv('DINGTALK_NOTIFICATION_URL', ''),
    notificationSecret: getEnv('DINGTALK_NOTIFICATION_SECRET', ''),
    criticalNotificationUrl: getEnv('DINGTALK_CRITICAL_NOTIFICATION_URL', ''),
    criticalNotificationSecret: getEnv(
      'DINGTALK_CRITICAL_NOTIFICATION_SECRET',
      ''
    ),
  },
  email_config: {
    host: getEnv('EMAIL_HOST', 'smtp.office365.com'),
    port: getEnv('EMAIL_PORT', 587),
    user: getEnv('EMAIL_USER', ''),
    pass: getEnv('EMAIL_PASS', ''),
    mailFrom: getEnv('EMAIL_FROM', ''),
  },
};
