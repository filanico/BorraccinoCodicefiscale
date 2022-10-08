use strict; 
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;
const portRange = [80,8080];

//const serverless = require('serverless-http');
app.use(cors())
let portRangeIndex=0;
let failed=false
do{  
  try{
    failed=false
    app.listen(portRange[portRangeIndex++], () => console.log("Server started !"))
    console.log("SUCCESS - server running on port "+portRange[portRangeIndex-1]);
  } catch(failure){
    console.log("ERROR - failed using port "+portRange[portRangeIndex-1]);
    failed=true;
  }
} while(failed);

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