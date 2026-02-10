
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
dotenv.config()

const PORT = process.env.PORT
const MONGO_UI = process.env.MONGO_UI

mongoose.connect(MONGO_UI)
   .then(() => console.log("Well schom"))
   .catch((error) => console.log("Too bad . . . . . . . . .", error))

app.get('/api', (req, res) => {
   res.status(200).json({message : "Hii"})
})

app.listen((PORT), console.log( `Server is at http://localhost:${PORT}`))