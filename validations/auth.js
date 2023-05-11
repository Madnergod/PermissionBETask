const { body } = require("express-validator");

const registerValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
];

exports.registerValidator = registerValidator;
