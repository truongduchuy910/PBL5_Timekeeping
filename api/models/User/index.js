const { gql } = require("@apollo/client");
const {
  Text,
  Password,
  Checkbox,
  Relationship,
  Images,
} = require("@itoa/fields");
const TFace = require("../../api.es5");
// const icons = ["🙇‍♂️", "💁‍♂️", "🙆‍♂️", "🙅‍♂️", "🙋‍♂️", "🤷‍♂️", "🙎‍♂️", "🤦‍♂️", "🙍‍♂️"];
// ${icons[Math.floor(Math.random() * icons.length)]}
const { user } = require("../access");
module.exports = {
  fields: {
    name: { type: Text },
    phone: {
      type: Text,
      isRequired: true,
      isUnique: true,
    },
    email: {
      type: Text,
    },
    password: {
      type: Password,
    },
    isAdmin: { type: Checkbox },
    isSeller: { type: Checkbox, label: "Kích hoạt" },
    faces: {
      type: Images,
      ref: "Face.user",
      search: "alt",
      file: "file",
      many: true,
    },
  },
  labelResolver: (item) =>
    `👤 ${new Date(item.createdAt).toLocaleTimeString("vn-VN")}`,
  hooks: {
    // https://www.keystonejs.com/api/hooks/#validateinput
    validateInput: async ({ existingItem, resolvedData, context }) => {
      if (resolvedData.faces) {
        // make a request
      }
    },
    validateDelete: async ({ existingItem, resolvedData, context }) => {
      const {
        data: { User, allTFaces = [] },
        error,
      } = await context.executeGraphQL({
        query: gql`
          query($id: ID!) {
            allTFaces {
              id
              url
            }
            User(where: { id: $id }) {
              id
              faces {
                id
                file {
                  publicUrl
                }
              }
            }
          }
        `,
        variables: { id: existingItem.id },
      });
      if (error) throw error;
      const ids = User.faces.map((face) => face.id);
      console.log(ids);
      const {
        data: { deleteFaces },
        error: _error,
      } = await context.executeGraphQL({
        query: gql`
          mutation($ids: [ID!]) {
            deleteFaces(ids: $ids) {
              id
            }
          }
        `,
        variables: { ids },
      });
      if (_error) throw _error;
      const [{ url }] = allTFaces;
      const tface = new TFace(url);
      tface.deleteById(existingItem.id);
    },
  },
  labelResolver: (item) => `${item.name}`,
  adminConfig: {
    defaultColumns: "email, phone, isAdmin",
    defaultSort: "createdAt",
  },
  access: user,
};
