const {
  Text,
  Password,
  Relationship,
  Checkbox,
} = require("@keystonejs/fields");
const { ip } = require("../../packages/Momo");
const { own } = require("../access");

module.exports = {
  fields: { StagingToken: { type: Text }, ProductionToken: { type: Text }, ip },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  access: own,
};
