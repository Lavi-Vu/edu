const Course = require("../models/Course")
const author = require("../models/author");
const lecture = require("../models/lecture")
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/User")
const mongoose = require('mongoose')
const { NodeVM } = require('vm2');
class testController {
    // async addCourse(req,res,next){
    //     const course = new Course(req.body);
    //     try{
            
    //      await res.json(course)
    //     }
    //     catch (error){
    //       console.log(error)
    //     }
    //     };
    // async addLecture(req,res,next){
    //    var lecture = {
    //     "lectureName": "11111introduction",
    //     "topic": [
    //       {
    //         "topicName": "test Topic Name",
    //         "videoID": "sheV2IBlQkU"
    //       },
    //       {
    //         "topicName": "test Topic Name2",
    //         "videoID": "sheV2IBlQkU"
    //       }
    //     ]
    // }
    // lecture.save()
    // async addLecture(req,res,next){
    //     const Lecture = new lecture({
    //             "lectureName": "22222introduction",
    //             "topic": [
    //               {
    //                 "topicName": "test Topic Name",
    //                 "videoID": "sheV2IBlQkU"
    //               },
    //               {
    //                 "topicName": "test Topic Name2",
    //                 "videoID": "sheV2IBlQkU"
    //               }
    //             ]
    //         });
    //     try{
    //       await Lecture.save();
    //     }
    //     catch (error){
    //       console.log(error)
    //     }
    //     };

    // getCourse(req,res,next){
    //     Course.findOne({ name :"test COURSE ADD WITH NEW SCHEMA"})
    //     .populate({
    //         path:'lecture',
    //     })
    //     .then((data) => {
    //         // const dataObj = data.map(data => data.toObject())
    //         res.json(data.lecture[0].lectureName)
    //     }) 
    //     .catch(next)
    // }
    // getCourse(req,res,next){
    //     res.render('test',{layout : false})
    // }
    // test(req,res){
    //     res.send('hmm')
    // }
    // test(req,res){
    //     const user = new User(req.body)
    //     const token = user.generateAuthToken()
    //     console.log(user)
    // }
}
module.exports = new testController();
