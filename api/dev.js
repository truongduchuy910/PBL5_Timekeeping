const crypto = require("crypto");

const secret = "tranngochuy";
const hmac = crypto.createHmac("sha256", secret);
hash = hmac.update("I love cupcakes").digest("hex");
console.log(hash);
