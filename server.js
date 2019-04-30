var express = require('express')
var Twitter = require('twitter')
var CronJob = require('cron').CronJob
var mysql = require('mysql')

var app = express()
var twitter = new Twitter({
  consumer_key: process.env['CONSUMER_KEY'],
  consumer_secret: process.env['CONSUMER_SECRET'],
  access_token_key: process.env['ACCESS_TOKEN_KEY'],
  access_token_secret: process.env['ACCESS_TOKEN_SECRET']
})

var cronTime = '0 * * * * *'
new CronJob({
  cronTime: cronTime,
  onTick: function(){
    cycleTweet()
  },
  start: true
})

//MySQL in Appデータベースの接続詞
var connectionString = process.env.MYSQLCONNSTR_localdb;
var host = /Data Source=([0-9\.]+)\:[0-9]+\;/g.exec(connectionString)[1];
var port = /Data Source=[0-9\.]+\:([0-9]+)\;/g.exec(connectionString)[1];
var database = /Database=([0-9a-zA-Z]+)\;/g.exec(connectionString)[1];
var username = /User Id=([a-zA-z0-9\s]+)\;/g.exec(connectionString)[1];
var password = /Password=(.*)/g.exec(connectionString)[1];

var exampleSql = "";

var connection = mysql.createConnection({
  host :host,
  port :port,
  user :username,
  password :password,
  database :database,
  debug: true
});

function cycleTweet(){
  connection.query('select tips from tips order by rand() limit 1',
  function(err, rows){
    if(err){
      return console.log(err)
    }else{
      tips = rows[0].tips
      console.log(tips)

      twitter.post('statuses/update',{status:tips},(err, tweet, response)=>{
        if(err){
          return console.log(err)
        }else{
          return console.log(tweet)
        }
      })
    }
  })
}

app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
  res.send('Hello World')
})

//Twitter webhook用URL
var crypto = require('crypto');

app.get('/webhook/twitter', function(req,res){
  var crc_token = req.query.crc_token;
  if(!crc_token){
    res.send('Error: crc_token missing from request.')
  }else{
    var signature = crypto.createHmac('sha256', process.env['CONSUMER_SECRET']).update(crc_token).digest('base64')

    console.log('recieve crc check. token=${crc_token} res=${signature}')
    res.satus(200);
    // res.json({response_token: 'sha256=${signature}'})
    res.send({
      response_token: 'sha256=' + signature
    })
  }
})

app.listen(app.get('poet'), function(){
  console.log("Node app is running at localhost:" + app.get('port'))
})
