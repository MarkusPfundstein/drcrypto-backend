const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // somehow unique index doesn't get autocreated in the collection. 
  // please check in Robomongo
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  created_time: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deleted_time: { type: Date, default: null }
}, { collection: 'Users' });

module.exports = mongoose.model('UserModel', UserSchema);

//UserModel.on('index', (err) => err ? console.error(err) : console.log('index done'));

