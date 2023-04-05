const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String },
    level: { type: String },
    lecture: [
      {
        ref: "lecture",
        type: Schema.Types.ObjectId,
      },
    ],
    author: {
      ref: "author",
      type: Schema.Types.ObjectId,
      select: "name",
    },
    slug: { type: String, slug: "name", unique: true },
    price: { type: String },
    tag: { type: String },
  },
  {
    _id: false,
    timestamps: true,
    strictPopulate: false,
  }
);
Course.set("toObject", { getters: true });
Course.plugin(require("mongoose-autopopulate"));
Course.plugin(AutoIncrement, { inc_field: "_id" });

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);

