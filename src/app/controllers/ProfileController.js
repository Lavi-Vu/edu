const Course = require('../models/Course');
const User = require('../models/User')

class ProfileController {

    ShowProfile(req,res,next){
        User.findById({_id :req.user.id})
        .then((data)=>{
            console.log(data)
        })
        .catch(next)
    }
    EditProfile(req,res,next){
        res.send("EDIT PROFILE")
    }
}
module.exports = new ProfileController()