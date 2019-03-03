'use strict';

const express = require('express'),
route = express.Router(),
training = require('../models/training'),
uuidv4 = require('uuid/v4');

//create new training
route.post('/', (req, res)=>{
    var obj_training = {
        _id:        uuidv4(),
        date:       req.body.date, 
        coach:      req.body.coach,
        group:      req.body.group,
        style:      req.body.style,
        distance:   req.body.distance,
    };

    training.createTraining(obj_training).then((data) => {
        res.status(200).json({isTrue: true, training_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});



module.exports = route