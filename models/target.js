'use strict';

var db = require('./db'); 

//create new swimmer & is records document
exports.createSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');
        
        swimmertarget.insertOne(obj_swimmer_target, (err, result) => {
            if(err)
                throw err;
            else{
               res(obj_swimmer_target._id)
            }
        });
    }).catch(error => {
        rej("create new swimmer target failed")
    });
}

//regular get team target (filter)
exports.getSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');

        swimmertarget.find(obj_swimmer_target).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get swimmers target")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get swimmers target")
    });
}

//create new team target
exports.createTeamTarget = (obj_team_target) => {
    return new Promise(( res, rej) => {
        let teamtarget = db.get().collection('st-team-target');
        
        teamtarget.insertOne(obj_team_target, (err, result) => {
            if(err)
                throw err;
            else{
               res(obj_team_target._id)
            }
        });
    }).catch(error => {
        rej("create new swimmer target failed")
    });
}

//regular get swimmer (filter)
exports.getTeamTarget = (obj_team_target) => {
    return new Promise(( res, rej) => {
        let teamtarget = db.get().collection('st-team-target');

        teamtarget.find(obj_team_target).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get swimmers target")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get swimmers target")
    });
}

//regular update swimmer target (filter)
exports.updateSwimmerTarget = (obj_swimmer_target) => {
    return new Promise(( res, rej) => {
        let swimmertarget = db.get().collection('st-swimmer-target');

        swimmertarget.updateOne({"_id":obj_swimmer_target._id},{"$set": {"done": obj_swimmer_target.done, "notification_has_been_send": obj_swimmer_target.notification_has_been_send}}).then((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update swimmer target")
            else
                res(result);
        });
        
    }).catch(error => {
        rej("error to get swimmers target")
    });
}

//regular update team target (filter)
exports.updateTeamTarget = (obj_team_target) => {
    return new Promise(( res, rej) => {
        let teamtarget = db.get().collection('st-team-target');

        teamtarget.updateOne({"_id":obj_team_target._id},{"$set": {"done": obj_team_target.done, "notification_has_been_send": obj_team_target.notification_has_been_send}}).then((err, result) =>{
            if(err || result === undefined || result.length == 0)
                        rej("error to update team target")
                    else
                        res(result);
                });
        
    }).catch(error => {
        rej("error to get swimmers target")
    });
}