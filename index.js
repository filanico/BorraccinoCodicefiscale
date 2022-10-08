'use strict';
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;

//const serverless = require('serverless-http');
app.use(cors())
app.listen(port, () => console.log("Server started !"))

app.get('/', function(req, res) {
  const search = req.query.search.toUpperCase();
  console.log("Searching: " + (search ?? 'any'));
  console.log('Search: ' + search);
  const dictionary = JSON.parse(fs.readFileSync('dictionary.json'));
  let words = dictionary;
  if (search)
    words = words.filter(x => {
      var [[codice, citta]] = Object.entries(x);
      return citta.startsWith(search)
    });
  res.json(words);
  //res.send("OK");
})


//module.exports.handler = serverless(app);