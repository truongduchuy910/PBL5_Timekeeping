const { Relationship, Text } = require("@keystonejs/fields");
const { gql } = require("@apollo/client/core");
/**
 *
 */
const ipValidateInput = async ({ context, resolvedData }) => {
  const { req } = context;
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  resolvedData.ip = ip;
};
const ip = {
  type: Text,
  hooks: {
    validateInput: ipValidateInput,
  },
  adminConfig: {
    isReadOnly: true,
  },
};
const ofValidateInput = async ({ context, resolvedData }) => {
  /**
   * Assign
   */
  const {
    data: { allPages },
    errors,
  } = await context.executeGraphQL({
    context,
    query: gql`
      query {
        allPages {
          id
          user {
            id
            name
            phone
          }
        }
      }
    `,
  });
  if (!allPages || !allPages.length) throw new Error("Không tìm thấy Page");
  const [
    {
      user: { id, name },
    },
  ] = allPages;
  resolvedData.of = id;
};
const of = {
  type: Relationship,
  ref: "User",
  hooks: {
    validateInput: ofValidateInput,
  },
  adminConfig: {
    isReadOnly: true,
  },
};
module.exports = { of, ip };