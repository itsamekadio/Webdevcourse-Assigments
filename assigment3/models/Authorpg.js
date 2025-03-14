const { DataTypes } = require('sequelize');
const pg = require('../connections/postgres');
const Authorpg = pg.define(
  'authors',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { timestamps: false },
  

);
module.exports = Authorpg;
