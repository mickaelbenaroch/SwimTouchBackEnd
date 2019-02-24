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

module.exports = route