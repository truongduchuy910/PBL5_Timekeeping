let { File, Relationship, Checkbox, Text } = require("@itoa/fields");
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
    alt: { type: Text },
    user: { type: Relationship, ref: "User.faces", many: false },
  },
  labelResolver: (item) =>
    `👤 ${new Date(item.createdAt).toLocaleTimeString("vn-VN")}`,
  labelName: "Face for training",
  adminConfig: {
    defaultColumns: "file, user, updatedAt",
    defaultSort: "createdAt",
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
