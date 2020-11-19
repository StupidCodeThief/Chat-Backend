const ApplicationError = require("./applicationError");

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
