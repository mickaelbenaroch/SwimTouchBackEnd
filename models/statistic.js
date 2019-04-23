'use strict';

var db = require('./db'); 

//get all swimmer records
exports.getStatisticByswimmer = (swimmer_ref) => {
    console.log(swimmer_ref)
    let db_table = db.get().collection('st-record');

    return new Promise(( res, rej) => {
        db_table.find({'swimmer.swimmer_ref': swimmer_ref }).toArray((err, result) =>{
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

//get full swimmer records (with exercise 7 swimer details)
exports.getFullStatistic = (obj_records) => {
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




