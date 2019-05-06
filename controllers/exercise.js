'use strict';

const express = require('express'),
route = express.Router(),
exercise = require('../models/exercise'),
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

//create new exercise
route.post('/', (req, res)=>{
    var obj_exercise = {
        _id:        uuidv4(),
        date:       req.body.date, 
        coach:      req.body.coach,
        group:      req.body.group,
        style:      req.body.style,
        distance:   req.body.distance,
        howMuchTouches: req.body.howMuchTouches,
        routes:         req.body.routes,
        description:    req.body.description,
        type:            req.body.type,
        singleSwimDistance: req.body.singleSwimDistance,
        repeat:      req.body.repeat,
        hasBeenStarted: req.body.hasBeenStarted
    };

    exercise.createExercise(obj_exercise).then((data) => {
        res.status(200).json({isTrue: true, exercise_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//regular get exercises (filter) - if empty req body return all exercises
route.post('/getExercises', (req, res)=>{
    var obj_exercise = JSON.parse(JSON.stringify({
        _id:            req.body._id,
        date:           req.body.date, 
        coach:          req.body.coach,
        group:          req.body.group,
        style:          req.body.style,
        distance:       req.body.distance,
        howMuchTouches: req.body.howMuchTouches,
        routes:         req.body.routes,
        description:    req.body.description,
        type:            req.body.type,
        singleSwimDistance: req.body.singleSwimDistance,
        repeat:             req.body.repeat,
        hasBeenStarted:     req.body.hasBeenStarted
    }));

    exercise.getExercises(obj_exercise).then((data) => {
        res.status(200).json({isTrue: true, exercise: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//update exercises (filter)
route.post('/updateExercise', (req, res)=>{
    var obj_exercise = JSON.parse(JSON.stringify({
        id:             req.body.id,
        date:           req.body.date, 
        coach:          req.body.coach,
        group:          req.body.group,
        style:          req.body.style,
        distance:       req.body.distance,
        howMuchTouches: req.body.howMuchTouches,
        routes:         req.body.routes,
        description:      req.body.description,
        type:            req.body.type,
        singleSwimDistance: req.body.singleSwimDistance,
        repeat:      req.body.repeat,
        hasBeenStarted: req.body.hasBeenStarted
    }));

    exercise.updateExercises(obj_exercise).then((data) => {
        res.status(200).json({isTrue: true, exercise: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//get swimmer exercises 
route.post('/getSwimmerExercises', (req, res)=>{

    let obj_exercise = req.body._id;

    exercise.getSwimmerExercises(obj_exercise).then((data) => {
        res.status(200).json({isTrue: true, exercise: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


//update exercises
//require  - exercise_id & training_id
//optional - field to update
//return   - bool & mogodb result
route.post('/update', check('exercise_id').not().isEmpty(), check('training_id').not().isEmpty(),  (req, res)=>{
    let obj_exercise = req.body.exercise_id
    let obj_training  = req.body.training_id

    let obj = JSON.parse(JSON.stringify({
        date:           req.body.date, 
        coach:          req.body.coach,
        group:          req.body.group,
        style:          req.body.style,
        distance:       req.body.distance,
        howMuchTouches: req.body.howMuchTouches,
        routes:         req.body.routes,
        description:    req.body.description,
        type:           req.body.type,
        repeat:         req.body.repeat,
        hasBeenStarted: req.body.hasBeenStarted
    }));

    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        exercise.update(obj_exercise, obj_training, obj, obj).then((data) => {
            res.status(200).json({isTrue: true, exercise: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route