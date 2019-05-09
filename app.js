/*************************/
//    swimtouch server   //
//       17/01/2019      //
/************************/
'use strict';

const log = require('./controllers/API/logger');
const {db, server, express, corss, logger} = require('./configuration/config'), 
app            = express.app,
db_model       = db.db_model,
bodyParser     = corss.bodyParser,
cors           = corss.cors_parser;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '50mb'}));

//enable cors
app.use(cors());

app.use(require('./controllers'));

db_model.connect(db.connection.uri, (err) => {
   if(err){
        console.log('Unable to connect to MongoDB.');
        //log.log_fatal(' Unable to connect to MongoDB. ');
        process.exit(1)
   }else{
        app.listen(server.port, () => {
            console.log(`app running on http://${server.host}:${server.port}`);
            //log.log_info(`app running on http://${config.server.host}:${config.server.port} `);
        });
   }
});

module.exports = app




