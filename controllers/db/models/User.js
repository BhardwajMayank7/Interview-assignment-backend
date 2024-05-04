const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: String,
  age: Number,
  contact: String,
  website: String,
  interests: [String],
  hobbies: [String],
  profilePhotoUrl: String, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
