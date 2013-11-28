var superagent = require('superagent'),
  util = require('util'),
  dbUrl = process.env.MONGOHQ_URL,
  consumerKey = process.env.CONSUMER_KEY,
  consumerSecret = process.env.CONSUMER_SECRET,
  username = process.env.USERNAME,
  userToken = process.env.USER_TOKEN,
  userSecret = process.env.USER_SECRET

var nodeOauth = require('oauth')
var oauth = new nodeOauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  consumerKey,
  consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
)

// oauth.get(
//   'https://api.twitter.com/1.1/trends/place.json?id=23424977',
//   userToken, //test user token
//   userSecret, //test user secret            
//   function(e, data, res) {
//     if (e) console.error(e);
//     console.log(util.inspect(data));
//   }
// );
oauth.post(
  'https://api.twitter.com/1.1/statuses/update.json',
  userToken,
  userSecret, {
    status: "Oh my..."
  },
  function(e, data, res) {
    if (e) console.error(e);
    console.log(util.inspect(data));
  }
)