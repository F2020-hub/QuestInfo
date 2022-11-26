const mongoose = require('mongoose');

const ProjectScheme = new mongoose.Schema({

    project_name: {
        type: String,
        required: true
    },

    company_name: {
        type: String,
        required: true
    },

    contact_no: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    project_status: {
        type:Number,
        default: 1    //0: inactive, 1: active
      },

    address: {
        type: String,
        required: true
    },

    created_at: {
        type: Date
    },

});

module.exports = Project = mongoose.model('project', ProjectScheme);
