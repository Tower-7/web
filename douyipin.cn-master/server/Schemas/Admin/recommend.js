const mongoose = require("mongoose");

let RecommendSchema = new mongoose.Schema({
  title: String,
  content: String,
  require: String,
  code: String,
  cover: String,
  image_uri: String,
  meta: {
    createAt: {
      type: String,
      default: new Date().getTime(),
    },
    updateAt: {
      type: String,
      default: new Date().getTime(),
    },
  },
});
RecommendSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = new Date().getTime();
  } else {
    this.meta.updateAt = new Date().getTime();
  }
  next();
});
RecommendSchema.statics = {
  findAll: function (cb) {
    return this.find({}).sort({ "meta.createAt": -1 }).exec(cb);
  },
  updateById: async (db, id, _db) => {
    return db.update({ _id: id }, _db, { upsert: true });
  },
  deletById: async (db, id) => {
    return db.remove({ _id: id });
  },
  findById: async (db, id) => {
    return db.find({ _id: id });
  },
  findByType: async (db, id) => {
    return db.find({ type: id });
  },
};
module.exports = RecommendSchema;
