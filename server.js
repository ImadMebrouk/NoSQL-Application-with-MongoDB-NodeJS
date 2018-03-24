const express = require('express')
const app = express()
const request = require('request');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://arthurTh:root12@ds115546.mlab.com:15546/dblp_nosql', (err, database) => {
	if (err) return console.log(err)
  	db = database.db('dblp_nosql')
  	app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    //res.sendFile(__dirname + "/index.html");
    var result = []
    res.render('index.ejs', {publis2: result})
});


app.post('/', (req, res) => {
  var title = req.body.title;
  var type = req.body.type;
  var author = req.body.author;
  var year = req.body.year;
  year = parseInt(year)

  if( isNaN(year) == false && year > 1900){
    var query = {"title" : {'$regex': title, '$options': 'i'}, 
    "type" : {'$regex': type, '$options': 'i'}, 
    "authors" : {'$regex': author, '$options': 'i'}, 
    "year" : year};
  }
  else{
    var query = {"title" : {'$regex': title, '$options': 'i'}, 
    "type" : {'$regex': type, '$options': 'i'}, 
    "authors" : {'$regex': author, '$options': 'i'}};
  }

  console.log(year);
  console.log(query);
    db.collection('publis2').find(query).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {publis2: result})
  //console.log(result);
  })

})


/* 
 var word1 = /Machine learning/i;
app.get('/', (req, res) => {
	var query = { title : word1 };
  	db.collection('publis2').find(query).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {publis2: result})
  console.log(result)
  })
})*/
