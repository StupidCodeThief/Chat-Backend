const bcrypt = require("bcryptjs");
const config = require("config");

const { authService } = require("../services");

const {
  validateLoginData,
  validateRegisterData,
  validateTokenData,
} = require("../validation/auth");

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validateLoginData(email, password);

  if (Object.keys(errors).length > 0) {
    return res.json(errors);
  }

  const response = await authService.login(req.body);
  res.status(201).send(response);
};

const register = async (req, res) => {
  const { email, password, username } = req.body;

  const errors = validateRegisterData(username, email, password);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const response = await authService.register(req.body);
  res.status(201).send(response);
};

const getUser = async (req, res) => {
  try {
    const response = await authService.getUser(req.user);
    res.status(201).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { login, register, getUser };
