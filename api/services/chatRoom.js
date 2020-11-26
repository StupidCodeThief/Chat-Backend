const jwt = require("jsonwebtoken");

const errors = require("./errorHandlers/index");
const { Messages } = require("../../database/models/Messages");
const { jwtHelper, hashHelper } = require("../helpers");

const getMessages = async (roomId) => {
  try {
    const prevMessages = await Messages.findAll({ where: { room: roomId } });

    return prevMessages;
  } catch (error) {
    return error;
  }
};

module.exports = { getMessages };
