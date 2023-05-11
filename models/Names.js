const mongoose = require("mongoose");

const NamesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.NamesSchema = mongoose.model("Names", NamesSchema);
