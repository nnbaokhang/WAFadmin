var mongoose = require('mongoose');

var whitelistipSchema = mongoose.Schema({

    ip:{
        type:String,
        required:true,
        unique:true
    }
})

var whitelistip = module.exports = mongoose.model('whitelistips',whitelistipSchema)