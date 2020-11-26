const { roomService } = require("../services");

const getMessages = async (req, res) => {
  try {
    const response = await roomService.getMessages(req.params.id);
    res.status(201).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { getMessages };
