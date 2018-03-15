const express = require('express')
const app = express()
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

app.get('/', (req, res) => {
	var query = { title : /Machine learning/i };
  	db.collection('publis').find(query).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {publis: result})
  })
})



