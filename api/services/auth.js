const jwt = require("jsonwebtoken");

const errors = require("./errorHandlers/index");
const { User } = require("../../database/models/User");
const { jwtHelper, hashHelper } = require("../helpers");

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return new errors.NotFoundError("User not found");
  }

  if (!hashHelper.validPassword(password, user.password)) {
    return new errors.WrongPasswordError();
  }

  const dataForToken = {
    id: user.id,
    email: user.email,
  };

  return jwtHelper.generateToken(dataForToken);
};

const register = async ({ username, email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return new errors.UserAlreadyExists();
  }

  let createdUser;

  try {
    const hashedPassword = await hashHelper.createHash(password);

    const newUser = {
      email,
      password: hashedPassword,
      username,
    };

    createdUser = await User.create(newUser);

    const userId = createdUser.id;

    return jwtHelper.generateToken({ userId, email });
  } catch (error) {
    return error;
  }
};

module.exports = { register, login };
