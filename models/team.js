'use strict';

let db = require('./db'); 

//Details - create new team
exports.createTeam = (obj_team) => {
    return new Promise(( res, rej) => {
        let team = db.get().collection('st-team');
        
        team.insertOne(obj_team, (err, result) => {
            if(err)
                rej("create new team failed")
            else{
                res(obj_team._id)
            }
        });
    });
}

//Details - get all team
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

//Details - get team by coach mail
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


//Details - get swimmer team 
exports.getSwimmerTeams = (obj_trainning) => {
    let team = db.get().collection('st-team');
    
    return new Promise(( res, rej) => {
        team.find({"swimmers": {$all: [ obj_trainning ] }}).toArray((err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to get Exercises")
            else
                res(result);  
           
        });
    });
}

//Details - get team by team_id  
exports.getTeamById = (obj_trainning) => {
    let team = db.get().collection('st-team');
    console.log(obj_trainning)
    return new Promise(( res, rej) => {
        team.find({"_id": obj_trainning.team_id}).toArray((err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to get team")
            else
                res(result);  
           
        });
    });
}

//Details - add new swimmer to team  
exports.addSwimmerTeams = (obj_team) => {
    let team = db.get().collection('st-team');
    
    return new Promise(( res, rej) => {
        team.updateOne({_id: obj_team.team}, {$addToSet: {swimmers: obj_team.swimmer}}, (err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to add swimmer")
            else
                res(result);  
        });
    });
}

//Details - delete swimmer from team
exports.deleteSwimmerTeams = (obj_team) => {
    let team = db.get().collection('st-team');
    
    return new Promise(( res, rej) => {
        team.updateOne({_id: obj_team.team}, {$pull: {swimmers: obj_team.swimmer}}, (err, result) => {
            if(err || result === undefined || result.length == 0)
                rej("error to add swimmer")
            else
                res(result);  
        });
    });
}