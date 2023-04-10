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
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../app/models/User');
const config = require('../config/config')
const bcrypt = require('bcrypt');

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
//Test passport local
passport.use(new LocalStrategy({
    // Thiết lập các trường đăng nhập (VD: tên trường username, password)
    usernameField: 'email', // Tên trường email trong form đăng nhập
    passwordField: 'password', // Tên trường password trong form đăng nhập
  }, async (email, password, done) => {
    try {
      // Thực hiện logic xác thực đăng nhập
      // Ví dụ: tìm kiếm user trong MongoDB dựa trên email
      const user = await User.findOne({ email });
  
      // Kiểm tra xem user có tồn tại hay không
      if (!user) {
        return done(null, false, { message: 'Email không tồn tại' });
      }
  
      // Kiểm tra xem password có đúng hay không sử dụng bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Mật khẩu không chính xác' });
      }
  
      // Nếu xác thực thành công, trả về user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
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

    facebookAuthCallback: passport.authenticate('facebook', {  successRedirect : 'back',failureRedirect: '/login' }),
    localAuth : passport.authenticate('local', {
        successRedirect: '/', // Đường dẫn khi đăng nhập thành công
        failureRedirect: '/login', // Đường dẫn khi đăng nhập thất bại
        
      })
    // redirectToProfile: (req, res) => {
    //     // Successful authentication, redirect to profile page or perform other actions
    //     res.redirect('/profile');
    // }
};

    
    
