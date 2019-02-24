var db = require('./db'); 

//get user profile
exports.getProfile = (email) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('profile');
        
        profile.findOne({user: email}, (err, result) => {
            if(err || result === null)
                rej("profile not exist")

            res(result);
        });
    });
}

//get all profile by group
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