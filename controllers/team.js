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
        swimmers:      req.body.swimmers,
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

//get all team
route.get('/getteams', (req, res)=>{
    team.getTeams().then((data) => {
        res.status(200).json({isTrue: true, team: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//get team by coach mail
route.get('/team', (req, res)=>{

    let coach = req.body.coachmail

    team.team(coach).then((data) => {
        res.status(200).json({isTrue: true, team: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//get swimmer traning 
route.post('/getSwimmerTeams', (req, res)=>{
    let obj_trainning = req.body.swimmer_id

    team.getSwimmerTeams(obj_trainning).then((data) => {
        res.status(200).json({isTrue: true, teams: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

module.exports = route