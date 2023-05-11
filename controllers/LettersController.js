const { LetterSchema } = require("../models/Letters");
const {
  verifyToken,
  isEndpointAllowed,
} = require("../validations/RoleValidations");
const { RolesSchema } = require("../models/Roles");

exports.getAllLetters = async (req, res) => {
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
    const letters = await LetterSchema.find();

    res.json(letters);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить буквы",
    });
  }
};
