'use strict';

const { check } = require('express-validator/check'),
express         = require('express'),
route           = express.Router(),
notification    = require('../models/notification'),
valid_class     = require('../controllers/API/validate'),
log             = require('../controllers/API/logger');

//Details - get notification by swimmer_id
//require - swimmer_id
//return  - swimmer notification
route.post('/getNotification', check('swimmer_id').not().isEmpty(), (req, res) => {
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
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

//Details - set new notification
//require - all fields require except "HasBeenreaded", is false by default and coachmail field.
//return  - boolean, true/false
route.post('/setNotification', check('swimmer_id').not().isEmpty(), check('message').not().isEmpty(), check('priority').not().isEmpty(),
    check('coachmail').not().isEmpty(), check('date').not().isEmpty(),check('title').not().isEmpty(), (req, res) => {

    let swimmer_id = req.body.swimmer_id,
    message =  req.body.message,
    title =  req.body.title,
    coachmail =  req.body.coachmail,
    date =  req.body.date,
    coachId =  req.body.coachId,
    priority  =  req.body.priority;
    
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        notification.setNotification({"HasBeenreaded": false, "swimmer_id": swimmer_id,"title": title, "message": message, "coachmail": coachmail,
                                      "date": date, "coachId": coachId, "priority": priority }).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//Details - get swimmer notification only if is read notification
//require - swimmer_id
//return  - swimmer notification if "HasBeenreaded: true"
route.post('/readNotification', check('swimmer_id').not().isEmpty(), (req, res) => {
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        notification.readNotification(req.body.swimmer_id).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }   
});

//Details - get swimmer notification only if unread
//require - swimmer_id
//return  - swimmer notification if "HasBeenreaded: false"
route.post('/unreadNotification', check('swimmer_id').not().isEmpty(), (req, res) => {
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        notification.unreadNotification(req.body.swimmer_id).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//Details - update HasBeenreaded field to true
//require - notification_id
//return  - boolean, true/false
route.post('/updateNotification', check('notification_id').not().isEmpty(), (req, res) => {
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param)});
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

//Details - delete notification
//require - notification_id
//return  - boolean, true/false
route.post('/deleteNotification', check('notification_id').not().isEmpty(), (req, res) => {
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        notification.deleteNotification(req.body.notification_id).then((data) => {
            res.status(200).json({isTrue: true,  data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

module.exports = route