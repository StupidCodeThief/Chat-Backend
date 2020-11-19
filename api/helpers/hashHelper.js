const bcrypt = require("bcryptjs");

const createHash = (pass) => {
  return bcrypt.genSalt(10).then((salt) => bcrypt.hash(pass, salt));
};

const validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  createHash,
  validPassword,
};
