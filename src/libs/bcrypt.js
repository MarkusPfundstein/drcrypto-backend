//from: https://stackoverflow.com/a/14015883

const bcrypt = require('bcrypt');

const cryptPassword = password => new Promise((res, rej) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return rej(err);
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return rej(err);
      }
      return res(hash);
    });
  });
});

const comparePassword = (plainPass, hashword, callback) => {
  bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
    return err == null ?
      callback(null, isPasswordMatch) :
      callback(err);
  });
};

module.exports = {
  cryptPassword,
  comparePassword,
}
