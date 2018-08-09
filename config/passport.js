const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
const bcrypt        = require('bcryptjs');

module.exports = function (passport) {              // <-- THIS IS EQUIVALENT TO PUTTING MODULE.EXPORTS = PASSPORT,
  passport.use(new LocalStrategy(                   //     AND MAKING THIS "FUNCTION PASSPORT() = { ... }"

    {usernameField: 'email'},                           // <-- THIS NEEDED TO BE CHANGED TO ACCOUNT IN PASSPORT
    (email, password, next) => {                        //     LOCAL STRATEGY FOR USING EMAIL INSTEAD OF USERNAME
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }
      if (!foundUser) {
        next(null, false, { message: 'Incorrect email' });
        return;
      }
      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password' });
        return;
      }
      next(null, foundUser);
    });
  }));
  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });
  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, userDocument);
    });
  });
};