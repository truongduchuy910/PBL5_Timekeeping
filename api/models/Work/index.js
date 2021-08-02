const { Relationship, Checkbox, Integer, Text } = require("@itoa/fields");
let { sellerItem } = require("../access");
const format = new Intl.NumberFormat().format;
const { gql } = require("@apollo/client");
const { GraphQLError } = require("graphql");

module.exports = {
  fields: {
    images: {
      type: Relationship,
      ref: "Image.work",
      many: true,
      isRequired: true,
    },
    price: {
      type: Integer,
      label: "Lương",
    },
    shift: { type: Relationship, ref: "Shift.works" }, // Auto assign
    worker: { type: Relationship, ref: "User" }, // Shift.workers must include worker
    onTime: { type: Checkbox },
  },
  /**
   * 1. find shifts
   * 2. get works in shift field
   * 3. get valid shift + - 5 minute. Assign shift and check onTime
   * 4. if existing work in same day, throw error
   * 5. else return
   */
  hooks: {
    validateInput: async ({ operation, resolvedData, context }) => {
      if (operation === "update") throw new GraphQLError("cannot update Work");
      const date = new Date();
      //  1. find shifts
      const { data = {} } = await context.executeGraphQL({
        query: gql`
          query($id: ID) {
            allShifts {
              checkin
              id
              price
              workers {
                id
              }
              works(where: { worker: { id: $id } }) {
                id
                createdAt
                worker {
                  id
                }
              }
            }
          }
        `,
        variables: { id: resolvedData.worker },
      });
      const { allShifts = [] } = data;
      if (!allShifts.length) throw new GraphQLError("Shift is empty");
      //
      const current = date.getHours() * 60 + date.getMinutes();
      var validShift = false;
      allShifts.map((shift) => {
        // 2. get works in shift field
        if (!shift.workers || !shift.workers.length) return;
        const workers = shift.workers.map((worker) => worker.id);
        if (!workers.includes(resolvedData.worker)) return;
        // 3. get valid shift +5 minute -45 minute. Assign shift and check onTime
        const _date = new Date(shift.checkin);
        const checkin = _date.getHours() * 60 + _date.getMinutes();
        // if 5 minutes late, do nothing
        // and 45 minutes early
        if (current < checkin + 5 && current > checkin - 45) {
          // valid shift
          validShift = shift;
          resolvedData.shift = shift.id;
          if (current < checkin) resolvedData.onTime = true;
        }
        resolvedData.price = shift.price;
      });
      if (!validShift)
        throw new GraphQLError(`in valid shift, ${resolvedData.worker}`);
      // 4. if existing work in same day, throw error
      const existing = validShift.works.map((work) =>
        new Date(work.createdAt).toLocaleDateString()
      );
      if (existing.includes(date.toLocaleDateString()))
        throw new GraphQLError(`work duplicate, ${resolvedData.worker}`);

      // 5. else return
      return resolvedData;
    },
  },
  labelResolver: (item) =>
    `💵 ${new Date(item.createdAt).toLocaleTimeString("vn-VN")} ${format(item.price)}`,
  adminConfig: {
    defaultColumns: "worker, onTime, shift",
    defaultSort: "createdAt",
  },
  access: sellerItem,
};
