require("dotenv").config();
const { Keystone } = require("@itoa/keystone");
const { GraphQLApp } = require("@itoa/app-graphql");
const { AdminUIApp } = require("@itoa/app-admin-ui");
const { StaticApp } = require("@itoa/app-static");
const { Packages } = require("./packages");
const { Models } = require("./models");
const initialiseData = require("./initial-data");
const { MongooseAdapter } = require("@itoa/adapter-mongoose");
var keystone = new Keystone({
  adapter: new MongooseAdapter({
    mongoUri: "mongodb://timekeeping:timekeeping@db.itoa.vn:27017/timekeeping",
  }),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
  //
  secureCookies: process.env.NODE_ENV === "production",
  cookieSecret: "seller.itoa.vn",
  cookie: {
    //https://www.keystonejs.com/keystonejs/keystone/#createauthstrategyconfig
    secure: process.env.NODE_ENV === "production", // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    sameSite: false,
  },
});
var models = new Models(keystone);
var packages = new Packages(keystone);
models.createList();
models.createAuth();
module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      adminPath: "/admin",
      authStrategy: models.authStrategy,
      enableDefaultRoute: false,
    }),
    new StaticApp({
      path: "/",
      src: "./web-build",
      fallback: "index.html",
    }),
  ],
  configureExpress: packages.configureExpress,
};
