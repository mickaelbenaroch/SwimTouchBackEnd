'use strict';

let db = require('./db'); 

//Details - create new exercise
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

//Details - get exercises
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

//Details - update exercises
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
                       let trainning_id = data._id;
                       trainning.updateOne({"_id":trainning_id},{"$set":{"exercises": data.exercises}}).then(ress =>{
                           res(ress);
                       })
                   }
                });
            })
        });

    });
}

//Details - get swimmer exercises 
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

//Details - update exercises in exercise_db & traininig_db
exports.update = (obj_exercise, obj_training, obj) => {
    let exercise = db.get().collection('st-exercise');
    let trainning = db.get().collection('st-trainning');

    return new Promise(( res, rej) => {
        exercise.updateOne({_id: obj_exercise}, {$set: obj}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update Exercises")
            else
                res(result);
        });
    }).then((data)=>{
        return new Promise(( res, rej) => {
            trainning.find({_id: obj_training}).toArray((err, result) =>{

                const objIndex = result[0].exercises.find( obj => obj.id === obj_exercise );

                if(objIndex === undefined)
                    rej("exercise not found")

                Object.assign(objIndex, obj)
                
                if(err || result === undefined || result.length == 0)
                    rej("error to update training")
                else
                    res(result[0].exercises);
            });
        });
    }).then( resualt => {
        trainning.updateOne({_id: obj_training}, { $set: {'exercises': resualt }}) ,((error, data)=> {
            if(error || data === undefined || data.length == 0)
                rej("error to update training")
            else
                return data;
        });
    });
}
