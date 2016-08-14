import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/localdb', {user: 'emguy', pass: '314159'});

let db = mongoose.connection;

let UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String 
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileimage: {
    type: String
  }
});

let User = mongoose.model('user', UserSchema);

let createUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    })
  });
}

let getUserById = function(id, callback) {
  User.findById(id, callback);
}

let getUserByUsername = function(username, callback) {
  let query = {username: username};
  User.findOne(query, callback);
}

let comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    callback(null, isMatch);
  });
}

export { User as default, createUser, getUserByUsername, getUserById, comparePassword };

