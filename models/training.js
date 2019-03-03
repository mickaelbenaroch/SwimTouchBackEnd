'use strict';

var db = require('./db'); 

//create new training & is records document
exports.createTraining = (obj_training) => {
    return new Promise(( res, rej) => {
        let training = db.get().collection('training');
        let records = db.get().collection('records');
        
        training.insertOne(obj_training, (err, result) => {
            if(err)
                throw err;
            else{
                records.insertOne({_id: obj_training._id},(err, result) => {
                    if(err)
                        throw err;
                    else    
                        res(obj_training._id)
                });
            }
        });
    }).catch(error => {
        rej("create new training faild")
    });
}

