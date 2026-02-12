const express = require("express")
const { register, login } = require("../controllers/auth.controller")
const { registerValidation } = require("../middleware/user.middleware")

const router = express.Router()

router.post("/register", registerValidation, register)
router.post("/login", registerValidation, login)

module.exports = router