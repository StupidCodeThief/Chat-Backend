const NotFoundError = require("./notFounError");
const ApplicationError = require("./applicationError");
const UserAlreadyExists = require("./userAlreadyExistsError");
const WrongPasswordError = require("./wrongPasswordError");

module.exports = {
  ApplicationError,
  NotFoundError,
  UserAlreadyExists,
  WrongPasswordError,
};
