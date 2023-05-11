const { RolesSchema } = require("../models/Roles");
const {
  verifyToken,
  isEndpointAllowed,
} = require("../validations/RoleValidations");
const mongoose = require("mongoose");

exports.manageRoles = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = isEndpointAllowed("roles", currentRole[0].name);
    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }

    const entity = await RolesSchema.findById(`${req.params._id}`);
    const allowedEndpoints = entity.allowedEndpoints;
    const index = allowedEndpoints.indexOf(req.body.id);

    if (index > -1) {
      allowedEndpoints.splice(index, 1);
    } else {
      allowedEndpoints.push(new mongoose.Types.ObjectId(req.body.id));
    }

    const updated = await RolesSchema.findByIdAndUpdate(`${req.params._id}`, {
      allowedEndpoints,
    });

    res.json(updated);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

exports.createRole = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("roles", currentRole[0].name);
    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }
    const doc = new RolesSchema({
      name: req.body.name,
      allowedEndpoints: req.body.allowedEndpoints,
    });

    const role = await doc.save();

    res.json(role);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось создать роль",
    });
  }
};
exports.deleteRole = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("roles", currentRole[0].name);
    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }
    const deleted = await RolesSchema.deleteOne(req.params);
    res.json({
      id: deleted._id,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неудалось авторизоваться",
    });
  }
};
exports.getAllRoles = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("roles", currentRole[0].name);
    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }
    const roles = await RolesSchema.find();
    res.json(roles);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неудалось авторизоваться",
    });
  }
};
