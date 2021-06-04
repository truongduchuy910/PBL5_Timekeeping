const { Relationship, Checkbox, Integer } = require("@keystonejs/fields");
let { sellerItem } = require("../access");
const format = new Intl.NumberFormat().format;

module.exports = {
  fields: {
    images: {
      type: Relationship,
      ref: "Image.work",
      many: true,
      isRequired: true,
    },
    price: {
      type: Integer,
      label: "Lương",
    },
    shift: { type: Relationship, ref: "Shift" }, // Auto assign
    worker: { type: Relationship, ref: "User" }, // Auto assign. Shift.workers must include worker
    onTime: { type: Checkbox },
  },
  /**
   * 1. find shifts
   * 2. get valid shift + - 5 minute. Assign shift and check onTime
   * 3. get works in shift field
   * 4. if existing work in same day, throw error
   * 5. else return
   */
  labelResolver: (item) =>
    `💵 ${new Date(item.createdAt).toLocaleString()} ${format(item.price)}`,
  adminConfig: {
    defaultColumns: "worker, onTime, shift",
    defaultSort: "createdAt",
  },
  access: sellerItem,
};
