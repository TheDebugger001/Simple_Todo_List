const { body } = require("express-validator")


const validateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title should be provided")
    .isLength({ min: 3 })
    .withMessage("Title should have at least 3 characters"),

  body("description")
    .isLength({ min: 3 })
    .withMessage("Description should contain 3 characters at least"),
]

module.exports = {
  validateTodo
}