const NotFoundError = require("./notFounError");
const ApplicationError = require("./applicationError");
const UserAlreadyExists = require("./userAlreadyExistsError");
const WrongPasswordError = require("./wrongPasswordError");
const TokenNotValid = require("./tokenNotValidError");
const UnauthorizedError = require("./unauthorizedError");

module.exports = {
  ApplicationError,
  NotFoundError,
  UserAlreadyExists,
  WrongPasswordError,
  TokenNotValid,
  UnauthorizedError,
};
