'use strict';

var db = require('./db'); 

//create new swimmer & is records document
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

//regular get traning (multi key)
exports.getSwimmers = (obj_swimmer) => {
    return new Promise(( res, rej) => {
        let swimmer = db.get().collection('st-swimmer');

        swimmer.find(obj_swimmer).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get swimmers")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get swimmers")
    });
}

