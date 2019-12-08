var express = require('express');
var whitelistip = require('../model/whitelistip')
var mongoose = require('mongoose')

var router = express.Router();


router.get('/', function(req, res, next) {
  //Load all the white list here and send to front
  let listIP = []
  whitelistip.find({},function(err,ip){
      if(err) console.log(err)
      ip.forEach(ip=>{
          listIP.push(ip.ip)
      })
  }).then(function()
    {
        console.log(typeof (listIP))
        console.log(listIP)
        res.render('whitelist', {title: 'Express', ips: listIP});
    }
  )
});

router.post('/', function(req, res, next) {
    console.log("Request body",req.body.ip)
    var ip = new whitelistip({
        ip: req.body.ip
    })
    console.log(req.body.ip)
    ip.save()
    res.redirect(301, '/whitelistip');
});

router.post('/removeWhiteList',function(req, res, next){
    console.log("Remove ip" , req.body.ip)
    whitelistip.deleteOne({ip:req.body.ip},function(err,result){
        if(err) console.log(err)
        console.log(result)
    }).then(function()
    {
        res.redirect(301, '/whitelistip');
    })
})


module.exports = router;
