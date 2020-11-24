const express = require("express");

const router = express.Router();

const { connectToRoom } = require("../controllers/chatRoom");
const jwtGuard = require("../middlewares/jwtGuard");

router.post("/room", connectToRoom);

module.exports = router;
