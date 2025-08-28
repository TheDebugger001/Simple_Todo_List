
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
   names: { type:String, required: true},
   password: {
      type:String,
      required: true,
      min: 4
   },
   email: { 
      type:String, 
      unique: true,
      required: true
   },
   
}, {
   timestamps: true
})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin;