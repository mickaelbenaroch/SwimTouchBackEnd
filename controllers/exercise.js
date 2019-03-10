'use strict';

const express = require('express'),
route = express.Router(),
exercise = require('../models/exercise'),
uuidv4 = require('uuid/v4');

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
        routes:         req.body.routes
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

//regular get traning (multi key)
route.post('/getExercises', (req, res)=>{
    var obj_exercise = JSON.parse(JSON.stringify({
        _id:            req.body._id,
        date:           req.body.date, 
        coach:          req.body.coach,
        group:          req.body.group,
        style:          req.body.style,
        distance:       req.body.distance,
        howMuchTouches: req.body.howMuchTouches,
        routes:         req.body.routes
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


module.exports = route