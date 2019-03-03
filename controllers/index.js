//load all controller 
'use strict';

var express = require('express'), router = express.Router();

router.use('/login', require('./login'))
router.use('/profile', require('./profile'))
router.use('/training', require('./training'))



module.exports = router