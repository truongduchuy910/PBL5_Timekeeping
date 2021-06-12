const { Relationship, Checkbox, Integer, Text } = require("@keystonejs/fields");
let { sellerItem } = require("../access");
const format = new Intl.NumberFormat().format;

module.exports = {
  fields: {
    message: { type: Text },
    solved: { type: Checkbox },
  },
  access: sellerItem,
};
