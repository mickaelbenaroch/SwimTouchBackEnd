'use strict';

var db = require('./db'); 

//create new team & is records document
exports.createTeam = (obj_team) => {
    return new Promise(( res, rej) => {
        let team = db.get().collection('st-team');
        let records = db.get().collection('records');
        
        team.insertOne(obj_team, (err, result) => {
            if(err)
                throw err;
            else{
                records.insertOne({_id: obj_team._id},(err, result) => {
                    if(err)
                        throw err;
                    else    
                        res(obj_team._id)
                });
            }
        });
    }).catch(error => {
        rej("create new team failed")
    });
}

