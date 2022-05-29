import {validationResult} from 'express-validator';
import {Request, Response} from 'express';
import {CommonResponse, ResponseCode} from '../utils/apiUtils';

import * as _ from 'lodash';

export function validate(validations: any[]) {
  return async (req: Request, res: Response, next: any) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const reason = _.head(errors.array());
    res
      .status(ResponseCode.BadRequest)
      .json(CommonResponse.badRequest(`${reason.msg}`));
  };
}
