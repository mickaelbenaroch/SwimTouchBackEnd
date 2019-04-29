'use strict';

var db = require('./db'); 


//get swimmer exercise 
exports.getSwimmerMessage = (obj_notification) => {
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
