const mongoose = require('mongoose');

const AdminScheme = new mongoose.Schema({
  name:{
    type: String,
    required: true
   },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },

  otp: {
    type:Number
  },

  otp_expired:{
    type:Date,
  },
 
  otp_token: {
    type: String,
  },
  
  updated_at: {
    type: Date
  }

});

module.exports = User = mongoose.model('admin', AdminScheme);

