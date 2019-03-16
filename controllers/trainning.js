'use strict';

const express = require('express'),
route = express.Router(),
trainning = require('../models/trainning'),
uuidv4 = require('uuid/v4');

//create new trainning
route.post('/', (req, res)=>{
    var obj_trainning = {
        _id:        uuidv4(),
        name:       req.body.name, 
        coachmail:  req.body.coachmail,
        exercises:  req.body.exercises,
        team_id:    req.body.team_id
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

//regular get traning (multi key object)
route.post('/getTrainnings', (req, res)=>{
    var obj_trainning = JSON.parse(JSON.stringify({
        _id:        req.body._id,
        name:       req.body.name, 
        coachmail:      req.body.coachmail,
        exercises:      req.body.exercises,
        team_id:      req.body.team_id,
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


module.exports = route