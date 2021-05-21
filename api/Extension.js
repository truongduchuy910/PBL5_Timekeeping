const { Keystone } = require("@keystonejs/keystone");

class Extension {
  keystone;
  /**
   * @param {Keystone} keystone
   */
  constructor(keystone) {
    this.keystone = keystone;
  }
}
module.exports = Extension;
