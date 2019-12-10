var express = require('express');
var iptable = require('../model/iptables')
var mongoose = require('mongoose')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //Load all the black list here and send to frontz
    res.render('outbound',{title: 'Express'})
});


module.exports = router;

