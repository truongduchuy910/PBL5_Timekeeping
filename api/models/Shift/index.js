const { Relationship, DateTime, Integer, Text } = require("@keystonejs/fields");
let { publicItem, sellerItem } = require("../access");
const format = new Intl.NumberFormat().format;

module.exports = {
  fields: {
    checkin: {
      type: DateTime,
      yearPickerType: "select",
    },
    price: {
      type: Integer,
      label: "Lương",
    },
    name: { type: Text },
    workers: { type: Relationship, ref: "User", many: true },
  },

  labelResolver: (item) =>
    `⏱ ${new Date(item.checkin).toLocaleTimeString()} - ${format(
      item.price
    )} hourly`,
  adminConfig: {
    defaultColumns: "name, workers, updatedAt",
    defaultSort: "createdAt",
  },
  access: publicItem,
};
