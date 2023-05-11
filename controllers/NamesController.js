const { NamesSchema } = require("../models/Names");
const {
  verifyToken,
  isEndpointAllowed,
} = require("../validations/RoleValidations");
const { RolesSchema } = require("../models/Roles");

exports.getAllNames = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("names", currentRole[0].name);
    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }
    const letters = await NamesSchema.find();

    res.json(letters);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить имена",
    });
  }
};
