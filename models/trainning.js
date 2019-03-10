'use strict';

var db = require('./db'); 

//create new trainning & is records document
exports.createTrainning = (obj_trainning) => {
    return new Promise(( res, rej) => {
        let trainning = db.get().collection('st-trainning');
        let records = db.get().collection('records');
        
        trainning.insertOne(obj_trainning, (err, result) => {
            if(err)
                throw err;
            else{
                records.insertOne({_id: obj_trainning._id},(err, result) => {
                    if(err)
                        throw err;
                    else    
                        res(obj_trainning._id)
                });
            }
        });
    }).catch(error => {
        rej("create new trainning faild")
    });
}


//regular get traning (multi key)
exports.getTrainnings = (obj_trainning) => {
    return new Promise(( res, rej) => {

        let trainning = db.get().collection('st-trainning');
        let swimmers_obj = db.get().collection('st-swimmer');
        
        trainning.find(obj_trainning).toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
            rej("error to get trainnings")
            else{
                var temparray = [];
                result.forEach(res =>{
                    res.team_id.swimmers.forEach(swimmer => {
                        swimmers_obj.findOne({_id:swimmer}).then((obj) =>{
                            swimmer = obj.name;
                            temparray.push(obj.name);
                        })
                    });
                })
                setTimeout(()=>{
                      for(var i = 0; i<result.length;i++){
                          for(var j = 0; j < result[i].team_id.swimmers.length; j++){
                            result[i].team_id.swimmers[j] = temparray[j];
                          }
                        }
                    res(result); 
                },3000) 
            }
        });
        
    }).catch(error => {
        rej("error to get trainnings")
    });
}
