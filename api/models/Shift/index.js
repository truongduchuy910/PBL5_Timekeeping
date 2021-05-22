const { DateTimeUtc, Relationship } = require("@keystonejs/fields");
let { sellerItem } = require("../access");

module.exports = {
  fields: {
    checkin: { type: DateTimeUtc },
    checkout: {
      type: DateTimeUtc,
    },
    works: { type: Relationship, ref: "Work.shift", many: true },
  },
  access: sellerItem,
};
