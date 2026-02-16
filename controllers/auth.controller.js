const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { names, email, password, role } = req.body;

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

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "LoggedIn Successfully",
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error ❌🛑", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (req.user.role != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (users.length == 0)
      return res.status(404).json({ message: "No user found" });

    res.status(200).json({ message: "User found successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;

    const newUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password", "-role");

    res.status(200).json({ message: "User updated successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
