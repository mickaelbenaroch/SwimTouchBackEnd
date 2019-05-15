'use strict';

const db = require('./db'); 

//Details - insert new task
exports.insertTask = (email, message) => {
    let todo = db.get().collection('st-todo');

    return new Promise((res, rej) => {
         try {
            let uid  =  Math.random().toString(36).substr(2, 9);
            
            todo.updateOne({"email":email}, {$push: {todo: {[uid]: message}}} ,(err,result) => {
                if(err || result === undefined || result.length == 0)
                    rej("error to insert task");
                else
                    res(result)
            });
        }catch (error) {
            rej('error to insert task');
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