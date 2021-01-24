"use strict";
module.exports = (sequelize, DataTypes) => {
  var stocks = sequelize.define(
    "stocks",
    {
      id: {
        type: DataTypes.UUID,
        // primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      symbol: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      open: { type: DataTypes.STRING },
      high: { type: DataTypes.STRING },
      low: { type: DataTypes.STRING },
      close: { type: DataTypes.STRING },
      volume: { type: DataTypes.STRING },
      date: { type: DataTypes.STRING }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return stocks;
};