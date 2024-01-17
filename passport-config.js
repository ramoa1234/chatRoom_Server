const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail) { 
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'No user found' });
        } else {
            // Validate the password here
            // You can use a library like bcrypt to compare the hashed password
            // with the provided password

            // For example:
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
        // Fetch the user from the database using the id
        // For example:
        const user = getUserById(id);
        done(null, user);
    });
}
    const user = authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null) {
            return done(null, false, { message: 'No user found'})
        }
    else {

        }
    }
        
