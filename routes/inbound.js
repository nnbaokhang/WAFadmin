var express = require('express');
var iptable = require('../model/iptables')
var mongoose = require('mongoose')
const { exec } = require('child_process');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //Load all the black list here and send to frontz

    let listOfRule = []
    iptable.find({},function(err,rules){
        if(err) console.log(err)
        rules.forEach(rule=>{
            listOfRule.push(rule.iptable_rule)
        })
    }).then(function()
        {
            res.render('inbound', {title: 'Express', table_rule: listOfRule});
        }
    )
});

/* POST home page. */
router.post('/', function(req, res, next) {
    //Load all the black list here and send to frontz

    var rule = new iptable({
        iptable_rule: req.body.inbound
    })
    rule.save()

    //Flush iptables
    exec('iptables -P INPUT ACCEPT', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });


    exec('iptables -t nat -F', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });

    exec('iptables -t mangle -F', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });


    exec('iptables -F', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });

    exec('iptables -X', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });


    iptable.find({},function(err,rules){
        if(err) console.log(err)
        rules.forEach(rule=>{
            console.log(rule.iptable_rule)
            exec(rule.iptable_rule, (err, stdout, stderr) => {
                if (err) {
                    //some err occurred
                    console.error(err)
                } else {
                    // the *entire* stdout and stderr (buffered)
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                }
            });
        })
    }).then(function()
        {
            res.redirect(301, '/inbound');
        }
    )

    //End flush ip tables

});
router.post('/remove', function(req, res, next) {
    console.log("Remove inbound iptables" , req.body.inbound)
    iptable.deleteOne({iptable_rule:req.body.inbound},function(err,result){
        if(err) console.log(err)
        console.log(result)
    }).then(function()
    {
        res.redirect(301, '/inbound');
    })
});



module.exports = router;

