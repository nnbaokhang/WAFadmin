var express = require('express');
var suspiciousIP = require('../model/suspiciousip')
var mongoose = require('mongoose')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //Load all the black list here and send to front

    let listIP = []
    suspiciousIP.find({},function(err,ip){
        if(err) console.log(err)
        ip.forEach(ip=>{
            let object = {ip:ip.ip,reason:ip.reason}
            listIP.push(object)
        })
    }).then(function()
        {
            res.render('suspiciousip', {title: 'Express', ips: listIP});
        }
    )
});

module.exports = router;

