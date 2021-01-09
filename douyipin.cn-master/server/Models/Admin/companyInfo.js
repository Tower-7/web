const mongoose = require("mongoose");
let CompanyInfoSchema = require("../../Schemas/Admin/companyInfo");
let CompanyInfo = mongoose.model("CompanyInfo", CompanyInfoSchema);

module.exports = CompanyInfo;
