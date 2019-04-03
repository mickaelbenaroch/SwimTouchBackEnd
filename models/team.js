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
exports.getTeams = () => {
    return new Promise(function(resolve, reject) {
        let team = db.get().collection('st-team');
    
        team.find({}).toArray((err, result) => {
            if(err || result === undefined || result.length == 0)
                reject("error to get team")         
            resolve(result);
        });
    }).then(resultNext => {
  
       let swimmers = db.get().collection('st-swimmer');
       let temp = 0;

        return new Promise((res, rej) => {
            resultNext.map((obj, i) => {
                swimmers.find({_id: {$in: obj.swimmers}}).toArray((error, data) => {
                    if(error)
                        rej("error to get team")

                    resultNext[i].swimmers.splice(0);  
                    resultNext[i].swimmers.push(data); 
                    temp++;
                    
                    if(resultNext.length === temp)
                        res(resultNext)
                    });
            });
        });    
    });
}

