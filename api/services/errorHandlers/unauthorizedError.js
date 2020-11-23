const ApplicationError = require("./applicationError");

class UnauthorizedError extends ApplicationError {
  constructor() {
    super("Unauthorized", 404);
  }
}

module.exports = UnauthorizedError;
