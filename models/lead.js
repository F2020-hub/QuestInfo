const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const leadScheme = new mongoose.Schema({

    project_id:{
        type: Schema.Types.ObjectId,
        ref: 'project'
    },

    platform_id:{
        type: Schema.Types.ObjectId,
        ref: 'platform'
    },

    name:{
        type: String,
       
    },

    email:{
        type: String,
        
    },

    phone_no:{
        type:Number,
         
    },

    lead_date: {
        type: Date,
        default: Date.now
    },

    graduation_status: {
        type: String,
        
    },

    city: {
        type: String,
        
    },

    created_at: {
        type: Date,
        default: Date.now
    },

      updated_at: {
        type: Date
      }, 

    lead_state:{
        type:Number,
        default:0
     }
});

module.exports =  Lead = mongoose.model('lead', leadScheme);