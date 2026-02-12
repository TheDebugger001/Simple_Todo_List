const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, optional: true },
  createdAt: { type: Date },
});
