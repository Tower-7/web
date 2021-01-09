const Router = require("koa-router");
const Common = require("./Controllers/common");
const Admin = require("./Controllers/admin");
const Pc = require("./Controllers/pc");
const router = new Router();

module.exports = (app) => {
  router.post("/sign_up", Common.sign_up); //注册
  router.post("/user/login", Common.sign_in); //登录
  router.get("/user/info", Common.userInfo); //验证用户

  //   pc
  router.get("/", Pc.index);

  //admin
  router.get("/admin", Admin.signRequired, Admin.index);
  router.get("/adminDist", Admin.signRequired, Admin.adminDist);
  router.get("/product/list", Admin.signRequired, Admin.productList); //productList
  router.post("/admin/updateProduct", Admin.signRequired, Admin.updateProduct); //updateProduct
  router.get("/product/detail", Admin.productDetail); //updateProduct

  // 轮播图
  router.get("/banner/list", Admin.signRequired, Admin.bannerList); //productList
  router.post("/banner/update", Admin.signRequired, Admin.updateBanner); //updateProduct
  router.get("/banner/detail", Admin.bannerDetail); //updateProduct

  // 公司简介
  router.get("/company/intro", Admin.companyInfo); //productList
  router.post("/company/update", Admin.signRequired, Admin.updateCompany); //productList

  // 推荐
  router.get("/recommend/detail", Admin.recommendDetail); //productList
  router.post("/recommend/update", Admin.signRequired, Admin.updateRecommend); //productList

  // 项目
  router.get("/project/detail", Admin.projectDetail); //
  router.post("/project/update", Admin.signRequired, Admin.projectUpdate); //
  router.get("/project/list", Admin.projectList); //

  // 案例
  router.get("/case/detail", Admin.caseDetail); //
  router.post("/case/update", Admin.signRequired, Admin.caseUpdate); //
  router.get("/case/list", Admin.caseList); //

  app.use(router.routes()).use(router.allowedMethods());
};
