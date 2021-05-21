require("dotenv").config();
const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { Packages } = require("./packages");
const { Models } = require("./models");
const initialiseData = require("./initial-data");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
var keystone = new Keystone({
  adapter: new MongooseAdapter({
    mongoUri: "mongodb://localhost:27017/timekeeper",
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
      enableDefaultRoute: true,
    }),
  ],
  configureExpress: packages.configureExpress,
};
