'use strict';

const express = require('express'),
route = express.Router(),
swimmer = require('../models/target'),
uuidv4 = require('uuid/v4');

//create new swimmer target
route.post('/swimmertarget', (req, res)=>{
    var obj_swimmer_target = {
        _id:            uuidv4(),
        distance:       req.body.distance, 
        target:         req.body.targetTime,
        triesToImprove: req.body.triesToImprove,
        style:          req.body.style,
        targetTime:     req.body.targetTime,
        swimmer_ref:    req.body.swimmer_ref,
        date:           req.body.date
   };

    swimmer.createSwimmerTarget(obj_swimmer_target).then((data) => {
        res.status(200).json({isTrue: true, target_response: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//regular get swimmer (filter)
route.post('/getswimmertarget', (req, res)=>{
    var obj_swimmer_target = JSON.parse(JSON.stringify({
            swimmer_ref:    req.body.swimmer_ref
    }));

    swimmer.getSwimmerTarget(obj_swimmer_target).then((data) => {
        res.status(200).json({isTrue: true, target: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//create new team target
route.post('/teamtarget', (req, res)=>{
    var obj_team_target = {
        _id:            uuidv4(),
        distance:       req.body.distance, 
        target:         req.body.targetTime,
        triesToImprove: req.body.triesToImprove,
        style:          req.body.style,
        targetTime:     req.body.targetTime,
        team_id:        req.body.team_ref,
        date:           req.body.date
   };

    swimmer.createTeamTarget(obj_team_target).then((data) => {
        res.status(200).json({isTrue: true, target_response: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//regular get team target (filter)
route.post('/getteamtarget', (req, res)=>{
    var obj_team_target = JSON.parse(JSON.stringify({
            team_id:    req.body.team_id
    }));
        
    swimmer.getTeamTarget(obj_team_target).then((data) => {
        res.status(200).json({isTrue: true, target: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


module.exports = route