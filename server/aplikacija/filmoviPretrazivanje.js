const konst = require("../konstante.js");
//const portRest = require(konst.dirPortova + "portovi_rest.js").aantonic20;
const portRest = 12258;
const url = "http://localhost:" + portRest + "/api";
const kodovi = require("./moduli/kodovi.js")
class FilmoviZanroviPretrazivanje {

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec
        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }

    async dohvatiSveZanrove() {
        //TODO čitaj iz ispravnog servisa
        let odgovor = await fetch(url + "/tmdb/zanr");
        let podaci = await odgovor.text();
        let zanrovi = JSON.parse(podaci).genres;
        console.log("filmoviPretrazivanje dohvatiSveZanrove")
        console.log(zanrovi);
        return zanrovi;
    }

    async dajZanrove() {
        //TODO čitaj iz ispravnog servisa
        let odgovor = await fetch(url + "/zanr");
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async dajFilmove(sortiraj = null, zanr = null, datum = null) {
        if(sortiraj != null && zanr == null && datum == null)
        {
            return this.dajSortiraneFilmove(sortiraj)
        }
        else if(sortiraj == null && zanr != null && datum == null)
        {
            return this.dajFilmoveZanr(zanr);
        }
        else if(sortiraj == null && zanr == null && datum != null)
        {
            return this.dajFilmoveDatum(datum)
        }
        else if(sortiraj == null && zanr != null && datum != null)
        {
            return this.dajFilmoveZanrDatum(zanr, datum)
        }
        else if(sortiraj != null && zanr != null && datum == null)
        {
            return this.dajFilmoveSortiranoZanr(sortiraj, zanr)
        }
        else if(sortiraj != null && zanr == null && datum != null)
        {
            return this.dajFilmoveSortiranoDatum(sortiraj, datum)
        }
        else if(sortiraj != null && zanr != null && datum != null)
        {
            return this.dajFilmoveSortiranoZanrDatum(sortiraj, zanr, datum)
        }
        else
        {
            return this.dajSveFilmove()
        }
    }

    async dajSortiraneFilmove(sortiraj)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&sortiraj=" + sortiraj)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajFilmoveZanr(zanr)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&zanr=" + zanr)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajFilmoveDatum(datum)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&datum=" + datum)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajFilmoveZanrDatum(zanr, datum)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&zanr=" + zanr + "&datum=" + datum)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajFilmoveSortiranoZanr(sortiraj, zanr)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&zanr=" + zanr + "&sortiraj=" + sortiraj)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajFilmoveSortiranoDatum(sortiraj, datum)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&datum=" + datum + "&sortiraj=" + sortiraj)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajFilmoveSortiranoZanrDatum(sortiraj, zanr, datum)
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&zanr=" + zanr + + "&datum=" + datum +"&sortiraj=" + sortiraj)
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async dajSveFilmove()
    {
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100")
        console.log(odgovor)
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci)
        return filmovi;
    }

    async obrisiZanrove() {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'DELETE',
            headers: zaglavlje
        }
        let odgovor = await fetch(url + "/zanr", parametri)
        console.log(odgovor)
        let podaci = await odgovor.text()
        console.log(podaci)
        let obrisano = JSON.parse(podaci);
        return obrisano
    }

    async promijeniZanrove(staroZanr, novoZanr) {
        console.log(staroZanr)
        console.log(novoZanr)
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            novoZanr: novoZanr
        }
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch(url + "/zanr/"+staroZanr, parametri)
    }

    async dajFilm(id) {
        let odgovor = await fetch(url+"/filmovi/"+id);
        let podaci = await odgovor.text();
        let film = JSON.parse(podaci)
        return film
    }

    async dodajZanr(id, ime) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            id: id,
            ime: ime
        }
        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch(url + "/zanr/", parametri)
    }

    async dohvatiNasumceFilm(zanr) {
        //TODO čitaj iz ispravnog servisa
        let odgovor = await fetch(url + "/filmovi/?stranica=1&brojFilmova=100&zanr="+zanr);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let broj = Object.keys(filmovi).length
        let rez
        if(broj == 0)
        {
            rez = [undefined, undefined]
        }
        else
        {
        rez = [filmovi[kodovi.dajNasumceBroj(0,broj)],
                    filmovi[kodovi.dajNasumceBroj(0,broj)]];
        }

        return rez;
    }

    async provjeriOdjavu() {
        let odgovor = await fetch(url+"/aktivan/");
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci)
        return korisnik
    }

    async provjeriUlogu() {
        let odgovor = await fetch(url+"/uloga")
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci)
        return korisnik
    }

    async odjavi(id, aktivan) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            aktivan: aktivan
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + portRest + "/api/korisnici/" + id + "/prijavaOdjava", parametri)
    }
    
    async dajProfil(korime) {
        let odgovor = await fetch(url+"/korisnici/"+korime)
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci)
        return korisnik
    }

    async azurirajKorisnika(korime, ime, prezime, lozinka)
    {
        if(ime != "" && prezime == "" && lozinka == "")
            this.promijeniIme(korime, ime)
        else if(ime == "" && prezime != "" && lozinka == "")
            this.promijeniPrezime(korime, prezime)
        else if(ime == "" && prezime == "" && lozinka != "")
            this.promijeniLozinku(korime, lozinka)
        else if(ime != "" && prezime != "" && lozinka == "")
            this.promijeniImePrezime(korime, ime, prezime)
        else if(ime != "" && prezime == "" && lozinka != "")
            this.promijeniImeLozinku(korime, ime, lozinka)
        else if(ime == "" && prezime != "" && lozinka != "")
            this.promijeniPrezimeLozinku(korime, prezime, lozinka)
        else if(ime != "" && prezime != "" && lozinka != "")
            this.promijeniSve(korime, ime, prezime, lozinka)
    }

    async promijeniIme(korime, ime) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            ime: ime
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async promijeniPrezime(korime, prezime) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            prezime: prezime
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async promijeniLozinku(korime, lozinka) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            lozinka: lozinka
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async promijeniImePrezime(korime, ime, prezime) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            ime: ime,
            prezime: prezime
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async promijeniImeLozinku(korime, ime, lozinka) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            ime: ime,
            lozinka: lozinka
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async promijeniPrezimeLozinku(korime, prezime, lozinka) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            prezime: prezime,
            lozinka: lozinka
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async promijeniSve(korime, ime, prezime, lozinka) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            ime: ime,
            prezime: prezime,
            lozinka: lozinka
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisnici/"+korime, parametri)
    }

    async azurirajFilm(id, naziv, trajanje, datum, budzet, prihodi, jezik, org_naziv, opis, ocjena, broj_glasova, status, godina) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            naziv: naziv,
            trajanje: trajanje,
            datum: datum,
            budzet: budzet,
            prihodi: prihodi,
            jezik: jezik,
            org_naziv: org_naziv,
            opis: opis,
            ocjena: ocjena,
            broj_glasova: broj_glasova,
            status: status,
            godina: godina
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/filmovi/"+id, parametri)
    }

    async azurirajKorisnikaAdmin(korime, ime, prezime, totp, uloga) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            ime: ime,
            prezime: prezime,
            totp: totp,
            uloga: uloga
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/korisniciAdmin/"+korime, parametri)
    }

    async blokirajKorisnika(id, broj){
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let tijelo = {
            broj: broj
        };
        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        return await fetch(url+"/blokiraj/"+id, parametri)
    }

    async dajKorisnike() {
        let odgovor = await fetch(url+"/korisnici")
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci)
        return korisnik
    }

/*
    async dohvatiNasumceFilm(zanr) {
        //TODO čitaj iz ispravnog servisa
        let odgovor = await fetch(url + "/tmdb/filmovi?stranica=1&kljucnaRijec=love");
        let podaci = await odgovor.text();
        console.log(podaci)
        let filmovi = JSON.parse(podaci);
        //console.log(filmovi)
        let rez = [filmovi.results[kodovi.dajNasumceBroj(0,1)],
                    filmovi.results[kodovi.dajNasumceBroj(0,1)]];
        return rez;
    */
}



module.exports = FilmoviZanroviPretrazivanje;