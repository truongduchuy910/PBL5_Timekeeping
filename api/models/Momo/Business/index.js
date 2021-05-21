/*
 * This is a keystone list that stores facebook messages
 */
let { Text } = require("@keystonejs/fields");
const Momo = require("../../../packages/Momo");
const { own } = require("../../access");
const { ip } = require("../../plugin");
module.exports = {
  fields: {
    partner: { type: Text, isRequired: true },
    access: { type: Text, isRequired: true },
    secret: { type: Text, isRequired: true },
    endpoint: { type: Text, isRequired: true },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  // access: own,
  labelField: "partner",
};
