'use strict';

const express = require('express'),
route = express.Router(),
recor = require('../models/records'),
log   = require('../controllers/API/logger');

//Details - set new records
//require - none
//return  - boolean, true\false
route.post('/setrecords',  (req, res) => {
        let record = {
            _id:         req.body._id,
            date:        req.body.date,
            jump_time:   req.body.jump_time,
            results:     req.body.results,
            swimmer:     req.body.swimmer,
            exercise_id: req.body.exercise_id
        };

        recor.setRecords(record).then((data) => {
        res.status(200).json({isTrue: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

module.exports = route