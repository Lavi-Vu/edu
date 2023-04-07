// const jwt = require('jsonwebtoken')
// const User =  require("../app/models/User")

// const auth = async(req, res, next) => {
//     const authHeader = req.header('Authorization')
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       res.status(401).send({ error: 'Not authorized to access this resource' })
//       return
//     }
  
//     const token = authHeader.replace('Bearer ', '')
//     const data = jwt.verify(token, 'mk')
//     try {
//         const user = await User.findOne({ _id: data._id, 'tokens.token': token })
//         if (!user) {
//             throw new Error()
//         }
//         req.user = user
//         req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({ error: 'Not authorized to access this resource' })
//     }

// }
// module.exports = auth

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../app/models/User');
const config = require('../config/config')

passport.use(new FacebookStrategy({
    clientID: config.facebook_key,
    clientSecret:config.facebook_secret,
    callbackURL: config.callback_url,
    profileFields: ['id', 'displayName', 'email', 'photos'],
},
async(accessToken, refreshToken, profile, done) =>{
    try{
        let user = await User.findOne({ facebookId: profile.id });
        //If user not exist then save it
        if (!user){
            const newUser = new User({
                facebookId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: profile.emails[0].value,
                photoUrl: profile.photos[0].value
              });
            await newUser.save();
            done(null, newUser);
        }
        else{
            done(null, user);
        }
    }
    catch(err){
        done(err)
    }
    }
))
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
        done(err, user);
    });
});
module.exports = {
    facebookAuth: passport.authenticate('facebook', { scope: ['email'] }),

    facebookAuthCallback: passport.authenticate('facebook', {  successRedirect : '/',failureRedirect: '/login' }),

    // redirectToProfile: (req, res) => {
    //     // Successful authentication, redirect to profile page or perform other actions
    //     res.redirect('/profile');
    // }
};

    
    
