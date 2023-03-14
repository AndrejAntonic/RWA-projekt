const sqlite3 = require("sqlite3").verbose();
var BazaPodaci = [];

class Baza {

    constructor() {
        this.db = null;
        //db.exec("PRAGMA foreign_keys = ON;");
    }

    vratiSve(sql, podaci = []){
        BazaPodaci = [];
        return new Promise(resolve => {
            this.db.all(sql, podaci, (err, rows) => {
                if(err)
                    throw err;
                rows.forEach((row) => {
                    BazaPodaci.push(row);
                })
                resolve(BazaPodaci);
            })
        })
    }

    vratiJedno(sql, podaci = []){
        BazaPodaci = [];
        return new Promise(resolve => {
            this.db.get(sql, podaci, (err, row) => {
                if(err)
                    throw err;
                BazaPodaci = row;
                resolve(BazaPodaci);
            })
        })
    }

    dodajAzurirajObrisi(sql, podaci = []){
        this.db.run(sql, podaci, function(err) {
            if(err)
                throw err;
        })
        return true;
    }

    
    spojiSeNaBazu(){
         this.db = new sqlite3.Database("./baza.sqlite", sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log("Greška: ", err);
            }
        });
    }

    zatvoriVezu() {
        this.db.close();
    }

    /*
    ucitajPodatkeZaBazu() {
        let podaciTekst = ds.readFileSync(konst.podaciZaBazu, "UTF-8");
        this.podaciBaza = JSON.parse(podaciTekst);
    }

    izvrsiUpit(sql, podaciZaSQL, povratnaFunkcija) {
        this.vezathis.DB.query(sql, podaciZaSQL, povratnaFunkcija);
    }

    izvrsiUpit(sql, podaciZaSQL) {
        return new Promise((uspjeh, neuspjeh) => {
            this.vezathis.DB.query(sql, podaciZaSQL,(greska, rezultat) => {
                if(greska)
                    neuspjeh(greska);
                else
                    uspjeh(rezultat);
            });
        });
    }

    zatvoriVezu() {
        this.vezathis.DB.close();
    }
    */
}

module.exports = Baza;