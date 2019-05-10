'use strict';

const { check, validationResult } = require('express-validator/check'), 
express     = require('express'),
route       = express.Router(),
statistic   = require('../models/statistic'),
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - get all swimmer records
//require - swimmer_id
//return  - user profile
route.post('/swimmer', check('swimmer_id').not().isEmpty() ,(req, res)=>{

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        statistic.getStatisticByswimmer(req.body.swimmer_id).then((data) => {
            res.status(200).json({isTrue: true, records: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//get user records by date (start_date & swimmer name is require, end_date is optional)
route.post('/date_record', check('start_date').not().isEmpty(), check('swimmer_ref').not().isEmpty() ,(req, res)=>{

    var obj_records = JSON.parse(JSON.stringify({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        swimmer_ref: req.body.swimmer_ref
    }));

    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        statistic.getStatisticByDate(obj_records).then((data) => {
            res.status(200).json({isTrue: true, records: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


//get full swimmer records (with exercise 7 swimer details) (swimmer is require)
route.post('/full_records', check('swimmer_id').not().isEmpty() ,(req, res)=>{
    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        statistic.getFullStatistic(req.body.swimmer_id).then((data) => {
            res.status(200).json({isTrue: true, records: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//get yesterday traning 
//require - coachmail to get is training
//return  - yesterday training & records
route.post('/yesterday_records', check('coachmail').not().isEmpty() ,(req, res)=>{
    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        statistic.yesterday_records(req.body.coachmail).then((data) => {
            res.status(200).json({isTrue: true, records: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route