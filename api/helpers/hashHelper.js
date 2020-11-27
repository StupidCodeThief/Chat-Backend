const bcrypt = require("bcryptjs");

const createHash = (pass) => {
  return bcrypt.genSalt(10).then((salt) => bcrypt.hash(pass, salt));
};

const validPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  createHash,
  validPassword,
};
