const FilmoviPretrazivanje = require("./filmoviPretrazivanje.js");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js")
let auth = new Autentifikacija();
let fp = new FilmoviPretrazivanje();

exports.aktvacijaRacuna = async function (zahtjev, odgovor) {
    console.log(zahtjev.query);
    let korime = zahtjev.query.korime;
    let kod = zahtjev.query.kod;

    let poruka = await auth.aktivirajKorisnickiRacun(korime, kod);
    console.log(poruka)
    if (poruka.status == 200) {
        odgovor.redirect("/prijava")
    } else {
        odgovor.send(await poruka.text());
    }
}

exports.dajZanrove = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dajZanrove())
}

exports.dajFilm = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dajFilm(zahtjev.params.id))
}

exports.dajFilmove = async function (zahtjev, odgovor) {
    if(zahtjev.query.zanr == null && zahtjev.query.datum == null && zahtjev.query.sortiraj != null)
    {
        odgovor.json(await fp.dajFilmove(zahtjev.query.sortiraj))
    }
    else if(zahtjev.query.zanr != null && zahtjev.query.datum == null && zahtjev.query.sortiraj == null)
    {
        odgovor.json(await fp.dajFilmove(null, zahtjev.query.zanr))
    }
    else if(zahtjev.query.zanr == null && zahtjev.query.datum != null && zahtjev.query.sortiraj == null)
    {
        odgovor.json(await fp.dajFilmove(null, null, zahtjev.query.datum))
    }
    else if(zahtjev.query.zanr != null && zahtjev.query.datum != null && zahtjev.query.sortiraj == null)
    {
        odgovor.json(await fp.dajFilmove(null, zahtjev.query.zanr, zahtjev.query.datum))
    }
    else if(zahtjev.query.zanr != null && zahtjev.query.datum == null && zahtjev.query.sortiraj != null)
    {
        odgovor.json(await fp.dajFilmove(zahtjev.query.sortiraj, zahtjev.query.zanr))
    }
    else if(zahtjev.query.zanr == null && zahtjev.query.datum != null && zahtjev.query.sortiraj != null)
    {
        odgovor.json(await fp.dajFilmove(zahtjev.query.sortiraj, zahtjev.query.datum))
    }
    else if(zahtjev.query.zanr != null && zahtjev.query.datum != null && zahtjev.query.sortiraj != null)
    {
        odgovor.json(await fp.dajFilmove(zahtjev.query.sortiraj, zahtjev.query.zanr, zahtjev.query.datum))
    }
    else
    {
        odgovor.json(await fp.dajFilmove())
    }
}

exports.obrisiZanrove = async function (zahtjev, odgovor) {
    odgovor.json(await fp.obrisiZanrove())
}

exports.promijeniZanrove = async function (zahtjev, odgovor) {
    odgovor.json(await fp.promijeniZanrove(zahtjev.query.staroZanr, zahtjev.query.novoZanr))
}

exports.dajSveZanrove = async function (zahtjev, odgovor) {
    console.log("fetchUpravitelj dajSveZanrove")
    odgovor.json(await fp.dohvatiSveZanrove());
}
exports.dajDvaFilma = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiNasumceFilm(zahtjev.query.zanr))
}

exports.provjeraAktiviran = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiTOTP(zahtjev.query.korime, zahtjev.query.lozinka))
}

exports.getJWT = async function (zahtjev, odgovor) {
    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        let k = { korime: jwt.dajTijelo(zahtjev.session.jwt).korime };
        let noviToken = jwt.kreirajToken(k)
        odgovor.send({ ok: noviToken });
        return
    } 
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neaoutorizirani pristup" });
        } else {
            let str = zahtjev.query.str;
            let filter = zahtjev.query.filter;
            console.log(zahtjev.query)
            odgovor.json(await fp.dohvatiFilmove(str,filter))
        }
}

exports.dodajFilm = async function (zahtjev, odgovor) {
    console.log(zahtjev.body);
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        odgovor.json({ greska: "neaoutorizirani pristup" });
     } else {
        //TODO obradi zahtjev
        odgovor.json({ok: "OK"});
     }
}

exports.dodajZanr = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dodajZanr(zahtjev.query.id, zahtjev.query.ime))
}

exports.provjeriOdjavu = async function (zahtjev, odgovor) {
    odgovor.json(await fp.provjeriOdjavu())
}

exports.odjavi = async function (zahtjev, odgovor) {
    odgovor.json(await fp.odjavi(zahtjev.query.id, zahtjev.query.aktivan))
}

exports.dajProfil = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dajProfil(zahtjev.query.korime))
}

exports.enkriptirajLozinku = async function (zahtjev, odgovor) {
    odgovor.json(await auth.dajSHA(zahtjev.query.lozinka, zahtjev.query.korime))
}

exports.azurirajKorisnika = async function (zahtjev, odgovor) {
    odgovor.json(await fp.azurirajKorisnika(zahtjev.query.korime, zahtjev.query.ime, zahtjev.query.prezime, zahtjev.query.lozinka))
}

exports.provjeriUlogu = async function (zahtjev, odgovor) {
    odgovor.json(await fp.provjeriUlogu())
}

exports.azurirajFilm = async function(zahtjev, odgovor) {
    odgovor.json(await fp.azurirajFilm(zahtjev.query.id, zahtjev.query.naziv, zahtjev.query.trajanje, zahtjev.query.datum, zahtjev.query.budzet, zahtjev.query.prihodi, zahtjev.query.jezik, zahtjev.query.org_naziv, zahtjev.query.opis, zahtjev.query.ocjena, zahtjev.query.broj_glasova, zahtjev.query.status, zahtjev.query.godina))
}

exports.dajKorisnike = async function(zahtjev, odgovor) {
    odgovor.json(await fp.dajKorisnike())
}

exports.azurirajKorisnikaAdmin = async function(zahtjev, odgovor) {
    odgovor.json(await fp.azurirajKorisnikaAdmin(zahtjev.query.korime, zahtjev.query.ime, zahtjev.query.prezime, zahtjev.query.totp, zahtjev.query.uloga))
}

exports.blokirajKorisnika = async function (zahtjev, odgovor) {
    odgovor.json(await fp.blokirajKorisnika(zahtjev.query.id, zahtjev.query.broj))
}

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if(zahtjev.method == "POST") {
        var korime = zahtjev.query.korime;
        var lozinka = zahtjev.query.lozinka;
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
                await auth.korisnikAktivan(JSON.stringify(jsonKorisnik.id), 1)
                return;
            
            }
        }
        else
        {
            greska = "Korisnik ne postoji"
        }
    }
    odgovor.send(JSON.stringify(greska));
}

exports.registracija = async function (zahtjev, odgovor) {
    console.log("..........")
    let ime = zahtjev.query.ime;
    let prezime = zahtjev.query.prezime;
    let lozinka = zahtjev.query.lozinka;
    let email = zahtjev.query.email;
    let korime = zahtjev.query.korime;
    let greska = "";
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(ime, prezime, lozinka, email, korime);
        if (uspjeh) {
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
        }
    }
    odgovor.send(JSON.stringify(greska));
}