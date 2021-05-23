let { File, Relationship, Checkbox } = require("@keystonejs/fields");
let { imageAdapter } = require("../localFileAdapter");
let { sellerItem } = require("../access");
const { default: gql } = require("graphql-tag");

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
    work: { type: Relationship, ref: "Work.images" },
    onTime: { type: Checkbox },
    identity: { type: Relationship, ref: "User" },
  },

  access: sellerItem,
  hooks: {
    afterDelete: async ({ existingItem = {} }) => {
      if (existingItem.file) {
        await imageAdapter.delete(existingItem.file);
      }
    },
    validateInput: async ({ operation, resolvedData, context }) => {
      const { data, error } = await context.executeGraphQL({
        query: gql`
          query {
            allUsers {
              id
            }
            allShifts {
              id
              checkin
              checkout
            }
          }
        `,
      });
      const { allUsers, allShifts } = data;
      // fetch api
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      //
      resolvedData.identity = user.id;
      const current = new Date();
      var validShift;
      allShifts.map((shift) => {
        const checkin = new Date(shift.checkin);
        const valid =
          current.getHours() * 60 + current.getMinutes() <
          checkin.getHours() * 60 + checkin.getMinutes();
        if (valid) {
          resolvedData.onTime = valid;
          validShift = shift;
        }
      });
      if (operation === "create" && validShift && user) {
        const { data } = await context.executeGraphQL({
          query: gql`
            mutation($data: WorkCreateInput) {
              createWork(data: $data) {
                id
              }
            }
          `,
          variables: {
            data: {
              shift: { connect: { id: validShift.id } },
              identity: { connect: { id: user.id } },
            },
          },
        });
        if (!data) return;
        const { createWork } = data;
        if (!createWork) return;
        resolvedData.work = createWork.id;
      }
    },
  },
};
