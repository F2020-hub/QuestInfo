const mongoose = require('mongoose');

const PlatformScheme = new mongoose.Schema({

    platform_name: {
        type: String,
        required: true
    },

    created_at: {
        type: Date
    },

});

module.exports = Platform = mongoose.model('platform', PlatformScheme);