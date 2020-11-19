const ApplicationError = require("./applicationError");

class WrongPasswordError extends ApplicationError {
  constructor() {
    super('Wrong password', 400);
  }
}

module.exports = WrongPasswordError;