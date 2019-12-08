var express = require('express');
var iptable = require('../model/iptables')
var mongoose = require('mongoose')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //Load all the black list here and send to front
    res.render('security-group',{title: 'Express'})
});

router.get('/inbound', function(req, res, next) {
    //Load all the black list here and send to front
    console("INBOUND rule")
    res.render('inbound',{title: 'Express'})
});

router.get('/outbound', function(req, res, next) {
    //Load all the black list here and send to front
    console("INBOUND rule")
    res.render('outbound',{title: 'Express'})
});




router.post('/', function(req, res, next) {

});

module.exports = router;
