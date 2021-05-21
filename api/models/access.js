var whitelisting = ["103.130.213.46", "103.75.184.171", "103.130.212.228"];
if (process.env.NODE_ENV !== "production") {
  whitelisting.push("::1");
}
const user = {
  read: ({ authentication }) => {
    const { item: user } = authentication;
    return user ? (user.isAdmin ? true : { id: user.id }) : false;
  },
  create: true,
  update: ({ authentication: { item: user } }) => {
    return user ? (user.isAdmin ? true : { id: user.id }) : false;
  },
  delete: ({ authentication: { item: user } }) => {
    return user && user.isAdmin;
  },
};
const own = {
  read: ({ authentication, context }) => {
    if (
      process.env.NODE_ENV !== "production" ||
      whitelisting.includes(ip(context))
    )
      return true;
    const { item: user } = authentication;
    return user ? (user.isAdmin ? true : { createdBy: user.id }) : false;
  },
  create: ({ authentication: { item: user }, context }) => {
    if (
      process.env.NODE_ENV !== "production" ||
      whitelisting.includes(ip(context))
    )
      return true;
    return Boolean(user);
  },
  update: ({ authentication: { item: user }, context }) => {
    if (
      process.env.NODE_ENV !== "production" ||
      whitelisting.includes(ip(context))
    )
      return true;
    return user ? (user.isAdmin ? true : { createdBy: user.id }) : false;
  },
  delete: ({ authentication: { item: user }, context }) => {
    if (
      process.env.NODE_ENV !== "production" ||
      whitelisting.includes(ip(context))
    )
      return true;
    return user ? (user.isAdmin ? true : { createdBy: user.id }) : false;
  },
};

module.exports = { user, own };
function ip(context) {
  const { req } = context;
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  );
}
