'use strict';

var db = require('./db'); 

//create new trainning & is records document
exports.createTrainning = (obj_trainning) => {
    return new Promise(( res, rej) => {
        let trainning = db.get().collection('st-trainning');
        let records = db.get().collection('records');
        
        trainning.insertOne(obj_trainning, (err, result) => {
            if(err)
                throw err;
            else{
                records.insertOne({_id: obj_trainning._id},(err, result) => {
                    if(err)
                        throw err;
                    else    
                        res(obj_trainning._id)
                });
            }
        });
    }).catch(error => {
        rej("create new trainning faild")
    });
}



