'use strict';


var db = require('./db'); 
var ObjectID = require('mongodb').ObjectID;

//get swimmer notification 
exports.getNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');


    return new Promise(( res, rej) => {
        notification.find({swimmer_id: obj_notification}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get Notification")
            else
                res(result);
        });
    });
}

//set swimmer notification 
exports.setNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');

    return new Promise(( res, rej) => {
        notification.insertOne(obj_notification, (err, result) => {
            if(err)
                rej("error in inserting notification ")
            else    
                res(true)
    })
    });
}

//get read notification by swimmer id 
exports.readNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');

    return new Promise(( res, rej) => {
        notification.find({swimmer_id: obj_notification, HasBeenreaded: {$eq: true}}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get read Notification")
            else
                res(result);
        });
    });
}

//get unread notification by swimmer id 
exports.unreadNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');

    return new Promise(( res, rej) => {
        notification.find({swimmer_id: obj_notification, HasBeenreaded: {$eq: false}}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get read Notification")
            else
                res(result);
        });
    });
}

//update notification 
exports.updateNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');

    return new Promise(( res, rej) => {
        notification.updateOne({_id: ObjectID(obj_notification)}, {$set: {HasBeenreaded: true}}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update Notification")
            else
                res("update Notification as read");
        });    
    });
}

//delete notification 
exports.deleteNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');

    return new Promise(( res, rej) => {
        notification.deleteOne({_id: ObjectID(obj_notification)}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to delete Notification")
            else
                res("delete Notification as success");
        });    
    });
}