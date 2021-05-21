const { Text, Password, Checkbox } = require("@keystonejs/fields");
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
  },
  labelField: "email",

  hooks: {
    // https://www.keystonejs.com/api/hooks/#validateinput
    validateInput: async ({ existingItem, resolvedData, context }) => {
      if (!existingItem || !existingItem.role) {
        const {
          data: { createUserRole },
          error,
        } = await context.executeGraphQL({
          query: gql`
            mutation {
              createUserRole(data: {}) {
                id
              }
            }
          `,
        });
        if (createUserRole) resolvedData.role = createUserRole.id;
      }
      return resolvedData;
    },
  },
  access: user,
};
