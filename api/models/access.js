const userIsAdmin = ({ authentication: { item: user } }) => {
  return Boolean(user && user.isAdmin);
};
const userIsSeller = ({ authentication }) => {
  const { item: user } = authentication;
  return Boolean(user && (user.isSeller || user.isAdmin));
};
const ownItem = ({ authentication: { item: user } }) => {
  if (user) {
    if (user.isAdmin) return true;
    else return { createdBy: { id: user.id } };
  } else return false;
};
const allCanMutation = ({}) => {
  return true;
};
/**
 * ACCESS
 */
const user = {
  read: ({ authentication, context }) => {
    const { item: user } = authentication;
    if (user) {
      if (user.isAdmin) return true;
      if (user.isSeller) return { id: user.id };
      return { OR: [{ page: { domain_contains: domain } }, { id: user.id }] };
    }
    return { page: { domain_contains: getDomain(context) } };
  },
  create: allCanMutation,
  update: ({ authentication: { item: user } }) => {
    if (user.isAdmin) return true;
    return { id: user.id };
  },
  delete: userIsAdmin,
  auth: true,
};
var createdById = {};
var loading = {};
/**
 * 1 HOUR
 */
setInterval(() => {
  createdById = {};
  loading = {};
  console.log("clear cache");
}, 3600000);
const getPage = async ({ domain, context }) => {
  if (!createdById[domain] && !loading[domain]) {
    loading[domain] = true;
    try {
      const {
        data: { allPages },
      } = await context.executeGraphQL({
        context,
        query: `
          query {
            allPages {
              user {
                id
              }
            }
          }
        `,
      });
      createdById[domain] = allPages ? allPages[0].user.id : null;
      console.log("cache", domain, createdById[domain], allPages);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }
};
const sellerItemRead = async ({
  existingItem = {},
  authentication,
  context,
}) => {
  if (existingItem.isDraft) return false;
  const { item: user } = authentication;
  const domain = getDomain(context);
  getPage({ domain, context });
  if (user) {
    if (user.isAdmin) return true;
    if (user.isSeller) return { createdBy: { id: user.id } };
  }
  const author = createdById[domain]
    ? { id: createdById[domain] }
    : { page: { domain_contains: domain } };
  return {
    createdBy: author,
  };
};
const sellerItem = {
  read: sellerItemRead,
  create: userIsSeller,
  update: ownItem,
  delete: ownItem,
};

const publicItemRead = ({ authentication, context }) => {
  const { item: user } = authentication;
  const domain = getDomain(context);
  getPage({ domain, context });
  if (user) {
    if (user.isAdmin) return true;
    if (user.isSeller)
      return {
        of: { id: user.id },
        of_is_null: false,
      };
    const author = createdById[domain]
      ? { id: createdById[domain] }
      : { page: { domain_contains: domain } };
    return { OR: [{ createdBy: author }, { of: author }] };
  }
  return {
    createdBy_is_null: true,
    of: { page: { domain_contains: domain } },
  };
};
const publicItem = {
  /**
   * Các Model sử dụng phân quyền này cần có field of.
   */
  read: publicItemRead,

  create: allCanMutation,
  update: allCanMutation,
  delete: allCanMutation,
};
function getDomain(context = {}) {
  if (context.req)
    if (context.req.headers)
      if (context.req.headers.referer) {
        const { referer } = context.req.headers;
        const domain = referer.split("/")[2] || referer;
        return domain;
      } else console.log(context.req.headers.referer);
    else console.log(context.req.headers);
  else console.log(context.req);
  throw new Error("Truy cập bị từ chối");
}
module.exports = { sellerItem, publicItem, user };
