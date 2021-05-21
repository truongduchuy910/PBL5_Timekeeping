const Momo = require("./index");
const momo = new Momo();
momo.transactionProcessor({
  returnUrl: "https://seller.itoa.vn",
  extraData: "id=123345",
  amount: 1,
  orderInfo: "pay with momo",
});
