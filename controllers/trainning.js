'use strict';

const express = require('express'),
route = express.Router(),
trainning = require('../models/trainning'),
uuidv4 = require('uuid/v4'),
{ check, validationResult } = require('express-validator/check');

//chack validation
function* valid_chack(validationResult){ 
    let validate_array = validationResult.array();
    if (!validationResult.isEmpty()) {
        yield false;
        yield validate_array;
    }else{
        return true;
    }
}

//create new trainning
route.post('/', (req, res)=>{
    var obj_trainning = {
        _id:        uuidv4(),
        name:       req.body.name, 
        coachmail:  req.body.coachmail,
        exercises:  req.body.exercises,
        team_id:    req.body.team_id,
        date:       req.body.date,
        exercisesCount: req.body.exercisesCount,
        distance:   req.body.distance,
        
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

//regular get trainning (multi key object)
route.post('/getTrainnings', (req, res)=>{
    var obj_trainning = JSON.parse(JSON.stringify({
        _id:        req.body._id,
        name:       req.body.name, 
        coachmail:      req.body.coachmail,
        exercises:      req.body.exercises,
        team_id:      req.body.team_id,
        distance:     req.body.distance
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

//get swimmer trainning 
route.post('/getSwimmerTrainnings', (req, res)=>{
    let obj_trainning = req.body.swimmer_id

    trainning.getSwimmerTrainnings(obj_trainning).then((data) => {
        res.status(200).json({isTrue: true, trainning: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//update trainning .
//require   - trainning_id.
//optional  - fields to update (witout update exercise and team)
//return    - bollean (rtue \false).
route.post('/updateTrainnings', check('trainning_id').not().isEmpty(),  (req, res)=>{
    let obj_trainning = req.body.trainning_id

    let obj = JSON.parse(JSON.stringify({
        name:           req.body.name, 
        coachmail:      req.body.coachmail,
        date:           req.body.date,
        exercisesCount: req.body.exercisesCount,
        distance:       req.body.distance,
    }));

    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
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