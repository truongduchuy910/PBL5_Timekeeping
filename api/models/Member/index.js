/*
 * This is a keystone list that stores facebook messages
 */
let { Text, Relationship, Checkbox, Wysiwyg } = require("@keystonejs/fields");
const { own } = require("../access");
const { ip } = require("../plugin");
module.exports = {
  fields: {
    name: { type: Text },
    degree: { type: Text },
    experience: { type: Text },
    description: { type: Wysiwyg },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
    },
  },
  access: own,
  labelField: "name",
};
