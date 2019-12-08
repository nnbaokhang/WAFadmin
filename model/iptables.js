var mongoose = require('mongoose');

var iptableSchema = mongoose.Schema({

    iptable_rule:{
        type:String,
        required:true,
        unique:true
    }
})

var iptable = module.exports = mongoose.model('iptables',iptableSchema)