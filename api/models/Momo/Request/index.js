/*
 * This is a keystone list that stores facebook messages
 */
const { gql } = require("@apollo/client");
let { Text, Relationship } = require("@keystonejs/fields");
const Momo = require("../../../packages/Momo");
const { own } = require("../../access");
const { ip } = require("../../plugin");
module.exports = {
  fields: {
    returnUrl: { type: Text, isRequired: true }, // tra ve khi quet thanh cong
    extraData: { type: Text, isRequired: true }, // it's payment identity
    amount: { type: Text, isRequired: true },
    orderInfo: { type: Text },
    payUrl: { type: Text },
    business: { type: Relationship, ref: "MomoBusiness" },
    ip,
  },
  hooks: {
    validateInput: async ({ context, resolvedData }) => {
      await ip.hooks.validateInput({ context, resolvedData });
      const {
        returnUrl,
        extraData,
        amount,
        orderInfo,
        business,
      } = resolvedData;
      const {
        data: { MomoBusiness },
      } = await context.executeGraphQL({
        context,
        query: gql`
          query($business: ID!) {
            MomoBusiness(where: { id: $business }) {
              id
              partner
              access
              secret
              endpoint
            }
          }
        `,
        variables: {
          business,
        },
      });
      const { id, partner, access, secret, endpoint } = MomoBusiness;
      const data = await Momo.transactionProcessor({
        returnUrl,
        extraData,
        amount,
        orderInfo,
        id,
        partner,
        access,
        secret,
        endpoint,
      });
      if (data) resolvedData.payUrl = data.payUrl;
    },
  },
  // access: own,
  labelField: "extraData",
};
