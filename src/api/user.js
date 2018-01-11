const express = require('express');
const { checkBodyArgs, P, } = require('../libs/api');
const { cryptPassword, comparePassword, } = require('../libs/bcrypt');

async function handlePostUser(req, state) {

  const oldUser = await state.models.UserModel.findOne({ email: req.body.email });
  if (oldUser != null) {
    return 'user exists already';
  }

  const encryptedPassword = await cryptPassword(req.body.password);

  console.log(encryptedPassword);

  return {
  }

}

const init = (state) => {

  const router = express();

  router.post('/', checkBodyArgs(['email', 'password']), P((req, _) => handlePostUser(req, state)));

  return router;
}

module.exports = {
  init,
}
