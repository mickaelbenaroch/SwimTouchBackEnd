'use strict';

const express = require('express'),
route = express.Router(),
notification = require('../models/notification');

//get notification by swimmer
route.post('/getSwimmerMessage', (req, res) => {
    notification.getSwimmerMessage(req.body.swimmer_id).then((data) => {
        res.status(200).json({isTrue: true,  data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});





module.exports = route