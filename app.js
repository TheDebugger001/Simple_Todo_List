const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors")
dotenv.config();

const PORT = process.env.PORT;
const MONGO_UI = process.env.MONGO_UI;
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes")

app.use(cors())
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/todos", todoRoutes)

mongoose
  .connect(MONGO_UI)
  .then(() => console.log("Well schom"))
  .catch((error) => console.log("Too bad . . . . . . . . .\n", error));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hii, I am Guerschom " });
});

app.listen(PORT, console.log(`Server is at http://localhost:${PORT}`));