var mongojs = require('mongojs');
const dburl = "mongodb://localhost:27017"  //TODO: replace this with the real url
var db = mongojs(dburl);
var UserDB = db.collection('users'); // contains both normal and investors

// username: string
// password: string
// callback: function(user: User)
exports.SearchUser = function(username, password, callback) {
  UserDB.findOne({
    'username': username,
    'password': password
  }, function(err, user) {
    if (err){
      console.log(err);
      callback(null)
    }
    callback(user);
  });
}

// username: string
// callback: function(exists: boolean)
exports.UsernameExists = function(username, callback) {
  //faster to user find as opposed to findOne?
  UserDB.find({
    'username': username,
  }, function(err, cursor) {
    if (!err && cursor)
      callback(true);
    callback(false);
  });
}

// user: User object
// isInvestor: boolean
// callback: function(successful: boolean)
exports.CreateUser = function(user, callback) {
  //note: if we create a specific _id for each user based on their
  // username and pass, then we can simplify this next part a bit
  // by just attempting an insert (which will fail if _id already exists).
  UsernameExists(user.username, function(exists) {
    if (callback && exists) {
      callback(false);
    } else {
      //Add the user to the database
      UserDB.insert(user)
      if (callback) callback(true);
    }
  });
}

// username: string
// password: string
// callback: function(err: string)
//  err will be the empty string if there was no error
exports.DeleteUser = function(username, password, callback) {
  query = {
    'username': username,
    'password': password
  }

  UserDB.remove(query, function(err, numRemoved){
    if (!err) {
      if (numRemoved > 1)
        err = "Removed more than one user"
      if (numRemoved == 0)
        err = "No users removed"
    }
    if (err) console.log(err);
    if (callback) callback(err)
  })
}

// filter: map
// callback: function(document: DB Document)
//  The document for the callback should be a user object if you are searching
//  for a user. It may be other stuff if you are searching in the Online DBs
exports.Query = function(filter, callback) {
  query = {
    'username': filter['user'],
    'password': filter['pass'],
    'email': filter['email'],
    'first': filter['first'],
    'last': filter['last'],
    'industry': filter['industry'],
    'resume': filter['resume'],
    'links': filter['links'],
    'type': filter['type']
  }
  UserDB.find(query, callback);
}
