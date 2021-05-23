const { Relationship, DateTime } = require("@keystonejs/fields");
let { publicItem } = require("../access");

module.exports = {
  fields: {
    checkin: {
      type: DateTime,
      yearPickerType: "select",
    },
    checkout: {
      type: DateTime,
      yearPickerType: "select",
    },
    works: { type: Relationship, ref: "Work.shift", many: true },
  },
  access: publicItem,
};
