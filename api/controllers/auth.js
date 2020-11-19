const bcrypt = require("bcryptjs");
const config = require("config");

const { authService } = require("../services");

const {
  validateLoginData,
  validateRegisterData,
} = require("../validation/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLoginData(email, password);

    if (Object.keys(errors).length > 0) {
      return res.json(errors);
    }

    const response = await authService.login(req.body);
    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const errors = validateRegisterData(username, email, password);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const response = await authService.register(req.body);
    res.status(201).send(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { login, register };
