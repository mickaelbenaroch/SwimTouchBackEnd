'use strict';

var db = require('./db'); 

//create new exercise 
exports.createExercise = (obj_exercise) => {
    return new Promise(( res, rej) => {
        let exercise = db.get().collection('st-exercise');
        let records = db.get().collection('records');
        
        exercise.insertOne(obj_exercise, (err, result) => {
            if(err)
                rej("create new exercise faild")
            else{
                records.insertOne({_id: obj_exercise._id},(err, result) => {
                    if(err)
                        rej("create new exercise faild")
                    else    
                        res(obj_exercise._id)
                });
            }
        });
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
    });
}

//update exercise in db
exports.updateExercises = (obj_exercise) => {
    return new Promise(( res, rej) => {
        let exercise = db.get().collection('st-exercise');
        let trainning = db.get().collection('st-trainning');
        //update the exercise itself
        exercise.updateOne({"_id": obj_exercise.id}, {"$set": {"routes": obj_exercise.routes}}).then(response =>{
            //update the exercise into the trainnig 
            trainning.findOne({ "exercises.id": obj_exercise.id}).then(data =>{
                data.exercises.forEach(element => {
                   if(element.id == obj_exercise.id){
                       element.routes = obj_exercise.routes;
                       var trainning_id = data._id;
                       trainning.updateOne({"_id":trainning_id},{"$set":{"exercises": data.exercises}}).then(ress =>{
                           res(ress);
                       })
                   }
                });
            })
        });

    });
}

//get swimmer exercise 
exports.getSwimmerExercises = (obj_exercise) => {
    let exercise = db.get().collection('st-exercise');
    return new Promise(( res, rej) => {
        exercise.find({"routes.routes": {$elemMatch:{ swimmer_id: obj_exercise}}}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get Exercises")
            else
                res(result);
        });
    });
}

//update exercise 
exports.update = (id, obj_exercise) => {
    let exercise = db.get().collection('st-exercise');

    return new Promise(( res, rej) => {
        exercise.updateOne({_id: id}, {$set: obj_exercise}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update Exercises")
            else
                res(result);
        });
    });
}
