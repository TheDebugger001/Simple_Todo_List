
const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
  names : { type:String, required:true },
  password : {
    type: String,
    length: 4, 
    required: true},
  email: {type:email, required: true},
}, {timestamps: true})

const User = mongoose.model("Users", UserModel)

module.exports = User