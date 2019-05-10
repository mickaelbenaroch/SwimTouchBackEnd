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


