import { __decorate } from "tslib";
import { Component } from '@angular/core';
let KorisniciComponent = class KorisniciComponent {
    constructor(korisniciServis) {
        this.korisniciServis = korisniciServis;
    }
    ;
    ngOnInit() {
        this.provjeraUloga();
    }
    async provjeraUloga() {
        let main = document.getElementById("glavni");
        let ulogiran = await this.korisniciServis.provjeraUloga();
        if (ulogiran)
            this.ucitajKorisnike();
        else
            main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!";
    }
    async ucitajKorisnike() {
        let main = document.getElementById("lista");
        let prikaz = "";
        for (let p of await this.korisniciServis.dohvatiKorisnike()) {
            prikaz += "<li> ID: " + p.id + " Korisničko ime: " + p.korime + "</li>";
        }
        main.innerHTML = prikaz;
        ;
    }
    async ucitajPodatke() {
        let korime = document.getElementById("korime_input").value;
        let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime);
        let main = document.getElementById("azuriranje");
        let poruka = document.getElementById("poruka");
        if (korisnik == null || korime == "") {
            if (korisnik == null)
                poruka.innerHTML = "<b>Korisnik ne postoji</b>";
            else
                poruka.innerHTML = "";
            let id_label = document.getElementById("id_label");
            id_label.innerHTML = "ID: ";
            let lozinka_label = document.getElementById("lozinka_label");
            lozinka_label.innerHTML = "Lozinka: ";
            let email_label = document.getElementById("email_label");
            email_label.innerHTML = "E-mail: ";
            let ime_label = document.getElementById("ime_label");
            ime_label.innerHTML = "Ime: ";
            let prezime_label = document.getElementById("prezime_label");
            prezime_label.innerHTML = "Prezime: ";
            let totp_label = document.getElementById("totp_label");
            totp_label.innerHTML = "TOTP ključ: ";
            let uloga_label = document.getElementById("uloga_label");
            uloga_label.innerHTML = "Uloga: ";
        }
        else {
            if (korisnik.blokiran == 1)
                poruka.innerHTML = "<b>Korisnik je blokiran</b>";
            else
                poruka.innerText = "";
            let id_label = document.getElementById("id_label");
            id_label.innerHTML = "ID: " + korisnik.id;
            let lozinka_label = document.getElementById("lozinka_label");
            lozinka_label.innerHTML = "Lozinka: " + korisnik.lozinka;
            let email_label = document.getElementById("email_label");
            email_label.innerHTML = "E-mail: " + korisnik.email;
            let ime_label = document.getElementById("ime_label");
            ime_label.innerHTML = "Ime: " + korisnik.ime + " -> ";
            let prezime_label = document.getElementById("prezime_label");
            prezime_label.innerHTML = "Prezime: " + korisnik.prezime + " -> ";
            let totp_label = document.getElementById("totp_label");
            totp_label.innerHTML = "TOTP ključ: " + korisnik.TOTPkljuc + " -> ";
            let uloga_label = document.getElementById("uloga_label");
            uloga_label.innerHTML = "Uloga: " + korisnik.uloga_id + " -> ";
        }
    }
    async blokirajKorisnika() {
        let korime = document.getElementById("korime_input").value;
        let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime);
        let poruka = document.getElementById("gumbPoruka");
        if (korime == "" || korisnik == null)
            poruka.innerHTML = "Korisnik ne postoji!";
        else if (korisnik.blokiran == 0)
            await this.korisniciServis.blokirajOdblokirajKorisnika(korisnik.id, 1);
        else if (korisnik.blokiran == 1)
            await this.korisniciServis.blokirajOdblokirajKorisnika(korisnik.id, 0);
        this.ucitajPodatke();
    }
    async azuriranjeKorisnika() {
        let korime = document.getElementById("korime_input").value;
        let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime);
        let poruka = document.getElementById("gumbPoruka");
        if (korime == "" || korisnik == null)
            poruka.innerHTML = "Korisnik ne postoji!";
        else {
            let ime = document.getElementById("ime_input").value;
            let prezime = document.getElementById("prezime_input").value;
            let totp = document.getElementById("totp_input").value;
            let uloga = document.getElementById("uloga_input").value;
            await this.korisniciServis.azurirajKorisnikaAdmin(korime, ime, prezime, totp, uloga);
        }
        this.ucitajPodatke();
    }
};
KorisniciComponent = __decorate([
    Component({
        selector: 'app-korisnici',
        templateUrl: './korisnici.component.html',
        styleUrls: ['./korisnici.component.sass']
    })
], KorisniciComponent);
export { KorisniciComponent };
//# sourceMappingURL=korisnici.component.js.map