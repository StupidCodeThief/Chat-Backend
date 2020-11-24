const jwt = require("jsonwebtoken");

const errors = require("./errorHandlers/index");
const { User } = require("../../database/models/User");
const { jwtHelper, hashHelper } = require("../helpers");

const connectRoom = async ({ roomId, password, email }) => {
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

module.exports = { connectRoom };
