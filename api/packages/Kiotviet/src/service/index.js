const { authen } = require('./authen');
const { category } = require('./category');
const { customer } = require('./customer');
const { information } = require('./information');
const { invoice } = require('./invoice');
const { order } = require('./order');
const { orderSupplier } = require('./orderSupplier');
const { priceBook } = require('./priceBook');
const { product } = require('./product');
const { purchaseOrder } = require('./purchaseOrder');
const { returnn } = require('./return');
const { surchage } = require('./surchage');

module.exports = {
    authen,
    category,
    customer,
    information,
    invoice,
    order,
    orderSupplier,
    priceBook,
    product,
    purchaseOrder,
    returnn,
    surchage,
};
