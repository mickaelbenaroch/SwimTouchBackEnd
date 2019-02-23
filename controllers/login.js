'use strict';

const express = require('express'),
route = express.Router(),
login = require('../models/login');
const { check, validationResult } = require('express-validator/check');

//signup new user
route.post('/signup', check('email').isEmail(), check('pass').isLength({ min: 8 }), (req, res) => {
    var user_query = req.body.email, 
        pass_query = req.body.pass;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    login.signup(user_query, pass_query).then((data) => {
        res.status(200).json({isTrue: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

//check user and password for login
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