const mongoose = require('mongoose');
const config = require('../../config');

let _DB = null;

const initMongo = () => new Promise((res, rej) => {
  if (_DB != null) {
    return res(_DB);
  }
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
    _DB = con;
    return res(_DB);
  });
});

module.exports = {
  initMongo,
}
