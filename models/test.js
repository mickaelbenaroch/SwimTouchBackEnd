'use strict';

var db = require('./db'); 

//create user & save
exports.test = () => {
    return new Promise((res, rej) => {
        db.get().collection('test').find({}).toArray(function(err, arr){
            if(err)
                rej("error to get data")
            if(arr == undefined)
                rej("error to get data")

            res(arr[0]);
        });
    })
}
