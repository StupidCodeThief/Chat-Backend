const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Messages = sequelize.define(
  "messages",
  {
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Messages };
