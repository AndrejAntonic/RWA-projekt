const konst = require("../konstante.js");
const mail = require("./moduli/mail.js")
const kodovi = require("./moduli/kodovi.js")
//const portRest = require(konst.dirPortova + "portovi_rest.js").aantonic20;
const portRest = 12258;
const totp = require("./moduli/totp.js")
class Autentifikacija {
    async dodajKorisnika(ime, prezime, lozinka, email, korime) {
        let tijelo = {
            ime: ime,
            prezime: prezime,
            lozinka: kodovi.kreirajSHA256(lozinka, "moja sol" + korime),
            email: email,
            korime: korime
        };

        let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
        tijelo["aktivacijskiKod"] = aktivacijskiKod;
        let tajniTOTPkljuc = totp.kreirajTajniKljuc(korime);
        tijelo["TOTPkljuc"] = tajniTOTPkljuc;

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici", parametri)

        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            console.log(tijelo);
            let mailPoruka = "aktivacijski kod:" + aktivacijskiKod
                + " http://localhost:12005/aktivacijaRacuna?korime=" + korime + "&kod=" + aktivacijskiKod
            mailPoruka += " TOTP Kljuc: " + tajniTOTPkljuc;
            let poruka = await mail.posaljiMail("aantonic20@student.foi.hr", email,
                "Aktivacijski kod", mailPoruka);
            return true;
        } else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async aktivirajKorisnickiRacun(korime, kod) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        }

        return await fetch("http://localhost:" + portRest + "/api/korisnici/" + korime + "/aktivacija", parametri)
    }

    async prijaviKorisnika(korime, lozinka) {
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol" + korime);
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici/" + korime + "/prijava", parametri)
        console.log(odgovor)
        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

    async dajSHA(lozinka, korime)
    {
        return kodovi.kreirajSHA256(lozinka, "moja sol" + korime)
    }
    
    async korisnikAktivan(id, aktivan) {
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
}

module.exports = Autentifikacija;