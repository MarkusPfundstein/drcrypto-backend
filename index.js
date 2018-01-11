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

  const context = {
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

  api.use('/user', userApi.init(context));

  await api.listen(config.api.port);

  return context;
}

init(require('./config'))
  .then((context) => {
    console.log(`server running on port ${context.config.api.port}`);  
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
