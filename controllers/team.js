'use strict';

const express = require('express'),
route = express.Router(),
team = require('../models/team'),
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

//get swimmer team 
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

//get team by team _id 
route.post('/getTeamById', (req, res)=>{
    var obj_trainning = JSON.parse(JSON.stringify({
        team_id:    req.body.team_id,
    }));

    team.getTeamById(obj_trainning).then((data) => {
        res.status(200).json({isTrue: true, team: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//add new swimmer to team
//require - swimmer_id & team_id
route.post('/addSwimmerTeams',  check('swimmer_id').not().isEmpty(), check('team_id').not().isEmpty(), (req, res)=>{

    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        team.addSwimmerTeams({"team": req.body.team_id, "swimmer": req.body.swimmer_id}).then((data) => {
            res.status(200).json({isTrue: true, teams: "team update"});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


//delete swimmer from team
//require - swimmer_id & team_id
//return  - boolean true\false
route.post('/deleteSwimmerTeams',  check('swimmer_id').not().isEmpty(), check('team_id').not().isEmpty(), (req, res)=>{

    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        team.deleteSwimmerTeams({"team": req.body.team_id, "swimmer": req.body.swimmer_id}).then((data) => {
            res.status(200).json({isTrue: true, teams: "user delete from the team"});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route