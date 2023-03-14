const Baza = require("./baza.js")
var VratiPodaci = [];

class FilmDAO {

    constructor() {
        this.baza = new Baza();
    }

    daj = async function(id){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM `film` INNER JOIN zanr_filma ON film.id=zanr_filma.film_id INNER JOIN zanr ON zanr_filma.zanr_id=zanr.id INNER JOIN korisnik ON film.korisnik_id=korisnik.id WHERE film.id = ?;"
        var podaci = [id];
        VratiPodaci = await this.baza.vratiJedno(sql, podaci);
        this.baza.zatvoriVezu();
        if(VratiPodaci != undefined)
        {
            return VratiPodaci;
        }
        else
        {
            return null;
        }
    }

    dajSve = async function(stranica, broj, datum, idZanr, naziv, sortiraj) {
        this.baza.spojiSeNaBazu();
        let zadnjiFilm = parseInt(stranica*broj);
        let prviFilm = parseInt(zadnjiFilm-broj);
        let podaci = [zadnjiFilm, prviFilm]
        let sql = "SELECT * FROM `film` INNER JOIN zanr_filma ON film.id=zanr_filma.film_id INNER JOIN zanr ON zanr_filma.zanr_id=zanr.id INNER JOIN korisnik ON film.korisnik_id=korisnik.id WHERE film.id <= ? AND film.id > ?"
        if(datum != undefined)
        {
            const poljeDatuma = datum.split(".");
            datum = poljeDatuma[2] + "-" + poljeDatuma[1] + "-" + poljeDatuma[0]
            const date = new Date()
            let dan = date.getDate();
            let mjesec = date.getMonth() + 1;
            let godina = date.getFullYear();
            let danasnjiDatum = godina+"-"+mjesec+"-"+dan
            podaci.push(datum)
            podaci.push(danasnjiDatum)
            sql += " AND film.datum_unosa >= ? AND film.datum_unosa <= ?"
        }
        if(idZanr != undefined)
        {
            podaci.push(idZanr)
            sql += " AND zanr.id = ?"
        }
        if(naziv != undefined)
        {
            naziv = '%' + naziv + '%'
            sql += " AND film.naziv LIKE ?"
            podaci.push(naziv)
        }
        if(sortiraj != undefined)
        {
            switch(sortiraj) {
                case "d":
                    sql += " ORDER BY film.datum_unosa ASC"
                    break
                case "n":
                    sql += " ORDER BY film.naziv ASC"
                    break
                case "z":
                    sql += " ORDER BY zanr.zanr_ime ASC"
                    break
            }
        }
        else
        {
            sql += " ORDER BY film.id ASC"
        }
        console.log(sql);
        VratiPodaci = await this.baza.vratiSve(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    azuriraj = async function (id, film){
        this.baza.spojiSeNaBazu();
        let sql = "UPDATE film SET"
        let podaci = []
        var prethodno = false;
        if(film.naziv != "") {
            sql += " naziv=?"
            podaci.push(film.naziv)
            prethodno = true;
        }
        if(film.datum != "")
        {
            if(prethodno)
                sql += ","
            let polje = film.datum.split(".")
            let datumPromjena = polje[2] + "-" + polje[1] + "-" + polje[0]
            sql += " datum_unosa=?"
            podaci.push(datumPromjena)
            prethodno = true;
        }
        if(film.trajanje != "")
        {
            if(prethodno)
                sql += ","
            sql += " trajanje=?"
            podaci.push(film.trajanje)
            prethodno = true;
        }
        if(film.status != "")
        {
            if(prethodno)
                sql += ","
            sql += " status=?"
            podaci.push(film.status)
            prethodno = true;
        }
        if(film.budzet != "")
        {
            if(prethodno)
                sql += ","
            sql += " budzet=?"
            podaci.push(film.budzet)
            prethodno = true;
        }
        if(film.jezik != "")
        {
            if(prethodno)
                sql += ","
            sql += " jezik=?"
            podaci.push(film.jezik)
            prethodno = true;
        }
        if(film.org_naziv != "")
        {
            if(prethodno)
                sql += ","
            sql += " originalni_naziv=?"
            podaci.push(film.org_naziv)
            prethodno = true;
        }
        if(film.opis != "")
        {
            if(prethodno)
                sql += ","
            sql += " opis=?"
            podaci.push(film.opis)
            prethodno = true;
        }
        if(film.ocjena != "")
        {
            if(prethodno)
                sql += ","
            sql += " ocjena=?"
            podaci.push(film.ocjena)
            prethodno = true;
        }
        if(film.broj_glasova != "")
        {
            if(prethodno)
                sql += ","
            sql += " broj_glasova=?"
            podaci.push(film.broj_glasova)
            prethodno = true;
        }
        if(film.prihodi != "")
        {
            if(prethodno)
                sql += ","
            sql += " prihodi=?"
            podaci.push(film.prihodi)
            prethodno = true;
        }
        if(film.godina != "")
        {
            if(prethodno)
                sql += ","
            sql += " godina_izlaska=?"
            podaci.push(film.godina)
        }
        sql += " WHERE id=?"
        podaci.push(id)
        VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    obrisi = async function (id){
        this.baza.spojiSeNaBazu();
        let sql = "DELETE FROM film WHERE id=?"
        var podaci = [id];
        VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }
}

module.exports = FilmDAO;