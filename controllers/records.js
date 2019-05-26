'use strict';
 
const { check } = require('express-validator/check'),
express         = require('express'),
route           = express.Router(),
recor           = require('../models/records'),
valid_class     = require('../controllers/API/validate'),
log             = require('../controllers/API/logger');

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


//Details - set new records
//require - none
//return  - boolean, true\false
route.post('/getrecord',  (req, res) => {
    let record = {
        exercise_id: req.body.exercise_id
    };

recor.getRecords(record).then((data) => {
    res.status(200).json({isTrue: data});   
    res.end(); 
}).catch((err) => {
    res.json({isTrue: false, error: err})
    res.status(500)
    res.end()
});
});


//Details - chack if swimmer and exercise is in record
//require - exercise_id & swimmer_id
//return  - boolean, true\false
route.post('/chackRecords',  check('exercise_id').not().isEmpty(), check('swimmer_id').not().isEmpty(), (req, res) => {
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        recor.chackRecords(req.body.exercise_id, req.body.swimmer_id).then((data) => {
            res.status(200).json({isTrue: true, data: data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});
module.exports = route