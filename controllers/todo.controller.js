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

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await TodoModel.findOne({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    todo = await TodoModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {new: true}
    );

    if (!todo) return res.status(404).json({ message: "Todo Not Found" });

    res.status(200).json({ message: "Todo Updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id)

    if(!todo) return res.status(404).json({ message: "Todo Not Found"})
    res.status(200).json({ message: "Todo Deleted successfully"})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"})
  }
}