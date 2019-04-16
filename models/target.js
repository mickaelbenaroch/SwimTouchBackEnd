'use strict';

var db = require('./db'); 

//create new swimmer & is records document
exports.createSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');
        
        swimmertarget.insertOne(obj_swimmer_target, (err, result) => {
            if(err)
                throw err;
            else{
               res(obj_swimmer_target._id)
            }
        });
    }).catch(error => {
        rej("create new swimmer target failed")
    });
}

//regular get swimmer (filter)
exports.getSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');

        swimmertarget.find(obj_swimmer_target).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get swimmers target")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get swimmers target")
    });
}

