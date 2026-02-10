const express = require("express")
const { register, login } = require("../controllers/authControllers")
const { registerValidation } = require("../middleware/user.middleware")

const router = express.Router()

router.post("/register/", registerValidation, register)
router.post("/login/", registerValidation, login)