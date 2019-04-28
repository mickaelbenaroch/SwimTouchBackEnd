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

//get all team
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

                    resultNext[i].swimmers.splice(0, resultNext[i].swimmers.length, ...data);
                    temp++;
                    
                    if(resultNext.length === temp)
                        res(resultNext)
                    });
            });
        });    
    });
}


//get team by coach mail
exports.team = (coach) => {
    return new Promise(function(resolve, reject) {

        let team = db.get().collection('st-team');

        team.findOne({coachmail: coach}, (err, result) => {
            if(err || result === undefined)
                reject("error to get team")         
            resolve(result);
        });
    }).then(resultNext => {
        let swimmers = db.get().collection('st-swimmer');

        return new Promise((res, rej) => {
            swimmers.find({_id: {$in: resultNext.swimmers}}).toArray((error, data) => {
                
                if(error|| data == undefined) 
                    rej("error to get team")
            
                resultNext.swimmers.splice(0, resultNext.swimmers.length, ...data);
                res(resultNext)
            });
           
        });    
    });
}


//regular get traning (multi key)
exports.getSwimmerTeams = (obj_trainning) => {
    let team = db.get().collection('st-team');
    
    return new Promise(( res, rej) => {
        team.find({"swimmers": {$all: [ obj_trainning ] }}).toArray((err, result) => {
             console.log(result)
             console.log("sdsdsd")

            if(err || result === undefined || result.length == 0)
                rej("error to get Exercises")
            else
                res(result);  
           
        });
    });
}