'use strict';

const { check } = require('express-validator/check'),
express = require('express'),
route = express.Router(),
swimmer = require('../models/swimmer'),
uuidv4 = require('uuid/v4'),
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - create new swimmer & is records document
//require - none
//return  - boolean, true\false
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


//Details - get swimmer
//require - none (if body req is empty , resualt res get all swimmer)
//return  - swimmer 
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

//Details - update swimmer
//require - swimmer_id
//return  - boolean, true\false
route.post('/updateSwimmers', check('swimmer_id').not().isEmpty(),  (req, res)=>{
    let obj_swimmer = JSON.parse(JSON.stringify({
        name:        req.body.name, 
        height:      req.body.height,
        group:       req.body.group,
        age:         req.body.age,
        coachmail:   req.body.coachmail,
        picture:     req.body.picture
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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