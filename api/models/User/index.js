const {
  Text,
  Password,
  Checkbox,
  Relationship,
} = require("@keystonejs/fields");
const { gql } = require("@apollo/client");
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
  labelField: "email",

  hooks: {
    // https://www.keystonejs.com/api/hooks/#validateinput
    validateInput: async ({ existingItem, resolvedData, context }) => {
      if (resolvedData.faces) {
        // make a request
      }
    },
  },
  access: user,
};
