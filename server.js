const express = require("express");
const cors = require("cors");
const useSocket = require("socket.io");

const sequelize = require("./database");

const auth = require("./api/routes/auth");
const chatRoom = require("./api/controllers/chatRoom");
const { openConnection } = require("./api/controllers/chatRoom");

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

io.on("connection", (socket) => {
  // openConnection(socket)
  console.log(`User connected ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);

    socket.send({user: "Server", text: data});
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connected");
  });

  console.log(`Server runnig at: ${PORT}`);
});
