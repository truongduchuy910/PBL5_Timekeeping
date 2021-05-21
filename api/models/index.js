var user = require("./User");
var shift = require("./Shift");
var work = require("./Work");
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
    this.keystone.createList("Shift", { ...shift, plugins: [at, by] });
    this.keystone.createList("Work", { ...work, plugins: [at, by] });
  }
}
module.exports = { Models };
