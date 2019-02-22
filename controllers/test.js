'use strict';

var express = require('express'),
route = express.Router(),
test = require('../models/test');

route.get('/test', (req, res)=>{
    test.test().then((data) => {
        console.log(data);
        res.status(200).json({profile: data});   
        res.end();
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

module.exports = route