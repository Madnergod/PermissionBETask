const mongoose = require("mongoose");

const NumbersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.NumbersSchema = mongoose.model("Numbers", NumbersSchema);
