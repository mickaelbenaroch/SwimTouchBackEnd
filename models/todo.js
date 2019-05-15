'use strict';

const db     = require('./db'); 
const bcrypt = require('bcrypt');


//Details - insert new task
exports.insertTask = (email, message) => {
    let todo = db.get().collection('st-todo');

    return new Promise((res, rej) => {
         try {
            todo.updateOne({"user":email},{$set: {"picture": picture}},(suc,err) => {
                res(suc)
            });
        }catch (error) {
            rej('error on pic upload');
        }
    })
}

//Details - get task
exports.getTask = (email) => {
    let todo = db.get().collection('st-todo');

    return new Promise((res, rej) => {
         try {
            todo.findOne({"email": email}, (err, result) => {
                if(err || result === undefined || result.length == 0)
                    rej("error to get task");
                else
                    res(result)
            });
        }catch (error) {
            rej('error to get task');
        }
    })
}