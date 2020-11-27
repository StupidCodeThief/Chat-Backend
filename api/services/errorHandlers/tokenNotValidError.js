const ApplicationError = require("./applicationError");

class TokenNotValid extends ApplicationError {
  constructor() {
    super("Token not valid", 403);
  }
}

module.exports = TokenNotValid;