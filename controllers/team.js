'use strict';

const { check } = require('express-validator/check'),
express = require('express'),
route = express.Router(),
team = require('../models/team'),
uuidv4 = require('uuid/v4'),
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - create new team
//require - none
//return  - boolean, true/false
route.post('/', (req, res)=>{
    let obj_team = {
        _id:        uuidv4(),
        name:       req.body.name, 
        coachmail:  req.body.coachmail,
        swimmers:   req.body.swimmers,
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

//Details - get all team
//require - none
//return  - all teams
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

//Details - get team by coach mail
//require - coachmail
//return  - coachmail team
route.post('/team', check('coachmail').not().isEmpty(), (req, res)=>{

    let coach           = req.body.coachmail;
    let validat_result  = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        team.team(coach).then((data) => {
            res.status(200).json({isTrue: true, team: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get swimmer team 
//require - swimmer_id
//return  - swimmer team
route.post('/getSwimmerTeams',  check('swimmer_id').not().isEmpty(), (req, res)=>{
    let obj_trainning   = req.body.swimmer_id
    let validat_result  = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        team.getSwimmerTeams(obj_trainning).then((data) => {
            res.status(200).json({isTrue: true, teams: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get team by team_id  
//require - team_id 
//return  - team by team_id 
route.post('/getTeamById', check('team_id').not().isEmpty(), (req, res)=>{
    let obj_trainning = JSON.parse(JSON.stringify({
        team_id: req.body.team_id,
    }));
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        team.getTeamById(obj_trainning).then((data) => {
            res.status(200).json({isTrue: true, team: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - add new swimmer to team  
//require - swimmer_id & team_id
//return  - boolean, true/false 
route.post('/addSwimmerTeams',  check('swimmer_id').not().isEmpty(), check('team_id').not().isEmpty(), (req, res)=>{

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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


//Details - delete swimmer from team
//require - swimmer_id & team_id
//return  - boolean true\false
route.post('/deleteSwimmerTeams',  check('swimmer_id').not().isEmpty(), check('team_id').not().isEmpty(), (req, res)=>{

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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