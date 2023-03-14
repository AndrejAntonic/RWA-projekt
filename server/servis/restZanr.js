const ZanrDAO = require("./zanrDAO.js")


function provjeraPodataka(korime, lozinka)
{
    let regexKorime = /^(?=.*[A-z].*[A-z])(?=.*\d.*\d)[a-zA-Z0-9\S]{15,20}$/
    let regexLozinka = /^(?=.*[A-z].*[A-z].*[A-z])(?=.*\d.*\d.*\d)(?=.*\W.*\W.*\W)[a-zA-Z0-9\S]{20,100}$/
    if(!regexKorime.test(korime) || !regexLozinka.test(lozinka))
    {
        return 1;
    }
}


exports.getZanrovi = async function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
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
        await zdao.dajSve().then((zanrovi) => {
            console.log(zanrovi);
            odgovor.send(JSON.stringify(zanrovi))
    })
}
}

exports.postZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
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
    zdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka))
    })
}
}

exports.putZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
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
    zdao.obrisiSve().then((poruka) => {
        odgovor.send(JSON.stringify(poruka))
    })
}
}

exports.getZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
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
        zdao.daj(id).then((zanr) => {
            console.log(zanr);
            odgovor.send(JSON.stringify(zanr));
        })
    }
    else {
        odgovor.status(417)
        let poruka = { greska: "neočekivani podaci" }
        odgovor.send(JSON.stringify(poruka));
    }
}

exports.postZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405)
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let regex = /^[0-9]*$/
    let zdao = new ZanrDAO();
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
        zdao.azuriraj(id, podaci).then((poruka) => {
            odgovor.send(JSON.stringify(poruka))
        })
    }
    else {
        odgovor.status(417)
        let poruka = { greska: "neočekivani podaci" }
        odgovor.send(JSON.stringify(poruka));
    }
}

exports.deleteZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
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
        zdao.obrisi(id).then((poruka) => {
            odgovor.send(JSON.stringify(poruka))
        })
    }
    else {
        odgovor.status(417)
        let poruka = { greska: "neočekivani podaci" }
        odgovor.send(JSON.stringify(poruka));
    }
}