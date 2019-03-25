'use strict';

const express = require('express'),
route = express.Router(),
records = require('../models/statistic'),
{ check, validationResult } = require('express-validator/check');

//get all swimmer records (swimmer is require)
route.get('/swimmer', check('swimmer_ref').not().isEmpty() ,(req, res)=>{

    records.getStatisticByswimmer(req.body.swimmer_ref).then((data) => {
        res.status(200).json({isTrue: true, records: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//get user records by date (start_date & swimmer name is require, end_date is optional)
route.get('/date_swimmer', check('start_date').not().isEmpty(), check('swimmer_ref').not().isEmpty() ,(req, res)=>{

    var obj_records = JSON.parse(JSON.stringify({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        swimmer_ref: req.body.swimmer_ref
    }));

    records.getStatisticByDate(obj_records).then((data) => {
        res.status(200).json({isTrue: true, records: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});




module.exports = route