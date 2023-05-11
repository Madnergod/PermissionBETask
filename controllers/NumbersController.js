const { NumbersSchema } = require("../models/Numbers");
const {
  verifyToken,
  isEndpointAllowed,
} = require("../validations/RoleValidations");
const { RolesSchema } = require("../models/Roles");

exports.getAllNumbers = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("numbers", currentRole[0].name);

    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }
    const letters = await NumbersSchema.find();

    res.json(letters);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить цифры",
    });
  }
};
