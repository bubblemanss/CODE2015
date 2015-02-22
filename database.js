var mongojs = require('mongojs');
const dburl = "mongodb://localhost:8080"  //TODO: replace this with the real url
var db = mongojs(dburl);
var UserDB = mongojs.collection('users'); // contains both normal and investors

// username - string
// password - string
// callback - function(User, err)
exports.SearchUser = function(username, password, callback) {
  UserDB.findOne({
    'username': username,
    'password': password
  }, function(err, document) {
    if (err) {
      console.log(err);
      callback(null, err);
    }
    //TODO: create user using document
    callback(user, null);
  });
}

// username - string
// callback - function(User, err)
exports.UsernameExists = function(username, callback) {
  UserDB.findOne({
    'username': username,
  }, function(err, document) {
    if (err) {
      console.log(err);
      callback(false, err);
    }
    callback((document ? true : false), null);
  });
}

// user - User object
// isInvestor - boolean
// callback - function(successful)
exports.CreateUser = function(user, isInvestor, callback) {
  //note: if we create a specific _id for each user based on their
  // username and pass, then we can simplify this next part a bit
  // by just attempting an insert (which will fail if _id already exists).

  UsernameExists(user.username, function(exists, err) {
    if (exists) {
      callback(false);
    } else {
      //Add the user to the database
      if (!isInvestor) {
        userToDoc(user, function(doc) {
          UserDB.insert(doc)
        };
      } else {
        invToDoc(user, function(doc) {
          UserDB.insert(doc);
        })
      }
      callback(true);
    }
  });
}



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
