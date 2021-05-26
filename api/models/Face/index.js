let { File, Relationship, Checkbox } = require("@keystonejs/fields");
let { imageAdapter } = require("../localFileAdapter");
let { sellerItem } = require("../access");
const { default: gql } = require("graphql-tag");

module.exports = {
  fields: {
    file: {
      type: File,
      adapter: imageAdapter,
      hooks: {
        beforeChange: async ({ existingItem = {} }) => {
          if (existingItem.file) {
            await imageAdapter.delete(existingItem.file);
          }
        },
      },
      isRequired: true,
    },
    user: { type: Relationship, ref: "User.faces" },
  },

  access: sellerItem,
  hooks: {
    afterDelete: async ({ existingItem = {} }) => {
      if (existingItem.file) {
        await imageAdapter.delete(existingItem.file);
      }
    },
  },
};