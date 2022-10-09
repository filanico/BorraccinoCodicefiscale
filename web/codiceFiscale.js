function calcolaCodice(nome,cognome,giorno,mese,anno,sesso,codice_citta){
    nome = nome.toLowerCase();
    cognome = cognome.toLowerCase();
    // consonanti cognome - 1a, la 3a e la 4a 
    var vocali = ['a','e','i','o','u'];
    var codiceFiscale = '';
    
    var consCognome = Array.from(cognome).filter( c => !vocali.includes(c)).filter(c => c !== ' ');
    var consNome = Array.from(nome).filter( c => !vocali.includes(c)).filter(c => c !== ' ');
    var vocaliCognome = Array.from(cognome).filter( c => vocali.includes(c)).filter(c => c !== ' ');
    var vocaliNome = Array.from(nome).filter( c => vocali.includes(c)).filter(c => c !== ' ');
    
    // _COGNOME
    codiceFiscale += [...consCognome, ...vocaliCognome].slice(0,3).join('')
    codiceFiscale = codiceFiscale.padEnd(3,'x');
    
    // _NOME
    if( consNome.length>=4 )
        codiceFiscale += consNome[0]+consNome[2]+consNome[3];
    else {
        codiceFiscale += [...consNome,...vocaliNome].slice(0,3).join('')
    }
    codiceFiscale = codiceFiscale.padEnd(6,'x');

    //_ ANNO NASCITA
    codiceFiscale += new String(anno).substr(-2)

    //_ MESE 
    var codiceMesi=Array.from('abcdehlmprst');
    codiceFiscale += codiceMesi[parseInt(mese)-1];

    // GIORNO NASCITA
    switch(sesso){
        case 'M':
            codiceFiscale += new String(giorno).padStart(2,'0')
            break;
        case 'F':
            codiceFiscale += new String(parseInt(giorno)+40).padStart(2,'0')
            break;
    }

    // CITTA
    codiceFiscale += codice_citta;

   return codiceFiscale;
}