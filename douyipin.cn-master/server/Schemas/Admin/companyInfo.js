const mongoose = require("mongoose");

let CompanyInfoSchema = new mongoose.Schema({
  title: String,
  intro: String,
  image_uri: String,
  background_image_uri: String,
  data1: String,
  data2: String,
  data3: String,
  data4: String,
  type: String,
  pic: String,
  meta: {
    createAt: {
      type: String,
      default: Date.now(),
    },
    updateAt: {
      type: String,
      default: Date.now(),
    },
  },
});
CompanyInfoSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});
CompanyInfoSchema.statics = {
  findAll: function (cb) {
    return this.find({}).sort({ "meta.updateAt": -1 }).exec(cb);
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
};
module.exports = CompanyInfoSchema;
