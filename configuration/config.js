//validate
const { check, validationResult } = require('express-validator/check')

module.exports = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3030
    },
    db: {
      client:   'MongoDB',
      db_model:  require('../models/db'),
      connection: {
        uri:      'mongodb+srv://swimtouch:shenkar_4@cluster0-pjpqt.mongodb.net/swimtouch?retryWrites=true',
        database: 'swimtouch',
      }
    },
    corss: {
      bodyParser:   require('body-parser'),
      cors_parser:  require('cors')
    },
    logger: {
      logDirectory:       './logs',
      fileNamePattern:    'roll-<DATE>.log',
      dateFormat:         'YYYY.MM.DD',
      validation_Result:  validationResult,
      check_body:         check,
    }
  };