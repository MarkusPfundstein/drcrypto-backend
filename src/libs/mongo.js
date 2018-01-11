const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const initMongo = (config) => new Promise((res, rej) => {
  const host = config.mongo.host || 'localhost';
  const port = config.mongo.port || 27017;
  const database = config.mongo.database;
  if (!database) {
    return rej(new Error('no database provided'));
  }

  const opts = { 
    server: { 
      auto_reconnect: true
    }, 
    user: config.mongo.user || '', 
    pass: config.mongo.password || '',
  };

  if (config.mongo.debug === true) {
    mongoose.set('debug', true);
  }

  const con = mongoose.createConnection(host, database, port, opts);  
  con.once('open', _ => {
    return res(con);
  });
});

module.exports = {
  initMongo,
}
