const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to local Mongo server');

          const db = client.db(dbName);
          const col = db.collection('users');

          const user = await col.findOne({ username });

          debug(`User: ${user}`);
          if (user === null) {
            // user was not found - return validation failed
            done(null, false);
          }
          if (user.password === password) {
            // user was found and password matched
            done(null, user);
          } else {
            // password was not found - return validation failed
            done(null, false);
          }
        } catch (err) {
          console.log(err.stack);
        }
        // Close connection
        client.close();
      }());
    }
  ));
};
