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

//regular get traning (multi key)
exports.getTraining = (obj_training) => {
    return new Promise(( res, rej) => {
        let training = db.get().collection('training');

        training.find(obj_training).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get training")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get training")
    });
}

