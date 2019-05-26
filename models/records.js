'use strict';

let db = require('./db'); 

//Details - set new records
exports.setRecords = (records) => {
    return new Promise(( res, rej) => {
        let reject = rej, response = res;
        let record = db.get().collection('st-record');

        record.insertOne(records, (err, result) => {
                if(err)
                    reject("error in inserting records ")
                else    
                    response(true)
        })
    });
}

//Details - set new records
exports.getRecords = (records) => {
    return new Promise(( res, rej) => {
        let record = db.get().collection('st-record');

        record.find({exercise_id: records.exercise_id}).toArray((err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to get records")
            else
                res(result);
        });   
    });
}

//Details - chack if swimmer and exercise is in record
exports.chackRecords = (exercise_id, swimmer_id) => {
    let record = db.get().collection('st-record');

    return new Promise(( res, rej) => {
        record.find({$and: [{"exercise_id":exercise_id}, {"swimmer.swimmer_id": swimmer_id} ] }).toArray((err, result) => {
                console.log(result)
                if(err || result === undefined || result === null || result.length == 0)
                    rej("error in get records ")
                else    
                    res(result)
        })
    });
}


