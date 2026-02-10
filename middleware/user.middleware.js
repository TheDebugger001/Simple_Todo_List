const express = require("express");
const { body, param } = require("express-validator");

exports.registerValidation = [
  body("names")
    .notEmpty().withMessage("Names should be provided")
    .isString().withMessage("Names should be String")
    .isLength({ min: 3 }).withMessage("Names should have at least 3 characters"),
  body("email")
    .notEmpty().withMessage("Email should be provided")
    .isString().withMessage("Email should be String")
    .isLength({ min: 3 }).withMessage("Email should have at least 3 characters"),
  body("password")
    .notEmpty().withMessage("Password should be provided")
    .isLength({ min: 6 }).withMessage("Password should have at least 6 characters"),
]