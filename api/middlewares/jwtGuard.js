const jwt = require("jsonwebtoken");
const config = require("config");

const {
  UnauthorizedError,
  TokenNotValid,
} = require("../services/errorHandlers");

const jwtGuard = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded;
    next();
  } catch (error) {
    throw new TokenNotValid();
  }
};

module.exports = jwtGuard;
