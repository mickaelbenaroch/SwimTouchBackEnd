'use strict';

const express = require('express'),
route = express.Router(),
records = require('../models/statistic'),
{ check, validationResult } = require('express-validator/check');

//get all swimmer records (swimmer is require)
route.get('/swimmer_record', check('swimmer_ref').not().isEmpty() ,(req, res)=>{
    const errors = validationResult(req);
    let validate_array = errors.array();
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: `${validate_array[0].param} is require` });
    }

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
route.get('/date_record', check('start_date').not().isEmpty(), check('swimmer_ref').not().isEmpty() ,(req, res)=>{

    var obj_records = JSON.parse(JSON.stringify({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        swimmer_ref: req.body.swimmer_ref
    }));

    const errors = validationResult(req);
    let validate_array = errors.array();
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: `${validate_array[0].param} is require` });
    }

    records.getStatisticByDate(obj_records).then((data) => {
        res.status(200).json({isTrue: true, records: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


//get full swimmer records (with exercise 7 swimer details) (swimmer is require)
route.get('/full_records', check('swimmer_ref').not().isEmpty() ,(req, res)=>{
    records.getFullStatistic(req.body.swimmer_ref).then((data) => {
        res.status(200).json({isTrue: true, records: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

module.exports = route