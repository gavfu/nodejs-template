import * as _ from 'lodash';
import {DataTypes, Sequelize} from 'sequelize';
import sequelize from '../database/sequelize';

export const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);
