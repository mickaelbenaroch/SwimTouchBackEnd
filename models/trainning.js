'use strict';

let db = require('./db'); 

//Details - create new trainning & is records document
exports.createTrainning = (obj_trainning) => {
    return new Promise(( res, rej) => {
        let trainning = db.get().collection('st-trainning');
        let records = db.get().collection('records');
        
        trainning.insertOne(obj_trainning, (err, result) => {
            if(err)
                rej("create new trainning faild")
            else{
                records.insertOne({_id: obj_trainning._id},(err, result) => {
                    if(err)
                        rej("create new trainning faild")
                    else    
                        res(obj_trainning._id)
                });
            }
        });
    })
}

//Details - get training 
exports.getTrainnings = (obj_trainning) => {
    return new Promise(( res, rej) => {
        let trainning = db.get().collection('st-trainning');
         trainning.find({coachmail:obj_trainning.coachmail}).toArray().then( items => {
           res(items)
        })
        
    }).catch(error => {
        rej("error to get exercises")
    }); 
}

//Details - get swimmer trainning 
exports.getSwimmerTrainnings = (obj_trainning) => {
    let trainning = db.get().collection('st-trainning');
    
    return new Promise(( res, rej) => {
         trainning.find({"team_id.swimmers": { $elemMatch: {_id: obj_trainning}}}).toArray((err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to get Exercises")
            else
                res(result);  
           
        });
    });
}

//Details   - update trainning
exports.updateTrainnings = (obj, trainning_id) => {
    let trainning = db.get().collection('st-trainning');
    
    return new Promise(( res, rej) => {
         trainning.updateOne({_id: trainning_id}, {$set: obj }, ((err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to update trainning")
            else
                res(result);  
        }));
    });
}
