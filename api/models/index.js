var momoBusiness = require("./Momo/Business");
var momoRequest = require("./Momo/Request");
var payment = require("./Payment");
var messengerUser = require("./Messenger/User");
var messengerMessaging = require("./Messenger/Messaging");
var activity = require("./Activity");
var user = require("./User");
var notificationGroup = require("./Notification/Group");
var notification = require("./Notification");
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
    this.keystone.createList("MessengerUser", messengerUser);
    this.keystone.createList("MessengerMessaging", messengerMessaging);
    this.keystone.createList("Activity", { ...activity, plugins: [at] });
    this.keystone.createList("NotificationGroup", notificationGroup);
    this.keystone.createList("Notification", notification);
    this.keystone.createList("MomoBusiness", momoBusiness);
    this.keystone.createList("MomoRequest", {
      ...momoRequest,
      plugins: [at, by],
    });
    this.keystone.createList("Payment", { ...payment, plugins: [at] });
  }
}
module.exports = { Models };
