'use strict';

const { check } = require('express-validator/check'),
express         = require('express'),
route           = express.Router(),
profile         = require('../models/profile'),
valid_class     = require('../controllers/API/validate'),
log             = require('../controllers/API/logger');

//Details - get user profile by email
//require - email 
//return  - user profile
route.post('/', check('email').not().isEmpty(), (req, res)=>{
    let email = req.body.email;
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        profile.getProfile(email).then((data) => {
            res.status(200).json({isTrue: true, data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get all profile by group type
//require - group 
//return  - user profile 
route.post('/getGroup', check('group').not().isEmpty(), (req, res)=>{
    var group_query = req.body.group;
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        profile.getGroup(group_query).then((data) => {
            res.status(200).json({isTrue: true, data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get all profile by key object
//require - none (all fields optional)
//return  - user profile 
route.post('/getProfile', (req, res)=>{
    var obj_profile = JSON.parse(JSON.stringify({
        user:       req.body.user,
        first_name: req.body.first_name, 
        last_name:  req.body.last_name,
        age:        req.body.age,
        group:      req.body.group,
        type:       req.body.type,
    }));

    if(Object.entries(obj_profile).length === 0){
        res.status(500);   
        res.json({isTrue: false, error: "empty object"})
        res.status(500)
        res.end()
    }

    profile.getProfile(obj_profile).then((data) => {
        res.status(200).json({isTrue: true, data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

module.exports = route