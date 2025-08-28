
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
dotenv.config()
const Admin = require("./models/admin.models")
const MONGO_UI = process.env.MONGO_UI 

mongoose.connect(MONGO_UI)
   .then(() => console.log("Admin's connected to db"))
   .catch((error) => console.log("ERROR SCHOM", error))

   const createAdmin = async (req, res) => {

      const hashedPassword = await bcrypt.hash("12345@qwert", 10)

      const newAdmin = new Admin({
         names: "Guerschom",
         password: hashedPassword,
         email: "guerschom@gmail.com"
      })

      await newAdmin.save()
      console.log("Admin Created Successfully");
      mongoose.connection.close()
   }

   createAdmin();
