const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const Messenger = require("./Messenger");
const Extension = require("../Extension");
const Mail = require("./Mail");
const Momo = require("./Momo");

class Packages extends Extension {
  constructor(keystone) {
    super(keystone);
  }
  /**
   * Router sử dụng tham chiếu keystonejs
   * @param {express.Router} app
   */
  configureExpress = (app) => {
    /**
     * Bỏ khúc dưới là không đăng nhập được
     */
    app.set("trust proxy", true);
    /**
     * Bỏ khúc dưới là không thấy hình ảnh
     */
    app.use(express.static(path.join(path.resolve(), "public")));
    /**
     * Bỏ khúc dưới đi là không có upload được
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    /**
     * static class
     */
    new Messenger(this.keystone).webhook(app);
    new Mail({ user: `hi@loaloa.tech`, pass: `Truongduc910.` });
    new Momo(
      process.env.NODE_ENV === "production"
        ? "https://api.itoa.vn"
        : "https://11a7cddd2e3e.ngrok.io" // run ngrok at 7009
    ).webhook(app);
  };
}
module.exports = { Packages };
// https://seller.itoa.vn/?partnerCode=MOMOEFTO20200623&accessKey=wAEXhBzixBa5Vgx1&requestId=3e01b070-a1b6-11eb-9e50-9595d8ef22f6&amount=1001&orderId=3e018960-a1b6-11eb-9e50-9595d8ef22f6&orderInfo=pay%20with%20momo&orderType=momo_wallet&transId=2509845937&message=Success&localMessage=Th%C3%A0nh%20c%C3%B4ng&responseTime=2021-04-20%2015:59:48&errorCode=0&payType=qr&extraData=id=123345&signature=a8b96c2b096126fa8c94c0ce1ca9bae8ea213d6b755e2bd2e05e2887ad79bfa0
