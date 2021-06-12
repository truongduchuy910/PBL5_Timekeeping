let { File, Relationship, Checkbox, Text } = require("@keystonejs/fields");
let { imageAdapter } = require("../localFileAdapter");
let { sellerItem } = require("../access");
const { gql } = require("@apollo/client");
const { GraphQLError } = require("graphql");

module.exports = {
  fields: {
    file: {
      type: File,
      adapter: imageAdapter,
      hooks: {
        beforeChange: async ({ existingItem = {} }) => {
          if (existingItem.file) {
            await imageAdapter.delete(existingItem.file);
          }
        },
      },
      isRequired: true,
    },
    identity: { type: Text },
    work: { type: Relationship, ref: "Work.images" },
  },
  access: sellerItem,
  labelResolver: (item) =>
    `${item.identity ? "🎉" : "🖼"} ${new Date(
      item.createdAt
    ).toLocaleString()}`,
  adminConfig: {
    defaultColumns: "work, file, updatedAt",
    defaultSort: "createdAt",
  },
  hooks: {
    afterDelete: async ({ existingItem = {} }) => {
      if (existingItem.file) {
        await imageAdapter.delete(existingItem.file);
      }
    },
    validateInput: async ({
      operation,
      existingItem,
      resolvedData,
      context,
    }) => {
      /**
       *  fetch api simulation
       */
      const { data } = await context.executeGraphQL({
        query: gql`
          query {
            allUsers {
              id
            }
          }
        `,
      });
      const { allUsers } = data;
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      resolvedData.identity = user.id;
      /**
       * create work for identity
       */
      const { identity } = resolvedData;
      if (identity) {
        const { data, errors } = await context.executeGraphQL({
          query: gql`
            mutation($data: WorkCreateInput) {
              createWork(data: $data) {
                id
              }
            }
          `,
          variables: {
            data: {
              worker: { connect: { id: identity } },
            },
          },
        });
        if (errors) throw new GraphQLError(errors.toString());
        if (!data || !data.createWork) throw new GraphQLError("cannot create");
        const { createWork } = data;
        resolvedData.work = createWork.id;
      }
    },
  },
};
