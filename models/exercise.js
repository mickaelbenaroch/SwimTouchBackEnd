'use strict';

var db = require('./db'); 

//create new exercise 
exports.createExercise = (obj_exercise) => {
    return new Promise(( res, rej) => {
        let exercise = db.get().collection('st-exercise');
        let records = db.get().collection('records');
        
        exercise.insertOne(obj_exercise, (err, result) => {
            if(err)
                throw err; 
            else{
                records.insertOne({_id: obj_exercise._id},(err, result) => {
                    if(err)
                        throw err;
                    else    
                        res(obj_exercise._id)
                });
            }
        });
    }).catch(error => {
        rej("create new exercise faild")
    });
}

//regular get traning (multi key)
exports.getExercises = (obj_exercise) => {
    return new Promise(( res, rej) => {
        let exercise = db.get().collection('st-exercise');

        exercise.find(obj_exercise).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get Exercises")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get Exercises")
    });
}

