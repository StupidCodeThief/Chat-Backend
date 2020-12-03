const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

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

const getUser = async ({ id, email }) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "email", "username"],
    });

    if (!user) {
      return new errors.NotFoundError("User not found");
    }

    return user;
  } catch (error) {
    return error;
  }
};

const getUsers = async (user) => {
  try {
    const users = await User.findAll({
      where: { id: { [Op.ne]: user.id } },
      attributes: ["id", "email", "username"],
    });

    if (!users) {
      return new errors.NotFoundError("Users not found");
    }

    return users;
  } catch (error) {
    return error;
  }
};

module.exports = { register, login, getUser, getUsers };
