const express = require("express");
const {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} = require("../controllers/todo.controller");

const { authMiddleware } = require("../middleware/user.middleware");
const { validateTodo } = require("../middleware/todo.middleware");

const router = express.Router();

router.get("/", authMiddleware, getAllTodo);
router.post("/add", authMiddleware, validateTodo, createTodo);
router.put("/:id", authMiddleware, validateTodo, updateTodo);
router.put("/:id", authMiddleware, deleteTodo);

module.exports = router