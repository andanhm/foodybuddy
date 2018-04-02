/**
 * Mongoose schema for user
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/* Schema Definition */
var userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  type: String,
  register: {
    type: Date,
    default: Date.now,
  },
}, {
    collection: 'tblUsers',
  });

module.exports.UserSchema = mongoose.model('User', userSchema);
