const { roomService } = require("../services");

const connectToRoom = async (req, res) => {
  try {
    const response = await roomService.connectRoom(
      ({ roomId, password, email } = req.body)
    );
    res.status(201).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { connectToRoom };
