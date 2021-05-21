let { Text, Integer } = require("@keystonejs/fields");
const { own } = require("../access");
const { ip } = require("../plugin");
module.exports = {
  fields: {
    identity: { type: Text, isRequired: true },
    text: { type: Text, isRequired: true },
    amount: { type: Text, isRequired: true },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  // access: own,
  labelField: "identity",
};
