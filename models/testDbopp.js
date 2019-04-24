var db = require('./db');  

class Db { 
    
    static get ex() { return db.get().collection('st-exercise'); }


    static find(db, query) {
        return new Promise(( res, rej) => {

            
            


        });
    }


}
  
module.exports = Db;