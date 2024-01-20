const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail) { 
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'No user found' });
        } else {
            if (user.password === password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        }
    };

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {    
        return done(null, getUserById(id))  
    })
}
module.exports = initialize;
