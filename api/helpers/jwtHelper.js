const jwt = require("jsonwebtoken");
const config = require("config");

const generateToken = ({ id, email }) => {
  const token = jwt.sign({ id, email }, config.get("jwtSecret"), {
    expiresIn: config.get("jwtExpiresIn"),
  });
  return { token };
};

module.exports = {
  generateToken,
};
