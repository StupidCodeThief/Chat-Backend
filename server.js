const express = require("express");
const useSocket = require("socket.io");
const cors = require("cors");

const sequelize = require("./database");

const auth = require("./api/routes/auth");

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connected");
  });

  console.log(`Server runnig at: ${PORT}`);
});
