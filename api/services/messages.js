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
    const sendedMEssages = await PrivateMessages.findAll({
      where: { sender_id: userID },
    });

    return [...recievedMessages, ...sendedMEssages];
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

    return [...recievedMessages, ...sendedMEssages];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getCorrespondence,
};
