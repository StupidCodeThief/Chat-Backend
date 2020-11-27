const express = require("express");

const router = express.Router();

const { login, register, getUser } = require("../controllers/auth");
const jwtGuard = require("../middlewares/jwtGuard");

router.post("/login", login);
router.post("/register", register);

router.get("/user", jwtGuard, getUser);

module.exports = router;
