const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

class Webservice {
  static URL = 'https://www1.agenziaentrate.gov.it';
  static instance = null;
  static Get() {
    if (Webservice.instance == null) {
      Webservice.instance = new Webservice();
    }
    return Webservice.instance;
  }

  constructor() {

  }

  async api(uri, data) {
    const method = typeof (data) === 'undefined' ? 'GET' : 'POST';
    const apiClient = axios.default.create({
      baseURL: Webservice.URL,
    });
    const html = (await apiClient.get(uri, {
      method,
      body: data
    })).data;
    const $ = cheerio.load(html);
    const nodes = $('tr');
    var data = [];
    nodes.each(function() {
      const tds = $(this).find('td');
      var [codice, citta] = tds.map(function() {
        return $(this).text().trim();
      })
      if (codice !== undefined && citta !== undefined) {
        data.push(
          ({ [codice]: citta })
        );
      }
    })
    return data;
  }
}



(async () => {
  const letters = Array.from('qwertyuiopasdfghjklzxcvbnm').slice(0, 9999999).map(l => l.toUpperCase())
  const dictFilepath = 'dictionary.json';
  let dictObject = [];
  fs.writeFileSync(dictFilepath, '');


  /**/
  var jobs = letters.map(l => new Promise((res, rej) => {
    Webservice
      .Get()
      .api('/servizi/codici/ricerca/VisualizzaTabella.php?iniz=' + l + '&ArcName=COM-ICI')
      .then(data => {
        //console.log(data)
        //console.log(l);
        console.log("Lettera " + l + ": OK")
        res([l, data]);
      })
      .catch(err => {
        //console.log("JOB WORKER ERROR: " + err); 
        res([l, []]);
      })
      ;
  })
  );

  Promise.all(jobs)
    .then(dataset => {
      console.log("Promise all jobs are over !")
      dataset.forEach(entry => {
        var [letter, data] = entry;
        dictObject = dictObject.concat(data); // = [...dictObject, ...data];
      })
      fs.writeFileSync(dictFilepath, JSON.stringify(dictObject));
    })
    .catch(err => console.log("ERRORE PROMISE: " + err))
    ;


})();

