var mongojs = require('mongojs');
const dburl = "mongodb://localhost:8080"  //TODO: replace this with the real url
var db = mongojs(dburl);
var UserDB = mongojs.collection('users'); // contains both normal and investors

// username - string
// password - string
// callback - function(User)
exports.SearchUser = function(username, password, callback) {
  UserDB.findOne({
    'username': username,
    'password': password
  }, function(err, user) {
    if (err){
      console.log(err);
    }
    return callback(user);
  });
}

// username - string
// callback - function(exists)
exports.UsernameExists = function(username, callback) {
  //faster to user find as opposed to findOne?
  UserDB.find({
    'username': username,
  }, function(err, cursor) {
    if (!err && cursor)
      return callback(true);
    return callback(false);
  });
}

// user - User object
// isInvestor - boolean
// callback - function(successful)
exports.CreateUser = function(user, callback) {
  //note: if we create a specific _id for each user based on their
  // username and pass, then we can simplify this next part a bit
  // by just attempting an insert (which will fail if _id already exists).
  UsernameExists(user.username, function(exists) {
    if (exists) {
      return callback(false);
    } else {
      //Add the user to the database
      UserDB.insert(user)
      return callback(true);
    }
  });
}


exports.Query = function(query, callback) {

}


/*
function userToDoc(user, callback) {
  callback({
    'username': user.username,
    'password': user.password,
    'email': user.email,
    'first': user.firstname,
    'last': user.lastname,
    'industry': user.industry,
    'resume': user.resume,
    'sites': user.sites,
    'investor': false
  });
}
function invToDoc(user, callback) {
  callback({
    'username': user.username,
    'password': user.password,
    'email': user.email,
    'company': user.company,
    'sites': user.sites,
    'investor': true
  });
}
*/
