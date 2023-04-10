const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const course = require('./Course')

const author = new Schema({
    name: {type: String},
    email: {type: String},
},
{
    collection:'author'
});

 // register the schema
author.set('toObject', { getters: true });
author.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('author', author)