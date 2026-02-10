const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.register = async (req, res) => {
  try {
    const {names, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      names,
      email: email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User was created successfully ✅" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error ❌🛑", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET,
      {expiresIn: "10m"}
      )
    
    return res.status(200).json({
      message: "LoggedIn Successfully",
      token
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error ❌🛑", error });
  }
};
