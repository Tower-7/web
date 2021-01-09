const mongoose = require("mongoose");

let CaseSchema = new mongoose.Schema({
  title: String,
  title_two: String,
  job: String,
  intro: String,
  content: String,
  word: String,
  type: String,
  link: String,
  txt: String,
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
CaseSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});
CaseSchema.statics = {
  findAll: function (cb) {
    return this.find({}).exec(cb);
  },
  findById: async (db, id) => {
    return db.find({ _id: id });
  },
  updateById: async (db, id, _db) => {
    return db.update({ _id: id }, _db, { upsert: true });
  },
  deletById: async (db, id) => {
    return db.remove({ _id: id });
  },
};
module.exports = CaseSchema;
