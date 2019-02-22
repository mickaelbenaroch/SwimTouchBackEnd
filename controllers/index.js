//load all controller 
'use strict';

var express = require('express'), router = express.Router();

router.use('/test', require('./test'))


module.exports = router