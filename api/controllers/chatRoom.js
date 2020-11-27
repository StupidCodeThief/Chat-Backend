const useSocket = require("socket.io");

const { roomService } = require("../services");
const { server } = require("../../server");

const io = useSocket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Origin",
      "Accept",
      "X-Requested-With",
      "Content-Type",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    credentials: true,
  },
});

const socketConnect = io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("JOIN:ROOM", async (data) => {
    const user_id = data.user.id;
    const username = data.user.username;
    let room_id;
    let prevMessages;
    try {
      const room = await roomService.joinRoom(data);
      room_id = room.dataValues.room_id;

      prevMessages = await roomService.getMessages(room_id);
    } catch (error) {
      console.error(error);
    }

    socket.emit("PREW:MSG", prevMessages);

    socket.join(room_id);

    socket.to(room_id).send({ username, text: "Now in chat" });

    socket.on("message", async (data) => {
      const message = {
        user: user_id,
        room: room_id,
        text: data,
        username: username,
        date: new Date(),
      };
      
      try {
        const newMessage = await roomService.saveMessage(message);
        console.log(newMessage.dataValues.date);
        if (newMessage) {
          socket
            .to(room_id)
            .broadcast.send({ user: user_id, text: data, username: username });
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("EXIT:ROOM", async () => {
      console.log(username, " exit");
      await roomService.disconnectUser(user_id, room_id);
      socket.leave(room_id);
      console.log("Exit from ", room_id);
      socket.to(room_id).send({ username, text: "Leave chat" });
    });

    socket.on("disconnect", async () => {
      console.log(username, " exit");
      await roomService.disconnectUser(user_id, room_id);
      socket.leave(room_id);
      socket.to(room_id).send({ user: user_id, text: "Leave chat" });
    });
  });
});

module.exports = socketConnect;
