'use strict';

var db = require('./db'); 

//Details - create new swimmer target
exports.createSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');
        
        swimmertarget.insertOne(obj_swimmer_target, (err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("create new swimmer target failed")
            else{
               res(obj_swimmer_target._id)
            }
        });
    });
}

//Details - get swimmer target
exports.getSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');

        swimmertarget.find(obj_swimmer_target).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get swimmers target")
            else
                res(result);
        });
        
    });
}

//Details - create new team target
exports.createTeamTarget = (obj_team_target) => {
    return new Promise(( res, rej) => {
        let teamtarget = db.get().collection('st-team-target');
        
        teamtarget.insertOne(obj_team_target, (err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("create new swimmer target failed")
            else{
               res(obj_team_target._id)
            }
        });
    });
}

//Details - get team target
exports.getTeamTarget = (obj_team_target) => {
    return new Promise(( res, rej) => {
        let teamtarget = db.get().collection('st-team-target');

        teamtarget.find(obj_team_target).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get team target")
            else
                res(result);
        }); 
    });
}

//Details - update swimmer target
exports.updateSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');

        swimmertarget.updateOne({"_id":obj_swimmer_target._id},{"$set": {"done": obj_swimmer_target.done, "notification_has_been_send": obj_swimmer_target.notification_has_been_send}}).then((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update swimmer target")
            else
                res(result);
        });
    });
}

//Details - update team target
exports.updateTeamTarget = (obj_team_target) => {
    return new Promise(( res, rej) => {
        let teamtarget = db.get().collection('st-team-target');

        teamtarget.updateOne({"_id":obj_team_target._id},{"$set": {"done": obj_team_target.done, "notification_has_been_send": obj_team_target.notification_has_been_send}}).then((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update team target")
            else
                res(result);
        });
    });
}