'use strict';

var db = require('./db'); 
const bcrypt = require('bcrypt');

//signup new user
exports.signup = (info, pwd) => {
    return new Promise(( res, rej) => {
        let reject = rej, response = res;
        
        let profile = db.get().collection('profile');
        let user = db.get().collection('users');

        bcrypt.hash(pwd, 10, (err, hash) => {
            if(err)
                reject("error to signup  user or email")
            user.insertOne({user: info.user, pwd: hash}, (err, result) => {
                if(err)
                    reject("error to signup user or ")
                else    
                    response(true)
            });

            profile.insertOne(info, (err, result) => {
                if(err)
                    reject("error to signup user or ")
                else    
                    response(true)
            })
        });
    });
}

//user login
exports.login = (email, password) => {
    return new Promise((res, rej) => {

        let user = db.get().collection('users');

        user.findOne({user:email}, (err, result) => {
            if(err || result === null || result === undefined)
                rej('Email or Password is incorrect');
            else{
                bcrypt.compare(password, result.pwd, (err, response) => {
                    if(err || response === false)
                        rej('Email or Password is incorrect');
                    else   
                        res(true);
                });
            }
        });   
    })

    
}

//user picture
exports.picture = (email, picture) => {
    return new Promise((res, rej) => {
        let profile = db.get().collection('profile');
         try {
            profile.updateOne({"user":email},{$set: {"picture": picture}},(suc,err) => {
                res(suc)
            });
        }catch (error) {
            rej('error on pic upload');
        }
    })
}