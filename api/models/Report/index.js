const { Relationship, Checkbox, Integer, Text } = require("@itoa/fields");
let { sellerItem } = require("../access");
const format = new Intl.NumberFormat().format;

module.exports = {
  fields: {
    message: { type: Text },
    solved: { type: Checkbox },
  },
  labelResolver: (item) =>
    `👤 ${new Date(item.createdAt).toLocaleTimeString("vn-VN")}`,
  access: sellerItem,
};
