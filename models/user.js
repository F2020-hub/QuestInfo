const mongoose = require('mongoose');

const AdminScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
       },

    email:{
        type:String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    

});

module.exports =  User = mongoose.model('admin', AdminScheme);


