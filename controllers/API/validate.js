'use strict';
const config = require('../../configuration/config'),
{ check, validationResult } = require('express-validator/check');


/* the class not working right now  */
class Validate {

    //chack for empty request
    static * valid_chack( req_body ){ 
        let result=  validationResult(check([req_body, "empty"]).isEmpty())
        console.log(result.isEmpty())
        
        let validate_array = result.array();

        if (!result.isEmpty()) {
            yield false;
            yield validate_array;
        }else{
            return true;
        }
    }
}
  
module.exports = Validate;