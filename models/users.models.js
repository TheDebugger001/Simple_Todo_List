
const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
  names : { type:String, required:true, unique:true},
  password : {
    type: String,
    length: 4,
    required: true},
  email: {type:email, required: true},
  role: {type:String, required:true , enum:['user', 'librarian', 'admin'], default:'user'}
}, {timestamps: true})

const User = mongoose.model("Users", UserModel)

module.exports = User
