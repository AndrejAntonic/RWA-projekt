const ds = require("fs/promises");
const fs = require("fs")
const path = require("path")

class Konfiguracija {
    constructor() {
        this.konf = {};
    }

    dajKonf() {
        return this.konf;
    }

    async dajPort() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        var port = dohvatiPort(podaci)
        return port;
    }

    async dajRestPort() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        var port = dohvatiRestPort(podaci)
        return port;
    }

    async ucitajKonfiguraciju() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        this.konf = pretvoriJSONkonfig(podaci);
        console.log(this.konf);
    }
}

function pretvoriJSONkonfig(podaci) {
    //console.log(podaci);
    let konf = {};
    var nizPodataka = podaci.split("\n");
    let regexKorime = /^(?=.*[A-z].*[A-z])(?=.*\d.*\d)[a-zA-Z0-9\S]{15,20}$/
    let regexLozinka = /^(?=.*[A-z].*[A-z].*[A-z])(?=.*\d.*\d.*\d)(?=.*\W.*\W.*\W)[a-zA-Z0-9\S]{20,100}$/
    let regexBrojStranica = /\b([5-9]|[1-9][0-9]|100)\b/
    var prvo = nizPodataka[0].split("=");
    for (let podatak of nizPodataka) {
        var podatakNiz = podatak.split("=");
        var naziv = podatakNiz[0];
        var vrijednost = podatakNiz[1];
        if(naziv == "rest.korime" && !regexKorime.test(vrijednost))
        {
            console.log(naziv + " sadrži neispravnu vrijednost!")
            console.log("Vrijednost mora biti veličine 20-100 znakova, dozvoljeni su slova i brojke. Obavezno 2 slova i 2 brojke")
            process.exit();
        }
        else if(naziv == "rest.lozinka" && !regexLozinka.test(vrijednost))
        {
            console.log(naziv + " sadrži neispravnu vrijednost!")
            console.log("Vrijednost mora biti veličine 20-100 znakova, dozvoljen je bilo koji znak. Obavezno 3 slova, 3 brojke i 3 specijalna znaka")
            process.exit();
        }
        else if(naziv == "app.broj.stranica" && !regexBrojStranica.test(vrijednost))
        {
            console.log(naziv + " sadrži neispravnu vrijednost!")
            console.log("Vrijednost mora biti broj 5-100")
            process.exit();
        }
        konf[naziv] = vrijednost;
    }
    return konf;
}

function dohvatiPort(podaci) {
    var nizPodataka = podaci.split("\n")
    var port = nizPodataka[6].split("=");
    return port[1];
}

function dohvatiRestPort(podaci) {
    var nizPodataka = podaci.split("\n")
    var port = nizPodataka[5].split("=");
    return port[1];
}

module.exports = Konfiguracija;