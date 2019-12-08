var mongoose = require('mongoose');

var blacklistipSchema = mongoose.Schema({

    ip:{
        type:String,
        required:true,
        unique:true
    }
})

var blacklistip = module.exports = mongoose.model('badips',blacklistipSchema)