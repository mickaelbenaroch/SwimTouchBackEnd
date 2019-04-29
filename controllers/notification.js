'use strict';

const express = require('express'),
route = express.Router(),
notification = require('../models/notification');
const { check, validationResult } = require('express-validator/check');

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

//get notification by swimmer_id
//require - "swimmer_id"
route.post('/getNotification', check('swimmer_id').not().isEmpty(), (req, res) => {
    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        notification.getNotification(req.body.swimmer_id).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//set notification
//require - all fields require except from "HasBeenreaded" is false by default and coachmail
route.post('/setNotification', check('swimmer_id').not().isEmpty(), check('message').not().isEmpty(), 
    check('coachmail').not().isEmpty(), check('date').not().isEmpty(),check('title').not().isEmpty(), (req, res) => {

    let swimmer_id = req.body.swimmer_id,
    message =  req.body.message,
    title =  req.body.title,
    coachmail =  req.body.coachmail,
    date =  req.body.date,
    coachId =  req.body.coachId;
    
    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        notification.setNotification({"HasBeenreaded": false, "swimmer_id": swimmer_id,"title": title, "message": message, "coachmail": coachmail,
                                      "date": date, "coachId": coachId }).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});


//get swimmer notification only if read
//require  - swimmer_id
route.post('/readNotification', (req, res) => {
    notification.readNotification(req.body.swimmer_id).then((data) => {
        res.status(200).json({isTrue: true,  data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

//get swimmer notification only if unread
//require  - swimmer_id
route.post('/unreadNotification', (req, res) => {
    notification.unreadNotification(req.body.swimmer_id).then((data) => {
        res.status(200).json({isTrue: true,  data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

//update HasBeenreaded field to true
//require  - notification_id
route.post('/updateNotification', check('notification_id').not().isEmpty(), (req, res) => {
    let validat = valid_chack(validationResult(req));

    if(validat.next().value == false){
        res.status(422).json({ errors: `${validat.next().value[0].param} is require` });
    }else{
        notification.updateNotification(req.body.notification_id).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//delete notificatione
//require  - notification_id
route.post('/deleteNotification', (req, res) => {
    notification.deleteNotification(req.body.notification_id).then((data) => {
        res.status(200).json({isTrue: true,  data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

module.exports = route