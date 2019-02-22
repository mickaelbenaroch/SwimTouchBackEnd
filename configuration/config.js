module.exports = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3030
    },
    db: {
      client: 'MongoDB',
      connection: {
        uri: 'mongodb+srv://swimtouch:shenkar_4@cluster0-pjpqt.mongodb.net/swimtouch?retryWrites=true',
        database: 'swimtouch',
      }
    },
  };