require('dotenv').config();

import {Request, Response} from 'express';
import {Logger} from 'winston';
import {configs} from './config';

import init from './init';
import {dataInit} from './services/dataInitService';
import {createChildLogger, logger} from './logging/logger';
import users from './routes/users';
import {CommonResponse} from './utils/apiUtils';
const schedule = require('node-schedule');

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {sendMarkdown} from './utils/dingtalk';
init();

async function initApiService() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/ping', (req: Request, res: Response) => {
    res.json(CommonResponse.success());
  });

  app.use('/api/users', users);

  const portal = configs.server.port;
  app.listen(portal, () => {
    logger.info(`API service started and listensing on port ${portal}`);
  });
}

async function main() {
  logger.info('NodeJS template backend starts');
  await dataInit();
  await initApiService();

  schedule
    .scheduleJob('0 0 2 * * *', async () => {
      // TODO: do the real job
      const jobLogger = createChildLogger({
        moduleId: 'sampleJob',
        fileName: 'sampleJob',
      });
      jobLogger.info('Sample scheduled job starts');
      sendMarkdown('Scheduled job starts', 'This is a sample scheduled job');
      jobLogger.info('Sent dingtalk information');
    })
    .invoke();
}

main();
