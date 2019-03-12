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

         trainning.find({coachmail:obj_trainning.coachmail}).toArray().then( items => {
          items.forEach((item)=>{
              let temp = {
                  coachmail: item.coachmail,
                  exercises: item.exercises,
                  name: item.name,
                  team_id: item.team_id,
                  _id: item._id
              };
            //במקום כל החרא הזה, שמרתי את כל התרגיל כולו לתוך אימון בדאטה בייז ככה לא צריך לולאות
            //   item.exercises.forEach(ex => {
            //       exercise.findOne({_id: ex}).then((data)=>{
            //           temp.exercises.push(data);
            //       })
            // });
            result_obj.push(temp);
          })
            res(result_obj)
        })
        
    }).catch(error => {
        rej("error to get exercises")
    });
    
}
