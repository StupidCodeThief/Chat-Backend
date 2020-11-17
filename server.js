const express = require("express");
const useSocket = require("socket.io");

const app = express();
const server = require("http").Server(app);
const io = useSocket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

server.listen(5000, () => {
    console.log("Server runnig at: http://localhost:5000");
  });