import * as express from 'express';
import {CommonResponse} from '../utils/apiUtils';
import BigNumber from 'bignumber.js';
import _ = require('lodash');
import {Users} from '../dao/usersDao';

const router = express.Router();

router.post('/insert', async (req, res) => {
  const email = req.body.email;
  const emailInfoData = await Users.findOne({
    where: {
      email,
    },
  });
  if (!_.isEmpty(emailInfoData)) {
    return res
      .status(400)
      .json(CommonResponse.badRequest('User email alreay exists'));
  }
  const result = await Users.create(req.body);
  res.json(CommonResponse.success(result.id));
});

router.post('/update/:id', async (req, res) => {
  const id = new BigNumber(req.params.id).toNumber();
  if (!id) {
    return res.status(400).json(CommonResponse.badRequest('id cannot be null'));
  }
  await Users.update(req.body, {
    where: {
      id,
    },
  });
  res.json(CommonResponse.success());
});

router.post('/delete/:id', async (req, res) => {
  const id = new BigNumber(req.params.id).toNumber();
  if (!id) {
    return res.status(400).json(CommonResponse.badRequest('id cannot be null'));
  }
  await Users.destroy({
    where: {
      id,
    },
  });
  res.json(CommonResponse.success());
});

export default router;
