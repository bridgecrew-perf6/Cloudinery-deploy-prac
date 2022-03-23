const mongoose = require("mongoose");

const studentTest = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  imageAvatar: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const studentModel = mongoose.model("testStudent", studentTest);
module.exports = studentModel;
