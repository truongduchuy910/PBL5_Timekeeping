const {
  Text,
  Password,
  Checkbox,
  Relationship,
} = require("@keystonejs/fields");
// const icons = ["🙇‍♂️", "💁‍♂️", "🙆‍♂️", "🙅‍♂️", "🙋‍♂️", "🤷‍♂️", "🙎‍♂️", "🤦‍♂️", "🙍‍♂️"];
// ${icons[Math.floor(Math.random() * icons.length)]}
const { user } = require("../access");
module.exports = {
  fields: {
    name: { type: Text },
    phone: {
      type: Text,
      isRequired: true,
      isUnique: true,
    },
    email: {
      type: Text,
    },
    password: {
      type: Password,
    },
    isAdmin: { type: Checkbox },
    faces: { type: Relationship, ref: "Face.user", many: true },
  },
  hooks: {
    // https://www.keystonejs.com/api/hooks/#validateinput
    validateInput: async ({ existingItem, resolvedData, context }) => {
      if (resolvedData.faces) {
        // make a request
      }
    },
  },
  labelResolver: (item) => `${item.name}`,
  adminConfig: {
    defaultColumns: "email, phone, isAdmin",
    defaultSort: "createdAt",
  },
  access: user,
};
