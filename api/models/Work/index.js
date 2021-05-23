const { Relationship } = require("@keystonejs/fields");
const { DateTimeUtc } = require("@keystonejs/fields");
let { sellerItem } = require("../access");
module.exports = {
  fields: {
    checkin: { type: DateTimeUtc },
    shift: { type: Relationship, ref: "Shift.works" },
    images: { type: Relationship, ref: "Image.work", may: true },
    identity: { type: Relationship, ref: "User" },
  },
  access: sellerItem,
};
