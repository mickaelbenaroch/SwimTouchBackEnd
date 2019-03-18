'use strict';

const express = require('express'),
route = express.Router(),
recor = require('../models/records');

//set new records
route.post('/setrecords', (req, res) => {
        var record = {
            now_date:     req.now_date,
            exercise_id:  req.body.exercise_id,
            route:        req.body.route, 
            start_time:   req.body.start_time,
            jump_time:    req.body.jump_time,
            times:        req.body.times,
            notes:        req.body.notes,
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