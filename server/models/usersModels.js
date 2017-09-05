const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String},
  lastName: {type: String},
  city: {type: String},
  state: {type: String},
  zipcode: {type: String}
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id || '',
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    city: this.city || '',
    state: this.state|| '',
    zipcode: this.zipcode || ''

  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};
