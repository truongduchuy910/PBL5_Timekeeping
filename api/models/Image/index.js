let { File, Relationship, Checkbox, Text } = require("@itoa/fields");
let { imageAdapter } = require("../localFileAdapter");
let { sellerItem, publicItem } = require("../access");
const { gql } = require("@apollo/client");
const { GraphQLError } = require("graphql");
const TFace = require("../../api.es5");

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
  access: publicItem,
  labelResolver: (item) =>
    `${item.identity ? "🎉" : "🖼"} ${new Date(
      item.createdAt,
    ).toLocaleTimeString("vn-VN")}`,
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

      const {
        data: { allTFaces = [] },
        error,
      } = await context.executeGraphQL({
        query: gql`
          query {
            allTFaces {
              id
              url
            }
          }
        `,
      });
      if (error) throw error;
      const [{ url }] = allTFaces;
      console.log(url, resolvedData);
      const tface = new TFace(url);
      resolvedData.identity = await tface.getIdByUrl(
        `https://timekeeping.itoa.vn/upload/img/${resolvedData.file.filename}`,
      ).name_rp;
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
