const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const totp = require("./moduli/totp.js")
const Autentifikacija = require("./autentifikacija.js")
const korisnikProvjera = require("../servis/restKorisnik.js")
let auth = new Autentifikacija();
let url = "http://localhost:12005";

exports.pocetna = async function (zahtjev, odgovor) {
    let pocetna = await ucitajStranicu("pocetna")
    odgovor.send(pocetna);
}

exports.dokumentacija = async function (zahtjev, odgovor) {
    let dokumentacija = await ucitajStranicu("../../dokumentacija/dokumentacija")
    odgovor.send(dokumentacija);
}

exports.registracija = async function (zahtjev, odgovor) {
    console.log(zahtjev.body)
    let greska = "";
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (uspjeh) {
            odgovor.redirect("/prijava");
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
        }
    }

    let stranica = await ucitajStranicu("registracija", greska);
    odgovor.send(stranica);
}

exports.odjava = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("odjava")
    odgovor.send(stranica)
};

exports.profil = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("profil")
    odgovor.send(stranica)
}

exports.filmoviAzuriranje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_azuriranje")
    odgovor.send(stranica)
}

exports.film = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("film")
    odgovor.send(stranica)
}

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if(zahtjev.method == "POST") {
        console.log("---------------------------------")
        var korime = zahtjev.query.korime;
        var lozinka = zahtjev.body.lozinka;
        console.log(korime);
        console.log(lozinka);
        console.log("---------------------")
        var korisnik = await auth.prijaviKorisnika(korime, lozinka)
        
        if(korisnik)
        {
            var jsonKorisnik = JSON.parse(korisnik)
            var blokiran = JSON.stringify(jsonKorisnik.blokiran)
            if(blokiran == 1)
            {
                greska = "Korisnik je blokiran!"
            }
            else {
                var aktiviran = JSON.stringify(jsonKorisnik.aktiviran)
                if (aktiviran == 0) {
                    greska = "Korisnik nije aktiviran!"
                }
                else {/*
                    var TOTPkljucbaza = jsonKorisnik.TOTPkljuc
                    var TOTPkljucdan = zahtjev.body.totp
                    if (!totp.provjeriTOTP(TOTPkljucdan, TOTPkljucbaza)) {
                        greska = "TOTP ključ nije dobar"
                    }
                    else {
                        await auth.korisnikAktivan(JSON.stringify(jsonKorisnik.id), 1)
                        odgovor.redirect("/");
                        return;
                    }*/
                    await auth.korisnikAktivan(JSON.stringify(jsonKorisnik.id), 1)
                    greska = "Prijavljen"
                    //odgovor.redirect("/");
                    return;
                }
            }
        }
        else
        {
            greska = "Korisnik ne postoji"
        }
    }
    odgovor.send(JSON.stringify(greska));
    /*
    let stranica = await ucitajStranicu("prijava", greska);
    odgovor.send(stranica)
    */
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pretrazivanje");
    odgovor.send(stranica);
}

exports.filmoviPregled = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pregled")
    odgovor.send(stranica)
}

exports.zanrovi = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("zanrovi")
    odgovor.send(stranica)
}

exports.korisnici = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("korisnici")
    odgovor.send(stranica)
}

async function ucitajStranicu(nazivStranice, poruka = "") {
    let stranice = [ucitajHTML(nazivStranice),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}