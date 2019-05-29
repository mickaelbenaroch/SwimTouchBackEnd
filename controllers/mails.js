'use strict';

const { check } = require('express-validator/check'),
express         = require('express'),
route           = express.Router(),
mail    = require('../models/mails');




//Details - get notification by swimmer_id
//require - swimmer_id
//return  - swimmer notification
route.post('/getMails', (req, res) => {
        let receiver   = req.body.receiver;

        mail.getMails(receiver).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
})


//Details - set new notification
//require - all fields require except "HasBeenreaded", is false by default and coachmail field.
//return  - boolean, true/false
route.post('/setMail', (req, res) => {

    let sender = req.body.sender,
    receiver   = req.body.receiver,
    title      = req.body.title,
    body       = req.body.body,
    date       = new Date();
    
    mail.setMail({"sender": sender, "receiver": receiver,"title": title, "body": body, "date": date}).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
})

module.exports = route