const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", userSchema);
