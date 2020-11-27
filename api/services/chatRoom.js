const { Room } = require("../../database/models/Room");
// const { User } = require("../../database/models/User");
const { UsersInRooms } = require("../../database/models/UsersInRooms");
const { Messages } = require("../../database/models/Messages");

const joinRoom = async ({ roomId, password, user }) => {
  try {
    let room = await Room.findOne({ where: { name: roomId, password } });

    if (!room) {
      room = await Room.create({ name, password });
    }

    room_id = room.dataValues.room_id;

    const isOnline = await UsersInRooms.findOne({
      where: {
        room_id: room.dataValues.room_id,
        user_id: user.id,
      },
    });

    if (!isOnline) {
      console.log(user.username, " online");
      await UsersInRooms.create({ room_id, user_id: user.id });
    }

    return room;
  } catch (error) {
    return error;
  }
};

const getMessages = async (room_id) => {
  try {
    const messages = await Messages.findAll({
      where: { room: room_id },
    });

    return messages;
  } catch (error) {
    return error;
  }
};

const saveMessage = async (message) => {
  try {
    const isOnline = await UsersInRooms.findOne({
      where: {
        room_id: message.room,
        user_id: message.user,
      },
    });

    if (isOnline) {
      const newMessage = await Messages.create(message);
      return newMessage;
    }

    return false;
  } catch (error) {
    return error;
  }
};

const disconnectUser = async (user_id, room_id) => {
  try {
    await UsersInRooms.destroy({ where: { user_id, room_id } });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { joinRoom, getMessages, saveMessage, disconnectUser };
