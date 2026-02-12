const express = require("express");
const TodoModel = require("../models/todo.models");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const Todo = new TodoModel({
      title,
      description,
      completed: completed || false,
      user: req.user.id,
    });
    await Todo.save();

    res.status(201).json({ message: "Todo created successfully", Task: Todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


