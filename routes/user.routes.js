const express = require("express")
const { register, login, updateUser, getAllUsers, refreshAccessToken } = require("../controllers/auth.controller")
const { registerValidation, authMiddleware } = require("../middleware/user.middleware")

const router = express.Router()

router.get("/getUsers", authMiddleware, getAllUsers)
router.get("/refreshAccess", refreshAccessToken)
router.post("/register", registerValidation, register)
router.post("/login", registerValidation, login)
router.put("/update", authMiddleware, updateUser)

module.exports = router