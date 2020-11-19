const ApplicationError = require("./applicationError");

class WrongPasswordError extends ApplicationError {
  constructor() {
    super('Wrong password', 404);
  }
}

module.exports = WrongPasswordError;