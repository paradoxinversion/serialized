const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//Declare the mongodb schema for users
const User = new Schema({
  email: String,
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  birthdate: Date,
  joinDate: Date,
  biography: String
});

User.methods.generateHash = function(password){
  return bcrypt.hash(password, 10);
};

User.methods.validatePassword = function(password){
  console.log("validation test:::", this)
  return bcrypt.compare(password, this.password);
};
//Define our model.
// http://mongoosejs.com/docs/models.html
module.exports = mongoose.model('User', User);
