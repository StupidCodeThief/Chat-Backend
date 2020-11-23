const Joi = require("@hapi/joi");

const usernameSchema = Joi.string().required().min(3).max(15);

const tokenSchema = Joi.string().required();

const emailSchema = Joi.string().required().email();

const passwordSchema = Joi.string()
  .required()
  .min(6)
  .max(20)
  .regex(/(?=.*[0-9])/);

const validateLoginData = (email, password) => {
  const errors = {};

  const emailValidate = emailSchema.validate(email);
  const passwordValidate = passwordSchema.validate(password);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace(
      `"value"`,
      "Email"
    );
  }

  if (passwordValidate.error) {
    if (passwordValidate.error.details[0].context.regex) {
      errors.password = "Password must include at least one didgit";
    } else {
      errors.password = passwordValidate.error.details[0].message.replace(
        `"value"`,
        "Password"
      );
    }
  }

  return errors;
};

const validateRegisterData = (username, email, password) => {
  const errors = {};

  const usernameValidate = usernameSchema.validate(username);
  const emailValidate = emailSchema.validate(email);
  const passwordValidate = passwordSchema.validate(password);

  if (usernameValidate.error) {
    errors.userName = usernameValidate.error.details[0].message.replace(
      `"value"`,
      "Username"
    );
  }

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace(
      `"value"`,
      "Email"
    );
  }

  if (passwordValidate.error) {
    if (passwordValidate.error.details[0].context.regex) {
      errors.password = "Password must include at least one didgit";
    } else {
      errors.password = passwordValidate.error.details[0].message.replace(
        `"value"`,
        "Password"
      );
    }
  }

  return errors;
};

const validateTokenData = (token) => {
  const errors = {};

  const tokenValidate = tokenSchema.validate(token);

  if (tokenValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace(
      `"value"`,
      "Token"
    );
  }

  return errors;
};

module.exports = { validateLoginData, validateRegisterData, validateTokenData };
