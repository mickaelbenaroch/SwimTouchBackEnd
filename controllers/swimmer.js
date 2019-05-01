'use strict';

const express = require('express'),
route = express.Router(),
swimmer = require('../models/swimmer'),
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

//create new swimmer
route.post('/', (req, res)=>{
    var obj_swimmer = {
        _id:        uuidv4(),
        name:       req.body.name, 
        height:     req.body.height,
        group:      req.body.group,
        age:        req.body.age,
        coachmail:  req.body.coachmail,
        picture:    req.body.picture
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

//regular get swimmer (filter)
route.post('/getswimmers', (req, res)=>{
    var obj_swimmer = JSON.parse(JSON.stringify({
        _id:         req.body._id,
        name:        req.body.name, 
        height:      req.body.height,
        group:       req.body.group,
        age:         req.body.age,
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

//update swimmer
//require - swimmer_id
//no spicel feild update require - send any field to update
route.post('/updateSwimmers', check('swimmer_id').not().isEmpty(),  (req, res)=>{
    let obj_swimmer = JSON.parse(JSON.stringify({
        name:        req.body.name, 
        height:      req.body.height,
        group:       req.body.group,
        age:         req.body.age,
        coachmail:   req.body.coachmail,
        picture: req.body.picture
    }));

    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        swimmer.updateSwimmers(req.body.swimmer_id, obj_swimmer).then((data) => {
            res.status(200).json({isTrue: true, swimmer: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route