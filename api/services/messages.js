const { PrivateMessages } = require("../../database/models/PrivateMessages");

const sendMessage = async (message) => {
  try {
    const newMessage = await PrivateMessages.create(message);
    return newMessage;
  } catch (error) {
    console.error(error);
  }
};

const getMessages = async (userID) => {
  try {
    const recievedMessages = await PrivateMessages.findAll({
      where: { recipient_id: userID },
    });
    // const sendedMEssages = await PrivateMessages.findAll({
    //   where: { sender_id: userID },
    // });

    const messages = recievedMessages;

    messages.sort((a, b) => {
      if (a.dataValues.date < b.dataValues.date) return 1;
      if (a.dataValues.date === b.dataValues.date) return 0;
      if (a.dataValues.date > b.dataValues.date) return -1;
    });

    return messages;
  } catch (error) {
    console.error(error);
  }
};

const getCorrespondence = async ({ sender_id, recipient_id }) => {
  try {
    const recievedMessages = await PrivateMessages.findAll({
      where: { recipient_id: sender_id, sender_id: recipient_id },
    });
    const sendedMEssages = await PrivateMessages.findAll({
      where: { recipient_id: recipient_id, sender_id: sender_id },
    });
    const messages = [...recievedMessages, ...sendedMEssages];

    messages.sort((a, b) => {
      if (a.dataValues.date > b.dataValues.date) return 1;
      if (a.dataValues.date === b.dataValues.date) return 0;
      if (a.dataValues.date < b.dataValues.date) return -1;
    });

    return messages;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getCorrespondence,
};
