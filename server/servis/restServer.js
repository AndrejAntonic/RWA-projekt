const konst = require("../konstante.js");
const sqlite3 = require("sqlite3").verbose();
const express = require(konst.dirModula + 'express');
const Konfiguracija = require("../konfiguracija");
//const portovi = require(konst.dirPortova + "portovi_rest.js");
const restKorisnik = require("./restKorisnik.js")
const restFilm = require("./restFilm.js")
const restZanr = require("./restZanr.js")
const RestTMDB = require("./restTMDB.js");
const fs = require("fs")
const path = require("path")
const cors = require("cors")
let konf = new Konfiguracija();

//const port = portovi.aantonic20;
let port = ""
//const db = new sqlite3.Database('baza.sqlite');
const server = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
}

async function dohvatiPort() {
    port = await konf.dajRestPort();
}

dohvatiPort();

konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    //console.log(greska);
    if(process.argv.length == 2){
        console.error("Potrebno je dati naziv datoteke");
    } else if(konf.ucitajKonfiguraciju() == false){
        console.error("Nemere");
    }else {
        console.error("Nije moguće otvoriti datoteku: "+greska.path);
    }
    process.exit();
});

function pokreniServer(){
    server.use(cors());
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    pripremiPutanjeKorisnici();
    pripremiPutanjeTMDB();
    pripremiPutanjeFilm();
    pripremiPutanjeZanrovi();

    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = {"greska":"Nema resursa!"};
        odgovor.json(poruka);
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function pripremiPutanjeTMDB(){
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr",restTMDB.getZanr.bind(restTMDB));
    server.get("/api/tmdb/filmovi",restTMDB.getFilmovi.bind(restTMDB));
}

function pripremiPutanjeKorisnici(){
    server.get("/api/korisnici",restKorisnik.getKorisnici);
    server.post("/api/korisnici",restKorisnik.postKorisnici);
    server.put("/api/korisnici",restKorisnik.putKorisnici);
    server.delete("/api/korisnici",restKorisnik.deleteKorisnici);

    server.get("/api/korisnici/:korime",restKorisnik.getKorisnik);
    server.post("/api/korisnici/:korime",restKorisnik.postKorisnik);
    server.put("/api/korisnici/:korime",restKorisnik.putKorisnik);
    server.delete("/api/korisnici/:korime",restKorisnik.deleteKorisnik);

    server.get("/api/korisnici/:korime/aktivacija", restKorisnik.getAktivacija);
    server.post("/api/korisnici/:korime/aktivacija", restKorisnik.postAktivacija);
    server.put("/api/korisnici/:korime/aktivacija", restKorisnik.putAktivacija);
    server.delete("/api/korisnici/:korime/aktivacija", restKorisnik.deleteAktivacija);

    server.get("/api/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
    server.post("/api/korisnici/:korime/prijava",restKorisnik.postKorisnikPrijava);
    server.put("/api/korisnici/:korime/prijava", restKorisnik.putKorisnikPrijava);
    server.delete("/api/korisnici/:korime/prijava", restKorisnik.deleteKorisnikPrijava);

    server.put("/api/korisnici/:id/prijavaOdjava", restKorisnik.putPrijavaOdjava)
    server.get("/api/aktivan",restKorisnik.getAktivan);
    server.get("/api/uloga", restKorisnik.getUloga)
    server.put("/api/korisniciAdmin/:korime", restKorisnik.putKorisnikAdmin)
    server.put("/api/blokiraj/:id", restKorisnik.putBlokiraj)
}

function pripremiPutanjeFilm(){
    server.get("/api/filmovi", restFilm.getFilmovi);
    server.post("/api/filmovi", restFilm.postFilmovi);
    server.put("/api/filmovi", restFilm.putFilmovi);
    server.delete("/api/filmovi", restFilm.deleteFilmovi);

    server.get("/api/filmovi/:id",restFilm.getFilm);
    server.post("/api/filmovi/:id",restFilm.postFilm);
    server.put("/api/filmovi/:id",restFilm.putFilm);
    server.delete("/api/filmovi/:id",restFilm.deleteFilm);
}

function pripremiPutanjeZanrovi(){
    server.get("/api/zanr",restZanr.getZanrovi);
    server.post("/api/zanr",restZanr.postZanrovi);
    server.put("/api/zanr",restZanr.putZanrovi);
    server.delete("/api/zanr",restZanr.deleteZanrovi);

    server.get("/api/zanr/:id",restZanr.getZanr);
    server.post("/api/zanr/:id",restZanr.postZanr);
    server.put("/api/zanr/:id",restZanr.putZanr);
    server.delete("/api/zanr/:id",restZanr.deleteZanr);
}