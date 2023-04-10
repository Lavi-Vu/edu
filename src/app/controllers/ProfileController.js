const Course = require('../models/Course');
const User = require('../models/User')
const { mongooseToObject } = require("../../util/mongoose");
class ProfileController {

    ShowProfile(req,res,next){
        User.findById({_id :req.user.id})
        .populate({
            path: 'list_course',
            
    
          })
        .then((data)=>{
            res.render('profile/indexProfile',{
                data:mongooseToObject(data)
            })
        })
        .catch(next)
    }
    // EditProfile(req,res,next){
    //     res.send("EDIT PROFILE")
    // }
}
module.exports = new ProfileController()