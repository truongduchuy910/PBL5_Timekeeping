const { Relationship, DateTime, Integer, Text } = require("@itoa/fields");
let { publicItem, sellerItem } = require("../access");
const format = new Intl.NumberFormat().format;

module.exports = {
  fields: {
    url: {
      type: Text,
    },
  },
  access: publicItem,
};
