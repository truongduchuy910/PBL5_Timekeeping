module.exports = async (keystone) => {
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
  } = await keystone.executeGraphQL({
    context: keystone.createContext({ skipAccessControl: true }),
    query: `query {
      _allUsersMeta {
        count
      }
    }`,
  });

  if (count === 0) {
    const password = "0332813077";
    const phone = "0332813077";

    const { errors } = await keystone.executeGraphQL({
      context: keystone.createContext({ skipAccessControl: true }),
      query: `mutation initialUser($password: String, $phone: String) {
            createUser(data: {name: "Trần Ngọc Huy", phone: $phone, isAdmin: true, password: $password}) {
              id
            }
          }`,
      variables: { password, phone },
    });

    if (errors) {
      console.log("failed to create initial user:");
      console.log(errors);
    } else {
      console.log(`

      User created:
        phone: ${phone}
        password: ${password}
      Please change these details after initial login.
      `);
    }
  } else {
    console.log(`find ${count} users`);
  }
};
