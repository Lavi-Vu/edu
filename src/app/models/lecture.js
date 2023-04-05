const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const lecture = new Schema({
  lectureName: { type: String, required: true },
  topic: [
    {
      topicName: { type: String },
      videoID: { type: String, required: true },
    },
  ],
});
lecture.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("lecture", lecture);