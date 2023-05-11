const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { UserSchema } = require("../models/User");
const { RolesSchema } = require("../models/Roles");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  isEndpointAllowed,
} = require("../validations/RoleValidations");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const role = await RolesSchema.findOne({ name: "User" });

    const doc = new UserSchema({
      email: req.body.email,
      passwordHash: hash,
      roleId: `${role._id}`,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
        roleId: `${role._id}`,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось зарегестироваться",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }
    const isValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValid) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        roleId: `${user._doc.roleId}`,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неудалось авторизоваться",
    });
  }
};
exports.updateUserRole = async (req, res) => {
  try {
    const user = await UserSchema.findOneAndUpdate(
      { email: req.params._id },
      { roleId: req.body.roleId }
    );
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("roles", currentRole[0].name);

    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }

    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неудалось авторизоваться",
    });
  }
};
