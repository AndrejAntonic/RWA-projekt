const konst= require("../konstante.js");
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula+'express-session')
const kolacici = require(konst.dirModula+'cookie-parser')
const Konfiguracija = require("../konfiguracija");
//const portovi = require(konst.dirPortova + "portovi.js");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const path = require("path")
//const port = portovi.aantonic20;
let konf = new Konfiguracija();
let port = ""
const server = express();
const cors = require("cors");

async function dohvatiPort() {
    port = await konf.dajPort();
}

dohvatiPort();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
}

function pokreniServer() {

    server.use(cors());
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));
    
    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();
    pripremiPutanjeZadaca();

    server.use(express.static("public"));
    server.use("/multimedija", express.static(path.dirname(__dirname) + "/multimedija"))
    server.use("/dokumentacija", express.static(path.dirname(__dirname) + "/dokumentacija"))
    server.use("/js", express.static(__dirname + "/js"));
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        console.log(konf.dajKonf());
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

function pripremiPutanjePocetna() {
    server.get("/", htmlUpravitelj.pocetna);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
}

function pripremiPutanjePretrazivanjeFilmova() {
    server.get('/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeAutentifikacija() {
    server.get("/registracija", htmlUpravitelj.registracija);
    //server.post("/registracija", htmlUpravitelj.registracija);
    server.post("/registracija", fetchUpravitelj.registracija);
    server.get("/odjava", htmlUpravitelj.odjava);
    server.get("/prijava", htmlUpravitelj.prijava);
    //server.post("/prijava", htmlUpravitelj.prijava);
    server.post("/prijava", fetchUpravitelj.prijava)
    server.get("/getJWT", fetchUpravitelj.getJWT);
    server.get("/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);
}

function pripremiPutanjeZadaca() {
    server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
    server.get("/filmoviPregled", htmlUpravitelj.filmoviPregled);
    server.get("/zanrovi", htmlUpravitelj.zanrovi);
    server.get("/dajZanrove", fetchUpravitelj.dajZanrove)
    server.get("/obrisiZanrove", fetchUpravitelj.obrisiZanrove)
    server.get("/promijeniZanrove", fetchUpravitelj.promijeniZanrove)
    server.get("/profil", htmlUpravitelj.profil)
    server.get("/dajFilmove", fetchUpravitelj.dajFilmove)
    server.get("/dajFilm/:id", fetchUpravitelj.dajFilm)
    server.post("/dodajZanr", fetchUpravitelj.dodajZanr)
    server.get("/provjeriOdjavu", fetchUpravitelj.provjeriOdjavu)
    server.put("/odjavi",fetchUpravitelj.odjavi)
    server.get("/dajProfil",fetchUpravitelj.dajProfil)
    server.get("/enkriptirajLozinku",fetchUpravitelj.enkriptirajLozinku)
    server.put("/azurirajKorisnika",fetchUpravitelj.azurirajKorisnika)
    server.get("/film", htmlUpravitelj.film)
    server.get("/provjeriUlogu", fetchUpravitelj.provjeriUlogu)
    server.get("/filmoviAzuriranje", htmlUpravitelj.filmoviAzuriranje)
    server.put("/azurirajFilm", fetchUpravitelj.azurirajFilm)
    server.get("/korisnici", htmlUpravitelj.korisnici)
    server.get("/dajKorisnike", fetchUpravitelj.dajKorisnike)
    server.put("/azurirajKorisnikaAdmin",fetchUpravitelj.azurirajKorisnikaAdmin)
    server.put("/blokirajKorisnika", fetchUpravitelj.blokirajKorisnika)
}
