const { Relationship, DateTime, Integer, Text } = require("@itoa/fields");
let { publicItem } = require("../access");
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
    works: { type: Relationship, ref: "Work.shift", many: true },
  },

  labelResolver: (item) =>
    `⏱ ${new Date(item.checkin).toLocaleTimeString("vn-VN")} - ${format(
      item.price,
    )} hourly`,

  adminConfig: {
    defaultColumns: "name, workers, updatedAt",
    defaultSort: "createdAt",
  },
  access: publicItem,
};
