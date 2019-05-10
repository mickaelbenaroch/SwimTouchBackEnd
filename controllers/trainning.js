'use strict';

const { check } = require('express-validator/check'), 
express = require('express'),
route = express.Router(),
trainning = require('../models/trainning'),
uuidv4 = require('uuid/v4'),
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - create new trainning & is records document
//require - none
//return  - boolean,  true/false
route.post('/', (req, res)=>{
    let obj_trainning = {
        _id:            uuidv4(),
        name:           req.body.name, 
        coachmail:      req.body.coachmail,
        exercises:      req.body.exercises,
        team_id:        req.body.team_id,
        date:           req.body.date,
        exercisesCount: req.body.exercisesCount,
        distance:       req.body.distance,
        
    };

    trainning.createTrainning(obj_trainning).then((data) => {
        res.status(200).json({isTrue: true, trainning_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get training 
//require - none (if boody req empty, response return empty)
//return  - training
route.post('/getTrainnings', (req, res)=>{
    let obj_trainning = JSON.parse(JSON.stringify({
        _id:        req.body._id,
        name:       req.body.name, 
        coachmail:  req.body.coachmail,
        exercises:  req.body.exercises,
        team_id:    req.body.team_id,
        distance:   req.body.distance
    }));

    trainning.getTrainnings(obj_trainning).then((data) => {
        res.status(200).json({isTrue: true, trainning: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get swimmer trainning 
//require - swimmer_id
//return  - swimmer training
route.post('/getSwimmerTrainnings', check('swimmer_id').not().isEmpty(), (req, res)=>{
    let obj_trainning   = req.body.swimmer_id
    let validat_result  = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        trainning.getSwimmerTrainnings(obj_trainning).then((data) => {
            res.status(200).json({isTrue: true, trainning: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details   - update trainning
//require   - trainning_id (fields to update is optional)
//return    - boolean, true/false 
route.post('/updateTrainnings', check('trainning_id').not().isEmpty(),  (req, res)=>{
    let obj_trainning = req.body.trainning_id

    let obj = JSON.parse(JSON.stringify({
        name:           req.body.name, 
        coachmail:      req.body.coachmail,
        date:           req.body.date,
        exercisesCount: req.body.exercisesCount,
        distance:       req.body.distance,
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        trainning.updateTrainnings(obj, obj_trainning).then((data) => {
            res.status(200).json({isTrue: true, trainning: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

module.exports = route