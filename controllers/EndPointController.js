const { EndPointSchema } = require("../models/Endpoints");
const {
  verifyToken,
  isEndpointAllowed,
} = require("../validations/RoleValidations");
const { RolesSchema } = require("../models/Roles");

exports.getAllEndpoint = async (req, res) => {
  try {
    const token = verifyToken(req.headers.authorization);
    const currentRole = await RolesSchema.find({ _id: token.roleId });
    const allowed = await isEndpointAllowed("letters", currentRole[0].name);
    if (!allowed) {
      res.status(403).json({
        message: "Отказано в доступе",
      });
      return;
    }
    const endpoints = await EndPointSchema.find();

    res.json(endpoints);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить эндпоинты",
    });
  }
};
