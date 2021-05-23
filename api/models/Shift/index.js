const { Relationship, DateTime, Integer } = require("@keystonejs/fields");
let { publicItem } = require("../access");

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
    works: { type: Relationship, ref: "Work.shift", many: true },
    users: { type: Relationship, ref: "User.shifts", many: true },
  },
  access: publicItem,
};
