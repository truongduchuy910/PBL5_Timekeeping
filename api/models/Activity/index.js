let { Text, Integer } = require("@keystonejs/fields");
const { own } = require("../access");
const { ip } = require("../plugin");
module.exports = {
  fields: {
    operation: { type: Text },
    status: { type: Integer },
    response: { type: Text },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  access: own,
  labelField: "full_name",
};
