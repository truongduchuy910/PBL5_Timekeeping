let { Text, Relationship, Checkbox } = require("@keystonejs/fields");
const { own } = require("../../access");
const { ip } = require("../../plugin");
module.exports = {
  fields: {
    psid: { type: Text, isUnique: true },
    full_name: { type: Text },
    profile_pic: { type: Text },
    access_token: { type: Text },
    //
    isPerson: { type: Checkbox },
    of: { type: Relationship, ref: "MessengerUser.users" },
    //
    isPage: { type: Checkbox },
    users: { type: Relationship, ref: "MessengerUser.of", many: true },
    //
    email: {
      type: Text,
    },
    phone: {
      type: Text,
    },
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
