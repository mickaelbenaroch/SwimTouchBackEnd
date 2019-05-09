'use strict';
const config = require('../../configuration/config'),
{ check, validationResult } = require('express-validator/check');

class Validate {

    //chack for empty request
    static * valid_chack( req_body ){ 
        let result=  validationResult(req_body)
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