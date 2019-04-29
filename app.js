/*************************/
//    swimtouch server   //
//       17/01/2019      //
/************************/
'use strict';

const express = require('express'), 
app = express(),
db = require('./models/db'),
bodyParser = require('body-parser'),
cors = require('cors'),
config = require('./configuration/config'),
log = require('./controllers/API/logger');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '50mb'}));

//enable cors
app.use(cors());

app.use(require('./controllers'));

db.connect(config.db.connection.uri, (err) => {
   if(err){
        console.log('Unable to connect to MongoDB.');
        //log.log_fatal(' Unable to connect to MongoDB. ');
        process.exit(1)
   }else{
        app.listen(config.server.port, () => {
            console.log(`app running on http://${config.server.host}:${config.server.port}`);
            //log.log_info(`app running on http://${config.server.host}:${config.server.port} `);
        });
   }
});

module.exports = app




