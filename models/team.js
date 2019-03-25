'use strict';

var db = require('./db'); 

//create new team & is records document
exports.createTeam = (obj_team) => {
    return new Promise(( res, rej) => {
        let team = db.get().collection('st-team');
        
        team.insertOne(obj_team, (err, result) => {
            if(err)
                throw err;
            else{
                res(obj_team._id)
            }
        });
    }).catch(error => {
        rej("create new team failed")
    });
}

//regular get team (multi key)
exports.getTeams = (obj_team) => {
    return new Promise(( res, rej) => {

        let team = db.get().collection('st-team');
        let swimmers_obj = db.get().collection('st-swimmer');
        let result_obj = [];

        team.findOne(obj_team, (err, result) =>{

            if(err || result === undefined || result == null){
                res(result_obj);
            }
            
            else{
                result_obj.push({
                    _id:   result._id,
                    name: result.name,
                    coachmail: result.coachmail,
                    swimmers: []
                })
    
                swimmers_obj.find({_id: {$in: result.swimmers }}).toArray((error, data) => {
                    if(error)
                        rej("error to get team");
    
                    data.map((obj) => {
                        result_obj[0].swimmers.push({
                            _id: obj._id,
                            name: obj.name
                        })
                    });
                    res(result_obj)
                });
            }
        });
        
    }).catch(error => {
        rej("error to get team")
    });
}

