const jwt = require("jsonwebtoken");
const config = require("config");

const {
  UnauthorizedError,
  TokenNotValidError,
} = require("../services/errorHandlers");

const jwtGuard = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded;
    next();
  } catch (error) {
    throw new TokenNotValidError();
  }
};

module.exports = jwtGuard;
