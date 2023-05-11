const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  roleId: {
    type: ObjectId,
  },
});

exports.UserSchema = mongoose.model("User", UserSchema);
