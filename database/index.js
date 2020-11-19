const { Sequelize } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
  config.get("dbName"),
  config.get("usernameDb"),
  config.get("passwordDb"),
  {
    host: config.get("hostDb"),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
