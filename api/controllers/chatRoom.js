const openConnection = (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);

    socket.send(`Got message: ${data}`);
  });
};

module.exports = { openConnection };
