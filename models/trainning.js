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


//regular get traning (multi key)
exports.getTrainnings = (obj_trainning) => {
    return new Promise(( res, rej) => {
        let trainning = db.get().collection('st-trainning');

        trainning.find(obj_trainning).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get trainnings")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get trainnings")
    });
}
