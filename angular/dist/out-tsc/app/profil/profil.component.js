import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfilComponent = class ProfilComponent {
    constructor(korisniciServis) {
        this.korisniciServis = korisniciServis;
    }
    ;
    ngOnInit() {
        this.ucitajKorisnika();
    }
    async ucitajKorisnika() {
        let main = document.getElementById("lista");
        let azuriraj = document.getElementById("azuriraj");
        let prikaz = "";
        let ulogiran = await this.korisniciServis.provjeraUlogiran();
        if (ulogiran) {
            let korime = await this.korisniciServis.vratiKorisnikKorime();
            let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime);
            prikaz += "<li>Ime: " + korisnik.ime + "</li>";
            prikaz += "<li>Prezime: " + korisnik.prezime + "</li>";
            prikaz += "<li>Korisničko ime: " + korisnik.korime + "</li>";
            prikaz += "<li>E-mail: " + korisnik.email + "</li>";
            prikaz += "<li>Hashana lozinka: " + korisnik.lozinka + "</li>";
        }
        else {
            prikaz += "Niste prijavljeni!";
            azuriraj.innerHTML = "";
        }
        main.innerHTML = prikaz;
    }
    async azurirajKorisnika() {
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let lozinka = document.getElementById("lozinka").value;
        let korime = await this.korisniciServis.vratiKorisnikKorime();
        let hashanaLozinka = "";
        if (lozinka != "")
            hashanaLozinka = await this.korisniciServis.enkriptirajLozinku(lozinka, korime);
        await this.korisniciServis.azurirajKorisnika(korime, ime, prezime, hashanaLozinka);
        this.ucitajKorisnika();
    }
};
ProfilComponent = __decorate([
    Component({
        selector: 'app-profil',
        templateUrl: './profil.component.html',
        styleUrls: ['./profil.component.sass']
    })
], ProfilComponent);
export { ProfilComponent };
//# sourceMappingURL=profil.component.js.map