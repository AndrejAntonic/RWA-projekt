const FilmDAO = require("./filmDAO.js")

function provjeraPodataka(korime, lozinka)
{
    let regexKorime = /^(?=.*[A-z].*[A-z])(?=.*\d.*\d)[a-zA-Z0-9\S]{15,20}$/
    let regexLozinka = /^(?=.*[A-z].*[A-z].*[A-z])(?=.*\d.*\d.*\d)(?=.*\W.*\W.*\W)[a-zA-Z0-9\S]{20,100}$/
    if(!regexKorime.test(korime) || !regexLozinka.test(lozinka))
    {
        return 1;
    }
}

exports.getFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmDAO();
    let id = zahtjev.params.id;
    let regex = /^[0-9]*$/
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if(regex.test(id))
    {
        fdao.daj(id).then((film) => {
            console.log(film);
            odgovor.send(JSON.stringify(film));
        })
    }
    else
    {
        odgovor.status(417)
        let poruka = { greska: "neočekivani podaci"}
        odgovor.send(JSON.stringify(poruka));
    }
}

exports.postFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id
    let regex = /^[0-9]*$/
    let podaci = zahtjev.body
    let fdao = new FilmDAO()
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if (regex.test(id)) {
        fdao.azuriraj(id, podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka))
        })
    }
    else
    {
        odgovor.status(417)
        let poruka = { greska: "neočekivani podaci"}
        odgovor.send(JSON.stringify(poruka));
    }
}

exports.deleteFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmDAO();
    let id = zahtjev.params.id;
    let regex = /^[0-9]*$/
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if (regex.test(id)) {
        fdao.obrisi(id).then((poruka) => {
            odgovor.send(JSON.stringify(poruka))
        })
    }
    else
    {
        odgovor.status(417)
        let poruka = { greska: "neočekivani podaci"}
        odgovor.send(JSON.stringify(poruka));
    }
}

exports.getFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let stranica = zahtjev.query.stranica;
    let broj = zahtjev.query.brojFilmova;
    let datum = zahtjev.query.datum;
    let idZanr = zahtjev.query.zanr;
    let naziv = zahtjev.query.naziv;
    let sortiraj = zahtjev.query.sortiraj;
    let regexDatum = /\d{2}(\.)\d{2}(\.)\d{4}/
    let regexidZanr = /^[0-9]*$/
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if(stranica == undefined || broj == undefined)
    {
        odgovor.status(417)
        let poruka = { greska: "neocekivani podaci"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if(sortiraj != undefined && sortiraj != "d" && sortiraj != "n" && sortiraj != "z")
    {
        odgovor.status(417)
        let poruka = { greska: "neocekivani podaci"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if(datum != undefined && regexDatum.test(datum) == false)
    {
        odgovor.status(417)
        let poruka = { greska: "neocekivani podaci"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if(idZanr != undefined && regexidZanr.test(idZanr) == false)
    {
        odgovor.status(417)
        let poruka = { greska: "neocekivani podaci"}
        odgovor.send(JSON.stringify(poruka))
    }
    else
    {
    let fdao = new FilmDAO();
    fdao.dajSve(stranica, broj, datum, idZanr, naziv, sortiraj).then((filmovi) => {
        console.log(filmovi)
        odgovor.status(200);
        odgovor.send(JSON.stringify(filmovi));
    })
}
}

exports.postFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let poruka = { greska: "2"}
    odgovor.send(JSON.stringify(poruka))
}

exports.putFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405)
    let poruka = { greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka))
}

exports.deleteFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405)
    let poruka = { greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka))
}