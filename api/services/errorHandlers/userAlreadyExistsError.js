const ApplicationError = require("./applicationError");

class UserAlreadyExists extends ApplicationError {
  constructor(message) {
    super(message || 'User already exists.', 404);
  }
}

module.exports = UserAlreadyExists;
