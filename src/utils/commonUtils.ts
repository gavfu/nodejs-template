import BigNumber from 'bignumber.js';
import dayjs = require('dayjs');
import {Logger} from 'winston';

export const getEnv = (value: string, defaultValue: any): any => {
  return process.env[value] || defaultValue;
};

export async function retry(
  promise: Promise<any>,
  retryTimes = 3,
  defaultResult?: any,
  logger?: Logger,
  errMsgPrefix?: string
): Promise<any> {
  let times = 0;
  while (times <= retryTimes) {
    try {
      const result = await promise;
      return result;
    } catch (e) {
      logger.error(
        `${errMsgPrefix ? errMsgPrefix : ''} retryTimes: ${times} err: ${
          e.message
        } `
      );
    }
    times++;
  }
  return defaultResult;
}

export function dayNumByTimespan(timespan: string): number {
  switch (timespan) {
    case 'week':
      return 7;
    case 'month':
      return 30;
    case 'quarter':
      return 30 * 3;
    default:
      return 7;
  }
}

export function dateForTimespan(timespan: string): string {
  const format = 'YYYY-MM-DD';
  switch (timespan) {
    case 'week':
      return dayjs().subtract(1, 'week').format(format);
    case 'month':
      return dayjs().subtract(1, 'month').format(format);
    case 'quarter':
      return dayjs().subtract(3, 'month').format(format);
    case 'year':
      return dayjs().subtract(1, 'year').format(format);
    default:
      return dayjs().subtract(1, 'week').format(format);
  }
}

export function numberFormat(number: any): number {
  return new BigNumber(number).toNumber();
}
