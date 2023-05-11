const jwt = require("jsonwebtoken");
const { RolesSchema } = require("../models/Roles");
exports.verifyToken = (token) => {
  const resultToken = token.split(" ");
  return jwt.verify(`${resultToken[1]}`, "secret123");
};

exports.isEndpointAllowed = async (moduleName, roleName) => {
  const roleAggregate = await RolesSchema.aggregate([
    {
      $lookup: {
        from: "endpoints",
        localField: "allowedEndpoints",
        foreignField: "_id",
        as: "allowedEndpointFull",
      },
    },
  ]);

  const filtered = roleAggregate.filter((item) => {
    return item.name === roleName;
  });
  const allowed = filtered[0].allowedEndpointFull.filter((allowedEndpoint) => {
    return allowedEndpoint.name === moduleName;
  });
  return !!allowed.length;
};
