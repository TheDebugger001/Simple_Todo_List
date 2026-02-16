const express = require("express")
const { register, login, updateUser, getAllUsers } = require("../controllers/auth.controller")
const { registerValidation, authMiddleware } = require("../middleware/user.middleware")

const router = express.Router()

router.post("/register", registerValidation, register)
router.post("/login", registerValidation, login)
router.get("/getUsers", authMiddleware, getAllUsers)
router.put("/update", authMiddleware, updateUser)

module.exports = router