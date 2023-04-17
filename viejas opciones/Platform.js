const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Platform",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
