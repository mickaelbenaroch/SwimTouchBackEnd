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

//regular get profile (multi key)
exports.getTeams = (obj_profile) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('st-team');
        let swimmers_obj = db.get().collection('st-swimmer');
        profile.find(obj_profile).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get profiles")
            else{
                var temparray = [];
                result.forEach(res =>{
                    res.swimmers.forEach(swimmer => {
                        swimmers_obj.findOne({_id:swimmer}).then((obj) =>{
                            swimmer = obj.name;
                            temparray.push(obj.name);
                        })
                    });
                })
                setTimeout(()=>{
                      for(var i = 0; i<result.length;i++){
                          for(var j = 0; j < result[i].swimmers.length; j++){
                            result[i].swimmers[j] = temparray[j];
                          }
                        }
                    res(result); 
                },3000) 
            }
        });
        
    }).catch(error => {
        rej("error to get profiles")
    });
}

