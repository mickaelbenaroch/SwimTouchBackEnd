'use strict';

const { check } = require('express-validator/check'),
express         = require('express'),
route           = express.Router(),
todo            = require('../models/todo'),
valid_class     = require('../controllers/API/validate'),
log             = require('../controllers/API/logger');


//Details - insert new task
//require - email & message
//return  - boolean, true/fals & user profile
route.post('/insertTask', check('email').not().isEmpty(), check('message').not().isEmpty(), (req, res) => {

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        todo.insertTask(req.body.email, req.body.message).then((data) => {
            res.status(200).json({isTrue: data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//Details - get task
//require - email
//return  - boolean, true/fals & user profile
route.post('/getTask', check('email').not().isEmpty(), (req, res) => {

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        todo.getTask(req.body.email).then((data) => {
            res.status(200).json({isTrue: data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//Details - delete task
//require - email & task_id
//return  - boolean, true/fals & user profile
route.post('/deleteTask', check('email').not().isEmpty(), check('task_id').not().isEmpty(), (req, res) => {

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        todo.deleteTask(req.body.email, req.body.task_id).then((data) => {
            res.status(200).json({isTrue: data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

module.exports = route