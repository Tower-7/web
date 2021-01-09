const Logo = require("../Models/Admin/logo");
const Product = require("../Models/Admin/product");
const Project = require("../Models/Admin/project");
const ProductType = require("../Models/Admin/productType");
const About = require("../Models/Admin/about");
const Banner = require("../Models/Admin/banner");
const Scope = require("../Models/Admin/scope");
const CompanyInfo = require("../Models/Admin/companyInfo");
const Service = require("../Models/Admin/service");
const Recommend = require("../Models/Admin/recommend");
const Case = require("../Models/Admin/case");
const list = require("./mock");

module.exports = {
  index: async (ctx) => {
    let logos = await Logo.findAll();
    let banners = await Banner.findAll();
    let productTypes = await ProductType.findAll();
    let abouts = await About.findAll();
    let scopes = await Scope.findAll();
    let services = await Service.findAll();
    await ctx.render("admin/index", {
      logos: logos,
      banners: banners,
      productTypes: productTypes,
      abouts: abouts,
      scopes: scopes,
      services: services,
    });
  },
  adminDist: async (ctx) => {
    await ctx.render("dist/index", {});
  },
  //更新
  updateLogo: async (ctx) => {
    await update(ctx, Logo);
  },
  updateBanner: async (ctx) => {
    await update(ctx, Banner);
  },
  bannerList: async (ctx) => {
    let banners = await Banner.findAll();
    let bannered = [];
    banners.forEach((value, i) => {
      let obj = {
        id: i + 1,
        _id: value._id,
        timestamp: value.meta.updateAt,
        title: value.title,
        content: value.content,
        image_uri: "111",
      };
      bannered.push(obj);
    });
    return (ctx.body = {
      code: 200,
      data: {
        total: bannered.length,
        items: bannered,
      },
    });
  },
  //文章详情页
  bannerDetail: async (ctx) => {
    let id = ctx.query.id;
    let banner = await Banner.findById(Banner, id);
    return (ctx.body = {
      code: 200,
      data: banner[0],
    });
  },

  productList: async (ctx) => {
    let products = await Product.findAll();
    let productses = [];
    products.forEach((value, i) => {
      let obj = {
        id: i + 1,
        _id: value._id,
        timestamp: value.meta.updateAt,
        title: value.title,
        content: value.content,
      };
      productses.push(obj);
    });
    return (ctx.body = {
      code: 200,
      data: {
        total: productses.length,
        items: productses,
      },
    });
  },
  updateProduct: async (ctx) => {
    await update(ctx, Product);
  },
  //文章详情页
  productDetail: async (ctx) => {
    let id = ctx.query.id;
    let product = await Product.findById(Product, id);
    return (ctx.body = {
      code: 200,
      data: product[0],
    });
  },

  // 项目
  projectList: async (ctx) => {
    let projects = await Project.findAll();
    let list = [];
    projects.forEach((value, i) => {
      let obj = {
        id: i + 1,
        _id: value._id,
        timestamp: value.meta.updateAt,
        title: value.title,
        content: value.content,
      };
      list.push(obj);
    });
    return (ctx.body = {
      code: 200,
      data: {
        total: list.length,
        items: list,
      },
    });
  },
  projectUpdate: async (ctx) => {
    await update(ctx, Project);
  },
  projectDetail: async (ctx) => {
    let id = ctx.query.id;
    let project = await Project.findById(Project, id);
    return (ctx.body = {
      code: 200,
      data: project[0],
    });
  },

  // 项目
  caseList: async (ctx) => {
    let arr = await Case.findAll();
    let list = [];
    arr.forEach((value, i) => {
      let obj = {
        id: i + 1,
        _id: value._id,
        timestamp: value.meta.updateAt,
        title: value.title,
        content: value.content,
      };
      list.push(obj);
    });
    return (ctx.body = {
      code: 200,
      data: {
        total: list.length,
        items: list,
      },
    });
  },
  caseUpdate: async (ctx) => {
    await update(ctx, Case);
  },
  caseDetail: async (ctx) => {
    let id = ctx.query.id;
    let data = await Case.findById(Case, id);
    return (ctx.body = {
      code: 200,
      data: data[0],
    });
  },

  // 公司简介
  companyInfo: async (ctx) => {
    let companyInfo = await CompanyInfo.findAll();
    console.log(companyInfo);
    return (ctx.body = {
      code: 200,
      data: companyInfo[0] || null,
    });
  },
  updateCompany: async (ctx) => {
    await update(ctx, CompanyInfo);
  },

  // 推荐
  recommendDetail: async (ctx) => {
    let recommend = await Recommend.findAll();
    console.log("--------------------------------");
    console.log(recommend);
    return (ctx.body = {
      code: 200,
      data: recommend[0] || null,
    });
  },
  updateRecommend: async (ctx) => {
    await update(ctx, Recommend);
  },

  updateProductType: async (ctx) => {
    await update(ctx, ProductType);
  },
  updateAbout: async (ctx) => {
    await update(ctx, About);
  },
  updateScope: async (ctx) => {
    await update(ctx, Scope);
  },
  updateService: async (ctx) => {
    await update(ctx, Service);
  },
  //登陆注册页面
  sign: async (ctx) => {
    await ctx.render("admin/sign");
  },
  //验证登陆中间件
  signRequired: async (ctx, next) => {
    let user = ctx.session.user;
    let url = ctx.request.originalUrl;
    if (!user) {
      return ctx.redirect("/admin/sign?" + url);
    }
    await next();
  },
  delProductType: async (ctx) => {
    await del(ctx, ProductType);
  },
  delService: async (ctx) => {
    await del(ctx, Service);
  },
};

//更新
let update = async (ctx, db) => {
  let data = ctx.request.body;
  let _data = data;
  if (data.id) {
    _data = { $set: _data };
    await db.updateById(db, data.id, _data);
    return (ctx.body = {
      code: 200,
      data: "更新成功",
    });
  } else {
    _data = new db(_data);
    await _data.save();
    return (ctx.body = {
      code: 200,
      data: "发布成功",
    });
  }
};

//删除
let del = async (ctx, db) => {
  let del = ctx.request.body;
  if (del.id) {
    await db.deletById(db, del.id);
    return (ctx.body = { msg: "删除成功", status: "1" });
  } else {
    return (ctx.body = { msg: "删除错误", status: "1" });
  }
};
