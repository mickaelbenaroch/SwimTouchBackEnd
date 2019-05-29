'use strict';

let db = require('./db'); 

//Details - get user profile by email
exports.getProfile = (email) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('profile');
        
        profile.findOne({user: email}, (err, result) => {
            if(err || result === null)
                rej("profile not exist")
            else
                res(result);
        });
    });
}

//Details - get all profile by group type
exports.getGroup = (group) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('profile');
        
        profile.find({group: group}).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("profile group not found")
            else
                res(result);
        });
    });
}


//Details - get all profile by key object
exports.getProfile = (obj_profile) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('profile');

        profile.find(obj_profile).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get profiles")
            else
                res(result);
        });
    });
}

//Details - get all profiles
exports.getAllProfile = () => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('profile');

        profile.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get profiles")
            else
                res(result);
        });
    });
}

