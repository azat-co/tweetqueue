var mongoskin = require('mongoskin'),
  superagent = require('superagent'),
  util = require('util'),
  dbUrl = process.env.MONGOHQ_URL,
  consumerKey = process.env.CONSUMER_KEY,
  consumerSecret = process.env.CONSUMER_SECRET,
  username = process.env.USERNAME,
  userToken = process.env.USER_TOKEN,
  userSecret = process.env.USER_SECRET

var db = mongoskin.db(dbUrl, {safe:true})

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

db.collection('tweets').findOne({published:false}, function(e, tweet){
  console.log (tweet)
  if (e) {
    return console.error(e)
    process.exit(1)
  }
  if (!tweet) {
    console.log('No data')
    process.exit(1)
  }
  oauth.post(
    'https://api.twitter.com/1.1/statuses/update.json',
    userToken,
    userSecret, 
    {status: tweet.text},
    function(e, data, res) {
      if (e) {
        return console.error(e)
        process.exit(1)
      }
      console.log(util.inspect(data))
      if (typeof data === 'string') try {data = JSON.parse(data)} catch(e) {}
      db.collection('tweets').updateById(tweet._id, {
        $set: {
          published: true, 
          statusId: data.id_str, 
          created_at: data.created_at
        }}, function(e, count){
        if (e) {
          return console.error(e)
          process.exit(1)
        }
        if (count === 1) {
          console.info('posted: ', data.text)
          process.exit(0)
        }
      })
    }
  )  
})
