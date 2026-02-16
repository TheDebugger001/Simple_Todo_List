const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/users.models");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_UI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log("Error occurred \n", error));

const seedAdmin = async (req, res) => {
  try {
    const AdminCheck = await User.findOne({ email: "admin@gmail.com" });

    if (AdminCheck) {
      console.log("Admin Already Exists");
    }

    const hashedPassword = await bcrypt.hash("123@123", 10);

    const Admin = await User.create({
      names: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created Successfully");
    console.log(Admin);
    process.exit();

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
};

seedAdmin()
