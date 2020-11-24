const ApplicationError = require("./applicationError");

class UnauthorizedError extends ApplicationError {
  constructor() {
    super("Unauthorized", 401);
  }
}

module.exports = UnauthorizedError;
