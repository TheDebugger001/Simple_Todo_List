const express = require("express");
const { body, param } = require("express-validator");

exports.registerValidation = [
  body()
]