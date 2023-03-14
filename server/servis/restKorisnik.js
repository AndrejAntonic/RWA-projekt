const KorisnikDAO = require("./korisnikDAO.js");

function provjeraPodataka(korime, lozinka)
{
    let regexKorime = /^(?=.*[A-z].*[A-z])(?=.*\d.*\d)[a-zA-Z0-9\S]{15,20}$/
    let regexLozinka = /^(?=.*[A-z].*[A-z].*[A-z])(?=.*\d.*\d.*\d)(?=.*\W.*\W.*\W)[a-zA-Z0-9\S]{20,100}$/
    if(!regexKorime.test(korime) || !regexLozinka.test(lozinka))
    {
        return 1;
    }
}

exports.getKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else {
        let kdao = new KorisnikDAO();
        kdao.dajSve().then((korisnici) => {
            console.log(korisnici);
            odgovor.send(JSON.stringify(korisnici));
        });
    }
}

exports.postKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    kdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
    }
}

exports.deleteKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    let korimePoslano = zahtjev.params.korime;
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    kdao.daj(korimePoslano).then((korisnik) => {
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    });
}
}

exports.postKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    let korimePoslano = zahtjev.params.korime;
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    kdao.daj(korimePoslano).then((korisnik) => {
        console.log(korisnik)
        console.log(zahtjev.body)
        if(korisnik!=null && korisnik.lozinka==zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else{ 
            odgovor.status(401)
            odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
        }
    });
}
}

exports.postKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let korimePoslano = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    kdao.azuriraj(korimePoslano, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.putKorisnikAdmin = function(zahtjev, odgovor) {
    odgovor.type("application/json")
    let korimePoslano = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    kdao.azurirajAdmin(korimePoslano, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.putBlokiraj = function(zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    kdao.blokiraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.getAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let korimePoslano = zahtjev.params.korime;
    let kod = zahtjev.body.aktivacijskiKod;
    let korime = zahtjev.query.korime;
    let lozinka = zahtjev.query.lozinka;
    let provjera = provjeraPodataka(korime, lozinka);
    if(provjera == 0)
    {
        odgovor.status(400)
        let poruka = { greska: "nevaljan zahtjev"}
        odgovor.send(JSON.stringify(poruka))
    }
    else if(korimePoslano == undefined || kod == undefined)
    {
        odgovor.status(417)
        let poruka = { greska: "neocekivani podaci"}
        odgovor.send(JSON.stringify(poruka))
    }
    else{
    let kdao = new KorisnikDAO();
    kdao.aktiviraj(korimePoslano, kod).then((poruka) => {
        odgovor.status(200)
        poruka = { uspjesno: "racun je aktiviran"}
        odgovor.send(JSON.stringify(poruka))
    })
}
}

exports.postAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putPrijavaOdjava = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id
    let aktivan = zahtjev.body.aktivan
    let kdao = new KorisnikDAO();
    kdao.aktivanPromjena(id, aktivan).then((poruka) => {
        odgovor.status(200)
        poruka = { uspjesno: "uspjesno"}
        odgovor.send(JSON.stringify(poruka))
    })
}

exports.putProvjeraAktivacije = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let korime = zahtjev.params.korime
    let lozinka = zahtjev.query.lozinka
    let kdao = new KorisnikDAO();
    kdao.aktiviran(korime, lozinka).then((poruka) => {
        if(poruka)
        {
            console.log(poruka)
            odgovor.status(200)
            odgovor.send(JSON.stringify(poruka))
        }
        else
        {
            console.log(poruka)
            odgovor.status(401)
            odgovor.send(JSON.stringify(poruka))
        }
    })
}

exports.getAktivan = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    kdao.dohvatiAktivan().then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.getUloga = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    kdao.dohvatiUlogu().then((poruka) => {
        console.log(poruka)
        odgovor.send(JSON.stringify(poruka));
    })
}