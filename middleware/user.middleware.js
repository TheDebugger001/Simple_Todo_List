const express = require("express");
const jwt = require("jsonwebtoken");
const { body, param } = require("express-validator");
require("dotenv").config()

const registerValidation = [
  body("names")
    .notEmpty()
    .withMessage("Names should be provided")
    .isString()
    .withMessage("Names should be String")
    .isLength({ min: 3 })
    .withMessage("Names should have at least 3 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email should be provided")
    .isString()
    .withMessage("Email should be String")
    .isLength({ min: 3 })
    .withMessage("Email should have at least 3 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password should be provided")
    .isLength({ min: 6 })
    .withMessage("Password should have at least 6 characters"),
];

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader)
      return res
        .status(401)
        .json({ message: "Denied access, Unauthorized request" });

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
    
  } catch (error) {
    return res.status(501).json({ message: "Internal Server error" });
  }
};

module.exports = {
  registerValidation,
  authMiddleware
}