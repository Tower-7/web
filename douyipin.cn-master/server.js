const Koa = require("koa");
const ejs = require("koa-ejs");
const path = require("path");
const session = require("koa-session");
const bodyparser = require("koa-bodyparser");
const staticFiles = require("koa-static");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("@koa/cors");
const router = require("./server/router");
const app = new Koa();
//
app.use(bodyparser());
// 配置跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set(
    "Access-Control-Allow-Headers",
    "x-requested-with, accept, origin, content-type"
  );
  // Content-Type表示具体请求中的媒体类型信息
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('myData')可以返回我们所需的值
  ctx.set("Access-Control-Expose-Headers", "myData");
  await next();
});
// 解决跨域session失效问题
app.use(
  cors({
    credentials: true,
  })
);
//连接数据库
mongoose.Promise = require("bluebird");
const dbUrl = "mongodb://localhost:27017/web";
// const dbUrl = 'mongodb://admin:xyzqq*859632@47.88.53.87:16016/'
//参数设置
const options = {
  useMongoClient: true,
};
mongoose.connect(dbUrl, options);
//配置session
app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa:sess",
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};
app.use(session(CONFIG, app));
//设置静态文件目录
app.use(staticFiles(path.resolve(__dirname, "./public")));
//设置模板
ejs(app, {
  root: path.join(__dirname, "view"),
  layout: false,
  viewExt: "ejs",
  cache: false,
  debug: false,
});
//传递路由参数
router(app);
//设置全局moment
global.moment = moment;
app.listen(8000);
console.log("start at 8000 port");
