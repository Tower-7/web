let mongoose = require("mongoose");
let RecommendSchema = require("../../Schemas/Admin/recommend");
let Recommend = mongoose.model("Recommend", RecommendSchema);

module.exports = Recommend;
