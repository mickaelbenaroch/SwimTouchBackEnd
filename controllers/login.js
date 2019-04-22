'use strict';

const express = require('express'),
route = express.Router(),
login = require('../models/login');
const { check, validationResult } = require('express-validator/check');

//signup new user
route.post('/signup', check('user').isEmail(), check('pwd').isLength({ min: 8 }), (req, res) => {
    var profile = {
        user:       req.body.user, 
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        age:        req.body.age,
        group:      req.body.group,
        type:       req.body.type
    },
    pwd = req.body.pwd;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    login.signup(profile, pwd).then((data) => {
        res.status(200).json({isTrue: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

//upload new picture of user
route.post('/upload', (req, res) => {
    login.picture(req.body.email, req.body.picture).then((data) => {
        res.status(200).json({isTrue: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

//check user and password for user login
route.post('/', (req, res)=>{
    var user_query = req.body.email, 
        pass_query = req.body.pass

    login.login(user_query, pass_query).then((data) => {
        res.status(200).json({isTrue: data, id: req.body.email});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


module.exports = route