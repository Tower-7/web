const Logo = require("../Models/Admin/logo");
const Products = require("../Models/Admin/product");
const Banners = require("../Models/Admin/banner");
const News = require("../Models/Admin/news");
const CompanyInfo = require("../Models/Admin/companyInfo");
const Recommend = require("../Models/Admin/recommend");
const Project = require("../Models/Admin/project");
const Case = require("../Models/Admin/case");
module.exports = {
  index: async (ctx) => {
    let products = await Products.findAll();
    let banners = await Banners.findAll();
    let companyInfos = await CompanyInfo.findAll();
    let companyInfo = companyInfos[0];
    let recommends = await Recommend.findAll();
    let projects = await Project.findAll();
    let cases = await Case.findAll();
    let recommend = recommends[0];
    products = products.slice(0, 4);
    projects = projects.slice(0, 3);
    cases = cases.slice(0, 3);
    await ctx.render("pc/index", {
      products,
      banners,
      companyInfo,
      recommend,
      projects,
      cases,
    });
  },
  news: async (ctx) => {
    let logos = await Logo.findAll();
    let newes = await News.findAll();
    await ctx.render("pc/news", {
      logos: logos,
      newes: newes,
    });
  },
  newsDetail: async (ctx) => {
    let logos = await Logo.findAll();
    let id = ctx.params.id;
    let news = await News.findById(News, id);
    await ctx.render("pc/newsDetail", {
      logos: logos,
      news: news,
    });
  },
  business: async (ctx) => {
    let logos = await Logo.findAll();
    let products = await Products.findAll();
    await ctx.render("pc/business", {
      logos: logos,
      products: products,
    });
  },
  join: async (ctx) => {
    await ctx.render("pc/join", { layout: false });
  },
  about: async (ctx) => {
    await ctx.render("pc/about", { layout: false });
  },
};
