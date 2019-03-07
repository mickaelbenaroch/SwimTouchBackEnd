'use strict';

const express = require('express'),
route = express.Router(),
team = require('../models/team'),
uuidv4 = require('uuid/v4');

//create new team
route.post('/', (req, res)=>{
    var obj_team = {
        _id:        uuidv4(),
        name:       req.body.name, 
        coachmail:      req.body.coachmail,
        exercises:      req.body.exercises,
    };

    team.createTeam(obj_team).then((data) => {
        res.status(200).json({isTrue: true, team_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//regular get traning (multi key)
route.post('/getteams', (req, res)=>{
    var obj_team = JSON.parse(JSON.stringify({
        _id:        req.body._id,
        date:       req.body.date, 
        coach:      req.body.coach,
        group:      req.body.group,
        style:      req.body.style,
        distance:   req.body.distance,
    }));

    team.getTeams(obj_team).then((data) => {
        res.status(200).json({isTrue: true, team: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


module.exports = route