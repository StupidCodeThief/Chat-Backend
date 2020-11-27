const jwt = require("jsonwebtoken");

const generateToken = ({ id, email }) => {
  const token = jwt.sign({ id, email }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRESIN,
  });
  return { token };
};

module.exports = {
  generateToken,
};
