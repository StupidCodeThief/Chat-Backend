const express = require("express");

const router = express.Router();

const { getMessages } = require("../controllers/chatRoom");
const jwtGuard = require("../middlewares/jwtGuard");

router.get("/room/:id", getMessages);

module.exports = router;
