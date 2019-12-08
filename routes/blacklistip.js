var express = require('express');
var blacklistip = require('../model/blacklistip')
var mongoose = require('mongoose')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //Load all the black list here and send to front

    let listIP = []
    blacklistip.find({},function(err,ip){
        if(err) console.log(err)
        ip.forEach(ip=>{
            listIP.push(ip.ip)
        })
    }).then(function()
        {
            console.log(typeof (listIP))
            console.log(listIP)
            res.render('blacklist', {title: 'Express', ips: listIP});
        }
    )
});

router.post('/', function(req, res, next) {
    console.log("Request body",req.body.ip)
    var ip = new blacklistip({
        ip: req.body.ip
    })
    console.log(req.body.ip)
    ip.save()
    res.redirect(301, '/blacklistip');
});
module.exports = router;

router.post('/removeBlackList',function(req, res, next){
    console.log("Remove ip" , req.body.ip)
    blacklistip.deleteOne({ip:req.body.ip},function(err,result){
        if(err) console.log(err)
        console.log(result)
    }).then(function()
    {
        res.redirect(301, '/blacklistip');
    })
})