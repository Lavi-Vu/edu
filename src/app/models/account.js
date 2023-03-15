const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const course = require('./Course')

const account = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    list_course:[{
        ref: 'Course',
        type: String,
    }]
},
{   
    collection:'accounts',
    timestamps: true,
});

 // register the schema
account.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('account', account)