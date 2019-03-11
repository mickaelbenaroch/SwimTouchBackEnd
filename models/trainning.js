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
        let swimmers_obj = db.get().collection('st-swimmer');
        let exercise = db.get().collection('st-exercise');
        let result_obj = [];

        trainning.findOne(obj_trainning, (err, result) =>{

            if(err || result === undefined || result.length == 0)
                rej("error to get team");
            
            result_obj.push({
                _id:   result._id,
                name: result.name,
                coachmail: result.coachmail,
                exercises: [],
                team_id: result.team_id,
            })

            exercise.find({_id: {$in: result.exercises }}).toArray((error, data) => {
                if(error)
                    rej("error to get team");

                data.map((obj) => {
                    result_obj[0].exercises.push({
                        _id: obj._id,
                        date: obj.date,
                        coach: obj.coach,
                        group: obj.group,
                        style: obj.style,
                        distance: obj.distance,
                        howMuchTouches: obj.howMuchTouches,
                        routes: obj.routes
                    })
                });
                res(result_obj)
            });
        });
        
    }).catch(error => {
        rej("error to get exercises")
    });
}
