var mongoose = require('mongoose');

var suspiciousipSchema = mongoose.Schema({

    ip:{
        type:String,
        required:true,
        unique:true
    },
    reason:{
        type:String,
    }
})

var suspiciousIP = module.exports = mongoose.model('suspiciousips',suspiciousipSchema)