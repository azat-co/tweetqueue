> Queue your tweets.

# Tweet Queue

This small script designed to be use with Heroku and its Scheduler and MongoHQ addons. You can easily save tweets using MongoHQ web interface and publish them every 10 minutes, every hour or every day.

# Usage

## Keys

Create an app at <http://dev.twitter.com>  and copy keys to `.evn`. Use `heroku config:push` to sync them with the cloud. 

## Scheduler

Use scheduler and MongoHQ. The MongoHQ colleciton name must be `tweets` and the format:

```
text: "Hello World!",
published: false
```



After the publishing, you can see status ID and the time in the collection.
