var express = require('express')
var Twitter = require('twitter')
var CronJob = require('cron').CronJob

var app = express()
var twitter = new Twitter({
  consumer_key: 'xGW5uT7pNVjIjqLkUQ5TmkEXB',
  consumer_secret: '7zsZIFa03sGkmPtUtCpBA2cCM1KjREx4v9OP309H01Z7G1EkEt',
  access_token_key: '1119780727053094912-TYyknGvA5pUsWGLaEELEILoq2sCx1X',
  access_token_secret: 'ijYd1RZ23CBJIdS2SQt8CTBjeHxr8CEPngHNNRuAbhkEG'
})

var cronTime = '0 * * * * *'
new CronJob({
  cronTime: cronTime,
  onTick: function(){
    cycleTweet()
  },
  start: true
})

var tipsArray = [
  "朝食べるたんぱく質がトリプトファンになり、昼間にセロトニンになり、夜メラトニンになります。朝食に納豆味噌汁焼き魚は理にかなっているわけです",
  "ふつうに食事をとっていても女性は鉄分が不足しがちです。サプリメントで補いましょ う",
  "1日に3食取るようになったのは江戸時代の元禄年間からです。照明器具の発達で夜まで活動できるようになったからです。それまでは2食が普通でした",
  "2016年カナダとオーストラリアの共同研研究で、アルコールの腸内環境や脳への悪影響が 立証されました。酒は百薬の長論は完全否定されました",
  "人類は遠い昔にビタミンCを生成する能力を失いました。現代人はさらにビタミンB3（ナイアシン）の生成能力を失いつつあります",
  "生野菜を食べるとき、葉野菜は洗いましょう。農薬だけでなく軟体動物の這った痕などさまざまな因子がついています。外食チェーンの生サラダでは洗っていないでしょう",
  "現代医学は症状を悪としてそれに対抗するように薬を次々と開発してきました。特に国民皆保険の日本人は簡単に薬を欲しがります。結果、本来の免疫力は弱ってしまったといえます",
   "スーパーの刺身売り場で、ブロックでなく切り身で売っているものは相当量のエタノール をふりかけて切っています",
   "むかしは二人にひとりもの割合で癌になったでしょうか。アルツハイマーや難病患者がますます増えています。死ぬ病は減りましたが死ねない病が増えました。医学は発達しているのでしょうか",
   "お酒を控える基準に誰もが γ-GPT を気にしています。しかし本当に悪影響があるのは脳 に対してです。健康診断ではわかりません",
   "精白した米や小麦にはほとんど栄養素が入っていません。医師の玄米主食率が高いのは本当です",
   "ノンカロリー、ノンシュガーと謳っている製品は本当に良いのでしょうか。それらの原材料名一覧をご覧ください。代わりにアセスルファムK、アスパルテームなどの人工甘味料が入っています",
  "食事、運動は自分でコントロールできますが 睡眠 はそうもいかない場合があります。睡眠薬には依存性の重篤なものが多いので、医師の処方を盲信せず自分で調べることが大切です",
  "精神的不調のほとんどは休息と食事療法で治癒できます。基本は高たんぱく低糖質です。 女性は鉄分も。ちなみに医大では食事療法について学びません",
  "ランニング等有酸素運動はとても良い運動です。しかし運動したあとにビールは美味しいですが、脱水状態のうえにさらに脱水効効果の大きな飲料物を摂るわけですからカラダには危険行為です",
  "お酒もタバコも（ただし添加物無添加のもの）、違法ですが大麻ですら、 時々嗜む程度なら問題ないのです。毎日摂取することが問題なのです。「 合法だから問題ない」わけではないです"
]

function cycleTweet(){
  var tips = tipsArray[Math.floor(Math.random() * tipsArray.length)]

  twitter.post('statuses/update', {status: tips},
  (err, tweet, response)=>{
    if(err){
      return console.log(err)
    }else{
      return console.log(tweet)
    }
  })
}

app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
  res.send('Hello World')
})
app.listen(app.get('poet'), function(){
  console.log("Node app is running at localhost:" + app.get('port'))
})
