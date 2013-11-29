var mongoskin = require('mongoskin'),
  async = require('async'),
  dbUrl = process.env.MONGOHQ_URL,
  fs = require('fs')
  split = require('split')
  through = require('through')

var db = mongoskin.db(dbUrl, {safe: true})
var lines = 0 
var tweets = 0
var feedToDb = through(function(buf) {
  lines ++
  var text = buf.toString()
  db.collection('tweets').insert({text: text, published: false}, function (e, tweet) {
    if (e) {
      console.log (e)
      process.exit(1)
    }
    tweets ++
    if (lines === tweets) {
      console.log ("Success: ", tweets)
      process.exit(0)
    }
  })  
})
fs.createReadStream('data.txt').pipe(split()).pipe(feedToDb)