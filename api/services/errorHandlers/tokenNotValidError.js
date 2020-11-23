const ApplicationError = require("./applicationError");

class TokenNotValid extends ApplicationError {
  constructor() {
    super("Token not valid", 404);
  }
}

module.exports = TokenNotValid;