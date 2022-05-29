import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

import {logger} from './logging/logger';

// put initializations here
export default function init() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('UTC');

  logger.info(`----- process ${process.pid} starts -----`);
  process.on('uncaughtException', err => {
    logger.error(`uncaught exception! ${err.message}\r\n${err.stack}`);
    // TODO: send notification
  });

  process.on('exit', () => {
    logger.info(`----- process ${process.pid} exits -----`);
  });
}
