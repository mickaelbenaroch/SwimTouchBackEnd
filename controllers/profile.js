'use strict';

const express = require('express'),
route = express.Router(),
profile = require('../models/profile');

//get user profile
route.post('/', (req, res)=>{
    var user_query = req.body.email;

    profile.getProfile(user_query).then((data) => {
        res.status(200).json({isTrue: true, data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//get all profile by group
route.post('/getGroup', (req, res)=>{
    var group_query = req.body.group;

    profile.getGroup(group_query).then((data) => {
        res.status(200).json({isTrue: true, data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//get all profile by key object
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