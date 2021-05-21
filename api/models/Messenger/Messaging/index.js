/*
 * This is a keystone list that stores facebook messages
 */
let { Text, Relationship } = require("@keystonejs/fields");
const { own } = require("../../access");
const { ip } = require("../../plugin");
module.exports = {
  fields: {
    page: {
      type: Relationship,
      ref: "MessengerUser",
    },
    person: {
      type: Relationship,
      ref: "MessengerUser",
    },
    timestamp: { type: Text },
    message: { type: Text },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  access: own,
  labelField: "message",
};
