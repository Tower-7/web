const mongoose = require("mongoose");
let CaseSchema = require("../../Schemas/Admin/case");
let Case = mongoose.model("CaseUs", CaseSchema);

module.exports = Case;
