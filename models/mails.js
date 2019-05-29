'use strict';

let db = require('./db'); 
let ObjectID = require('mongodb').ObjectID;

//Details - get notification by swimmer_id
exports.getMails = (obj_notification) => {
    let notification = db.get().collection('st-mail');

    return new Promise(( res, rej) => {
        notification.find({receiver: obj_notification}).toArray((err, result) =>{
            if(result.length == 0)
                res(result);
            if(err || result === undefined)
                rej("error to get Mails")
            else
                res(result);
        });
    });
}

//Details - set new notification
exports.setMail = (obj_notification) => {
    let notification = db.get().collection('st-mail');
    return new Promise(( res, rej) => {
        notification.insertOne(obj_notification, (err, result) => {
            if(err)
                rej("error in inserting Mail ")
            else    
                res(true)
        });
    });
}