'use strict';

const { check } = require('express-validator/check'), 
express     = require('express'),
route       = express.Router(),
statistic   = require('../models/statistic'),
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - get all swimmer records
//require - swimmer_id
//return  - user records
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

//Details - get user records by date 
//require - start_date & swimmer_ref(swimmer name)(end_date is optional)
//return  - user records
route.post('/date_record', check('start_date').not().isEmpty(), check('swimmer_ref').not().isEmpty() ,(req, res)=>{

    let obj_records = JSON.parse(JSON.stringify({
        start_date:  req.body.start_date,
        end_date:    req.body.end_date,
        swimmer_ref: req.body.swimmer_ref
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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


//Details - get full swimmer records (with exercise & swimer details) 
//require - swimmer_id
//return  - full swimmer records
route.post('/full_records', check('swimmer_id').not().isEmpty() ,(req, res)=>{
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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

//Details - get yesterday traning 
//require - coachmail
//return  - yesterday training & records
route.post('/yesterday_records', check('coachmail').not().isEmpty() ,(req, res)=>{
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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