const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
    unique: true,
  },
});

exports.LetterSchema = mongoose.model("Letter", LetterSchema);
