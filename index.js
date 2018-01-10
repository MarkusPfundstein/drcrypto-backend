const process = require('process');
const { initMongo } = require('./src/libs/mongo');

// init all connections (mongo, influx, etc.)
async function init() {
  const db = await initMongo();

  // load models
  require('./src/models/user');
  const UserModel = db.model('UserModel');

  return {
    db,
    UserModel,
  }
}

init()
  .then(({ UserModel }) => {
    console.log('server running');  
    const me = new UserModel({email:'iota@sucks.com', password: '1234'});
    return me.save();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
