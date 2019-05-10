'use strict';

let db = require('./db'); 
const bcrypt = require('bcrypt');
const log = require('../controllers/API/logger');

//Details - signup new user
exports.signup = (info, pwd) => {
    return new Promise(( res, rej) => {
        let reject = rej, response = res;
        
        let profile = db.get().collection('profile');
        let user = db.get().collection('users');

        bcrypt.hash(pwd, 10, (err, hash) => {
            if(err){
                //log.log_error(`Signup new user - ${info.user} `);
                reject("error to signup  user or email")
            }
                
            user.insertOne({user: info.user, pwd: hash}, (err, result) => {
                if(err){
                    //log.log_error(`Signup new user - ${info.user} `);
                    reject("error to signup user or ")
                }
                else{
                    //log.log_info(`New User is Signup: '${info.user}' (Insert to users db) `);
                    response(true)
                }
            });

            profile.insertOne(info, (err, result) => {
                if(err){
                    //log.log_error(`Signup new user - ${info.user} `);
                    reject("error to signup user or ")
                }
                else{
                    //log.log_info(`New User is Signup: '${info.user}' (Insert to profile db) `);
                    response(true)
                }    
            })
        });
    });
}

//Details - check user and password for user login
exports.login = (email, password) => {
    return new Promise((res, rej) => {

        let user = db.get().collection('users');

        user.findOne({user: email}, (err, result) => {
            if(err || result === null || result === undefined){
                log.log_error(`'${email}' Failed to Login, Email or Password is incorrect `);
                rej('Email or Password is incorrect');
            }
                
            else{
                bcrypt.compare(password, result.pwd, (err, response) => {
                    if(err || response === false){
                        //log.log_error(`'${email}' Failed to Login, Email or Password is incorrect `);
                        rej('Email or Password is incorrect');
                    }
                    else{   
                        //log.log_info(`'${email}' Login to SwimTouch `);
                        res(true);
                    }
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
                //log.log_info(`'${email}' - Upload new picture `);
                res(suc)
            });
        }catch (error) {
            //log.log_error(`'${email}' - Upload picture failed `);
            rej('error on pic upload');
        }
    })
}