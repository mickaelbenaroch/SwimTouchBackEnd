'use strict';

let db = require('./db'); 
let ObjectID = require('mongodb').ObjectID;

//Details - get notification by swimmer_id
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

//Details - set new notification
exports.setNotification = (obj_notification) => {
    let notification = db.get().collection('st-notification');

    return new Promise(( res, rej) => {
        notification.insertOne(obj_notification, (err, result) => {
            if(err)
                rej("error in inserting notification ")
            else    
                res(true)
        });
    });
}

//Details - get swimmer notification only if is read notification
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

//Details - get swimmer notification only if unread
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

//Details - update HasBeenreaded field to true
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

//Details - delete notification
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