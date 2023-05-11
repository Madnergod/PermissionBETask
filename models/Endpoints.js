const mongoose = require("mongoose");

const EndPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

exports.EndPointSchema = mongoose.model("Endpoint", EndPointSchema);
