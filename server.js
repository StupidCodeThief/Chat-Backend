require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./database");

const auth = require("./api/routes/auth");

const app = express();
const server = require("http").Server(app);
module.exports = { server };
const socketConnect = require("./api/controllers/chatRoom");

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
