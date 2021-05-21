const { Text, Password, Checkbox } = require("@keystonejs/fields");
const { gql } = require("@apollo/client");
const { DateTime } = require("@keystonejs/fields");
const { DateTimeUtc } = require("@keystonejs/fields");

module.exports = {
  fields: {
    checkin: { type: DateTimeUtc },
    checkout: {
      type: DateTimeUtc,
    },
  },
};
