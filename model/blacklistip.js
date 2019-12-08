var mongoose = require('mongoose');

var blacklistipSchema = mongoose.Schema({

    ip:{
        type:String,
        required:true,
        unique:true
    },
    reason:{
        type:String,
    }
})

var blacklistip = module.exports = mongoose.model('blacklistips',blacklistipSchema)