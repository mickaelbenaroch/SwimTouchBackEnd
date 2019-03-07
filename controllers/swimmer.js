'use strict';

const express = require('express'),
route = express.Router(),
swimmer = require('../models/swimmer'),
uuidv4 = require('uuid/v4');

//create new swimmer
route.post('/', (req, res)=>{
    var obj_swimmer = {
        _id:        uuidv4(),
        name:       req.body.name, 
        height:      req.body.height,
        group:      req.body.group,
        age:      req.body.age,
        coachmail:   req.body.coachmail,
        picture: req.body.picture
    };

    swimmer.createSwimmer(obj_swimmer).then((data) => {
        res.status(200).json({isTrue: true, swimmer_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//regular get traning (multi key)
route.post('/getswimmers', (req, res)=>{
    var obj_swimmer = JSON.parse(JSON.stringify({
        _id:        req.body._id,
        name:       req.body.name, 
        height:      req.body.height,
        group:      req.body.group,
        age:      req.body.age,
        coachmail:   req.body.coachmail,
        picture: req.body.picture
    }));

    swimmer.getSwimmers(obj_swimmer).then((data) => {
        res.status(200).json({isTrue: true, swimmer: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


module.exports = route