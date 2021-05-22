let { File, Relationship } = require("@keystonejs/fields");
let { imageAdapter } = require("../localFileAdapter");
let { sellerItem } = require("../access");

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
    work: { type: Relationship, ref: "Work.images" },
  },

  hooks: {
    afterDelete: async ({ existingItem = {} }) => {
      if (existingItem.file) {
        await imageAdapter.delete(existingItem.file);
      }
    },
    resolveInput: async ({ resolvedData, context: { authedItem } }) => {
      if (resolvedData.file && !resolvedData.alt)
        resolvedData.alt = resolvedData.file.originalFilename;
      return resolvedData;
    },
  },
  access: sellerItem,
};
