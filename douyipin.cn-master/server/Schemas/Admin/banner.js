var mongoose = require("mongoose");

var BannerSchema = new mongoose.Schema({
  title: String,
  title_two: String,
  job: String,
  intro: String,
  word: String,
  type: String,
  link: String,
  txt: String,
  btn: String,
  pic: String,
  number: String,
  image_uri: String,
  content: String,
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
BannerSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = new Date().getTime();
  } else {
    this.meta.updateAt = new Date().getTime();
  }
  next();
});
BannerSchema.statics = {
  findAll: function (cb) {
    return this.find({}).exec(cb);
  },
  findById: async (db, id) => {
    return db.find({ _id: id });
  },
  updateById: async (banner, id, _banner) => {
    return banner.update({ _id: id }, _banner, { upsert: true });
  },
  deletById: async (db, id) => {
    return db.remove({ _id: id });
  },
};
module.exports = BannerSchema;
