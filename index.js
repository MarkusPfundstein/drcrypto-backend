const process = require('process');
const { initMongo } = require('./src/libs/mongo');
const express = require('express');
const bodyParser = require('body-parser');

const userApi = require('./src/api/user');

// init all connections (mongo, influx, etc.)
async function init(config) {
  const db = await initMongo(config);
  const api = express();

  // load models
  require('./src/models/user');
  const UserModel = db.model('UserModel');

  const state = {
    models: {
      UserModel,
    },
    config,
    deps: {
      db,
    }
  }

  // load api's
  //api.use(bodyParser.urlencoded({ extended: true}))
  api.use(bodyParser.json())

  api.use('/user', userApi.init(state));

  await api.listen(config.api.port);


  // return global state of app
  return state;
}

init(require('./config'))
  .then((state) => {
    console.log(`server running on port ${state.config.api.port}`);  
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
