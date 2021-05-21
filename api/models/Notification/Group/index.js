let { Text, Relationship } = require("@keystonejs/fields");
const { own } = require("../../access");
const { ip } = require("../../plugin");
module.exports = {
  fields: {
    tag: { type: Text },
    messengers: { type: Relationship, ref: "MessengerUser", many: true },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  access: own,
  labelField: "tag",
};
