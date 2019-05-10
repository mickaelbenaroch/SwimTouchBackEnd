'use strict';

const { check } = require('express-validator/check'), 
express = require('express'),
route = express.Router(),
swimmer = require('../models/target'),
uuidv4 = require('uuid/v4'),
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - create new swimmer target
//require - none
//return  - boolean, true/false
route.post('/swimmertarget', (req, res)=>{
    var obj_swimmer_target = {
        _id:            uuidv4(),
        distance:       req.body.distance, 
        target:         req.body.targetTime,
        triesToImprove: req.body.triesToImprove,
        style:          req.body.style,
        targetTime:     req.body.targetTime,
        swimmer_ref:    req.body.swimmer_ref,
        date:           req.body.date,
        done:           req.body.done,
        notification_has_been_send: req.body.notification_has_been_send
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

//Details - get swimmer target
//require - swimmer_ref
//return  - swimmer target
route.post('/getswimmertarget', check('swimmer_ref').not().isEmpty(), (req, res)=>{
    var obj_swimmer_target = JSON.parse(JSON.stringify({
            swimmer_ref:    req.body.swimmer_ref
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        swimmer.getSwimmerTarget(obj_swimmer_target).then((data) => {
            res.status(200).json({isTrue: true, target: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - create new team target
//require - none
//return  - boolean, true/false
route.post('/teamtarget', (req, res)=>{
    var obj_team_target = {
        _id:            uuidv4(),
        distance:       req.body.distance, 
        target:         req.body.targetTime,
        triesToImprove: req.body.triesToImprove,
        style:          req.body.style,
        targetTime:     req.body.targetTime,
        team_id:        req.body.team_ref,
        date:           req.body.date,
        done:           req.body.done,
        notification_has_been_send: req.body.notification_has_been_send
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

//Details - get team target
//require - team_id
//return  - team target
route.post('/getteamtarget', check('team_id').not().isEmpty(), (req, res)=>{
    var obj_team_target = JSON.parse(JSON.stringify({
            team_id:    req.body.team_id
    }));
        
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        swimmer.getTeamTarget(obj_team_target).then((data) => {
            res.status(200).json({isTrue: true, target: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - update swimmer target
//require - _id (swimmer id)
//return  - boolean,  true/false
route.post('/updateswimmertarget', check('_id').not().isEmpty(), (req, res)=>{
    var obj_team_target = JSON.parse(JSON.stringify({
            _id:                        req.body._id,
            done:                       req.body.done,
            notification_has_been_send: req.body.notification_has_been_send
    }));
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        swimmer.updateSwimmerTarget(obj_team_target).then((data) => {
            res.status(200).json({isTrue: true, target: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - update team target
//require - _id (team id)
//return  - boolean,  true/false
route.post('/updateteamtarget', check('_id').not().isEmpty(), (req, res)=>{
    var obj_team_target = JSON.parse(JSON.stringify({
            _id:                        req.body._id,
            done:                       req.body.done,
            notification_has_been_send: req.body.notification_has_been_send
    }));
        
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        swimmer.updateTeamTarget(obj_team_target).then((data) => {
            res.status(200).json({isTrue: true, target: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route