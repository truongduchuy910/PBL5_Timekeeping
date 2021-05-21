var user = require("./User");
/**
 *
 */
const { byTracking, atTracking } = require("@keystonejs/list-plugins");

const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const Extension = require("../Extension");

/**
 * Models làm biến đổi tham chiếu keystonejs
 */
class Models extends Extension {
  /**
   *
   * @param {Keystone} keystone
   * @returns {Keystone}
   */

  createAuth() {
    this.authStrategy = this.keystone.createAuthStrategy({
      type: PasswordAuthStrategy,
      list: "User",
      config: {
        identityField: "phone", // default: 'email'
        secretField: "password", // default: 'password'
      },
    });
  }
  createList() {
    /**
     * DEFAULT PLUGIN
     */
    const at = atTracking();
    const by = byTracking();
    /**
     * USER
     */
    this.keystone.createList("User", user);
  }
}
module.exports = { Models };
