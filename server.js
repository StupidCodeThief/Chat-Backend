const express = require("express");
const cors = require("cors");
const useSocket = require("socket.io");

const sequelize = require("./database");
const { Room } = require("./database/models/Room");
const { User } = require("./database/models/User");
const { UsersInRooms } = require("./database/models/UsersInRooms");
const { Messages } = require("./database/models/Messages");

const auth = require("./api/routes/auth");
const chatRoom = require("./api/routes/chatRoom");

const app = express();
const server = require("http").Server(app);
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

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/auth", auth);
app.use("/api", chatRoom);

io.on("connection", (socket) => {
  // openConnection(socket)

  console.log(`User connected ${socket.id}`);

  socket.on("JOIN:ROOM", async (data) => {
    const user_id = data.user.id;
    let room_id;
    try {
      const name = data.roomId;
      const password = data.password;

      let room = await Room.findOne({ where: { name } });

      if (!room) {
        room = await Room.create({ name, password });
      }

      room_id = room.dataValues.room_id;
      const user_id = data.user.id;

      const isOnline = await UsersInRooms.findOne({
        where: {
          room_id: room.dataValues.room_id,
          user_id: data.user.id,
        },
      });
      if (!isOnline) {
        await UsersInRooms.create({ room_id, user_id });
      }
    } catch (error) {
      console.log(data);
      console.error(error);
    }

    socket.join(room_id);

    socket.on("UPDATE:MSG", async () => {
      console.log("here")
      const prevMessages = await Messages.findAll({ where: { room: room_id } });
      const msg = prevMessages.map((message) => {
        return message.dataValues;
      });
      socket.emit("SET:MSG", msg);
      console.log(msg);
    });

    socket.to(room_id).send({ user: user_id, text: "Now in chat" });

    socket.on("message", async (data) => {
      const message = { user: user_id, room: room_id, message: data };
      try {
        const isOnline = await UsersInRooms.findOne({
          where: {
            room_id,
            user_id,
          },
        });

        if (isOnline) {
          await Messages.create(message);
          socket.to(room_id).broadcast.send({ user: user_id, text: data });
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("EXIT:ROOM", async () => {
      await UsersInRooms.destroy({ where: { user_id, room_id } });
      socket.leave(room_id);
      console.log("Exit from ", room_id);
      socket.to(room_id).send({ user: user_id, text: "Leave chat" });
    });

    socket.on("disconnect", async () => {
      socket.leave(room_id);
      socket.to(room_id).send({ user: user_id, text: "Leave chat" });
      await UsersInRooms.destroy({ where: { user_id, room_id } });
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connected");
  });

  console.log(`Server runnig at: ${PORT}`);
});
