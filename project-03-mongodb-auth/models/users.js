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

let User = mongoose.model('User', UserSchema);

let createUser = function(newUser, callback) {
  newUser.save(callback);
}

export { User as default, createUser };
