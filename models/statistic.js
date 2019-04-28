'use strict';

let db = require('./db');  
let db_class = require('./testDbopp');

//get all swimmer records
exports.getStatisticByswimmer = (swimmer_ref) => {
    console.log(swimmer_ref)
    let db_table = db.get().collection('st-record');

    return new Promise(( res, rej) => {
        db_table.find({'swimmer.swimmer_id': swimmer_ref }).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get records")
            else
                res(result);
        });
    });
}

//get swimmer records by name and date range
exports.getStatisticByDate = (obj_records) => {
    let db_table = db.get().collection('st-record');

    return new Promise(( res, rej) => {
       try {
            if(obj_records.end_date == undefined)
                throw "end date is empty"

            db_table.find({date: {$gte: obj_records.start_date, $lte: obj_records.end_date},  'swimmer.swimmer_ref': obj_records.swimmer_ref }).toArray((err, result) =>{
                if(err || result === undefined || result.length == 0)
                    rej("error to get records")
                else
                    res(result);
            });   
       } catch (error) {
            db_table.find({date: obj_records.start_date,  'swimmer.swimmer_ref': obj_records.swimmer_ref}).toArray((err, result) =>{
                if(err || result === undefined || result.length == 0)
                    rej("error to get records")
                else
                    res(result);
            });
       }
    });
}

//get full swimmer records by name (with exercise & swimer details)
exports.getFullStatistic = (obj_records) => {
    const db_record = db.get().collection('st-record');
    const db_exercise = db.get().collection('st-exercise');
    const db_swimmer = db.get().collection('st-swimmer');

    return new Promise(( res, rej) => {
        //find all swimmer records
        db_record.find({'swimmer.swimmer_id': obj_records }).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get records")
            else
                res(result);
        });  
    }).then(result => {
        //then get swimmer profile
        return new Promise(( res, rej) => {
            db_swimmer.findOne({'_id': result[0].swimmer.swimmer_id }, (err, data) =>{
                if(err || data === undefined || data === null || data.length == 0)
                    return "error to get records" 
            
                result.forEach((element, i) => {
                    element.swimmer = data
                });

                res(result)
            });
        });

    }).then(async(result )=> {
        //then get swimmer exercise
        let exercise = []; 

        await db_exercise.find().forEach(element => {
            //all exercise
            exercise.push(element)
        });

        result.forEach((element, i) => {
            element.exercise_id = exercise.find(elem => {
                return element.exercise_id == elem._id
            })
        });
        return result
    }); 
}