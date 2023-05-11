const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  allowedEndpoints: {
    type: Array,
    required: true,
  },
});

exports.RolesSchema = mongoose.model("Roles", RolesSchema);
