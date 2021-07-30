var axios = require("axios").default;
const { Keystone } = require("@itoa/keystone");
const { GraphQLClient, gql } = require("graphql-request");
const Extension = require("../../Extension");
const express = require("express");
class Messenger extends Extension {
  constructor(keystone) {
    super(keystone);
  }
  static url = {
    messenger: "https://graph.facebook.com",
    keystone:
      process.env.NODE_END === "production"
        ? "https://api.itoa.vn/admin/api"
        : "http://localhost:7009/admin/api",
  };
  /**
   * Use axios to request
   */
  static async send({ psid, access_token, text }) {
    const { data } = await axios.post(
      `https://graph.facebook.com/v10.0/me/messages?access_token=${access_token}>`,
      {
        recipient: { id: psid },
        messaging_type: "MESSAGE_TAG",
        tag: "POST_PURCHASE_UPDATE",
        message: {
          text,
        },
      }
    );
    return data;
  }
  /**
   * https://developers.facebook.com/docs/messenger-platform/identity/user-profile/
   **/
  static async getProfileInfo({ psid, access_token, fields }) {
    const { data } = await axios.get(
      `${Messenger.url.messenger}/${psid}?fields=${fields}&access_token=${access_token}`
    );
    return data;
  }

  schemas = {};
  /**
   * @param {express.Router} app
   * @returns {express.Router}
   */
  webhook(app, url = "/messenger/webhook") {
    /**
     * WEBHOOK_VERIFIED
     */
    console.log(url);
    app.get(url, (req, res) => {
      console.log("WEBHOOK_SUBSCRIBE");
      try {
        let mode = req.query["hub.mode"];
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];
        if (mode && token) {
          if (mode === "subscribe" && token === "itoa.vn") {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
          } else {
            res.sendStatus(403);
          }
        } else {
          res.status(403).send("Missing info!");
        }
      } catch (e) {
        res.send(e.toString());
      }
    });
    /**
     * EVENT RECEIVE
     */
    app.post(url, (req, res) => {
      let body = req.body;
      if (body.object === "page") {
        /**
         *
         */
        body.entry.forEach((entry) => this.models(entry));
        res.status(200).send("EVENT_RECEIVED");
      } else {
        res.sendStatus(404);
      }
    });
    return app;
  }

  client = new GraphQLClient(Messenger.url.keystone, { headers: {} });
  /**
   * @param {Array} psids
   */
  async allMessengerUsers(condition) {
    const { allMessengerUsers } = await this.client.request(
      gql`
        query($condition: MessengerUserWhereInput) {
          allMessengerUsers(where: $condition) {
            id
            psid
            access_token
            full_name
          }
        }
      `,
      { condition }
    );
    return allMessengerUsers;
  }
  async createMessengerUser(data) {
    const { createMessengerUser } = await this.client.request(
      gql`
        mutation($data: MessengerUserCreateInput) {
          createMessengerUser(data: $data) {
            id
            psid
            access_token
            full_name
          }
        }
      `,
      { data }
    );
    return createMessengerUser;
  }
  async updateMessengerUser(variables) {
    const { updateMessengerUser } = await this.client.request(
      gql`
        mutation($id: ID!, $data: MessengerUserUpdateInput) {
          updateMessengerUser(id: $id, data: $data) {
            id
          }
        }
      `,
      variables
    );

    return updateMessengerUser;
  }
  async createMessengerMessaging(data) {
    const { createMessengerMessaging } = await this.client.request(
      gql`
        mutation($data: MessengerMessagingCreateInput) {
          createMessengerMessaging(data: $data) {
            id
            timestamp
          }
        }
      `,
      { data }
    );

    return createMessengerMessaging;
  }
  /**
   * Processing method for each entry object
   * Only models can solve error (log)
   */
  async models(entry) {
    const messaging = entry.messaging[0];
    const { page, person } = await this.getUsers(messaging);
    await this.save({ page, person, messaging });
  }
  async getUsers(messaging) {
    var page = { psid: null },
      person = { psid: null };
    try {
      const is_echo = Boolean(messaging.message.is_echo);
      if (is_echo) {
        page.psid = messaging.sender.id;
        person.psid = messaging.recipient.id;
      } else {
        page.psid = messaging.recipient.id;
        person.psid = messaging.sender.id;
      }
      // find one or create page
      const [messengerUserPage] = await this.allMessengerUsers({
        psid: page.psid,
      });
      page = messengerUserPage
        ? messengerUserPage
        : await this.createMessengerUser({
            psid: page.psid,
            isPage: true,
            isPerson: false,
          });
      // find one or create person
      const [messengerUserPerson] = await this.allMessengerUsers({
        psid: person.psid,
      });
      if (messengerUserPerson) person = messengerUserPerson;
      else {
        // get info
        if (page.access_token) {
          const info = await Messenger.getProfileInfo({
            psid: person.psid,
            access_token: page.access_token,
            fields: `name`,
          });
          person.full_name = info.name;
        }
        person = await this.createMessengerUser({
          full_name: person.full_name,
          psid: person.psid,
          isPage: false,
          isPerson: true,
          of: { connect: { id: page.id } },
        });

        if (page.access_token) {
          const status = await Messenger.send({
            psid: person.psid,
            access_token: page.access_token,
            text: `🎉 Chào mừng ${person.full_name || `bạn`} đến với itoa.vn`,
          });
          console.log("Chào mừng", status);
        }
      }
    } catch (e) {
      console.error(JSON.stringify(e));
    }
    return { page, person };
  }
  async save({ page, person, messaging }) {
    const is_echo = Boolean(messaging.message.is_echo);
    if (!is_echo) {
      try {
        const { message, timestamp } = messaging;
        const {
          nlp: { entities },
        } = message;
        if (entities.email) {
          const email = entities.email[0].value;
          this.updateMessengerUser({ id: person.id, data: { email: email } });
          console.log(
            "Email",
            await Messenger.send({
              psid: person.psid,
              access_token: page.access_token,
              text: `Cảm ơn bạn đã cung cấp email.`,
            })
          );
        }
        if (entities.phone_number) {
          const phone = entities.phone_number[0].value;
          this.updateMessengerUser({ id: person.id, data: { phone: phone } });
          console.log(
            "Email",
            await Messenger.send({
              psid: person.psid,
              access_token: page.access_token,
              text: `Cảm ơn bạn đã cung cấp Số điện thoại liên hệ.`,
            })
          );
        }
        // save message
        const data = await this.createMessengerMessaging({
          page: {
            connect: { id: page.id },
          },
          person: {
            connect: { id: person.id },
          },
          message: message.text,
          timestamp: String(timestamp),
        });
        console.log("createMessengerMessaging", data);
      } catch (e) {
        console.error(JSON.stringify(e));
      }
    }
  }
}

module.exports = Messenger;
