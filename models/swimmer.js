'use strict';

let db = require('./db'); 

//Details - create new swimmer & is records document
exports.createSwimmer = (obj_swimmer) => {
    return new Promise(( res, rej) => {
        let swimmer = db.get().collection('st-swimmer');
        let records = db.get().collection('records');
        
        swimmer.insertOne(obj_swimmer, (err, result) => {
            if(err)
                throw err;
            else{
               res(obj_swimmer._id)
            }
        });
    }).catch(error => {
        rej("create new swimmer failed")
    });
}

//Details - get swimmer
exports.getSwimmers = (obj_swimmer) => {
    let swimmer = db.get().collection('st-swimmer');

    return new Promise(( res, rej) => {
        swimmer.find(obj_swimmer).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get swimmers")
            else
                res(result);
        });
        
    })
}

//Details - update swimmer
exports.updateSwimmers = (id ,obj_swimmer) => {
    let swimmer = db.get().collection('st-swimmer');

    return new Promise(( res, rej) => {
        swimmer.updateOne({_id: id}, {$set: obj_swimmer}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update swimmers")
            else
                res(result);
        });
    });
}

