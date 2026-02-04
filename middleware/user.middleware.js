const express = express();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const User = required("../models/users.models.js");
const { body, validationResults } = require("express-validator");
const User = require("../models/users.models");

exports.Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(401).json({ message: "All fields are required" });
    const user_exists = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10)

    if (user_exists)
      return res
        .status(401)
        .json({ message: "email already used in registering" });

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({
    name: user.name,
    email: user.email,
    role: 'User'
  })
  } catch (error) {
    res.status(500).json({ error: "Server error", error})
  }
};
