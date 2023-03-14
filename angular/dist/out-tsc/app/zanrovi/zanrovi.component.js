import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ZanroviComponent = class ZanroviComponent {
    constructor(zanroviServis, korisniciServis) {
        this.zanroviServis = zanroviServis;
        this.korisniciServis = korisniciServis;
    }
    ;
    async ngOnInit() {
        this.provjeraUloga();
    }
    async provjeraUloga() {
        let main = document.getElementById("glavni");
        let ulogiran = await this.korisniciServis.provjeraUloga();
        if (ulogiran)
            this.ucitajZanrove();
        else
            main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!";
    }
    async ucitajZanrove() {
        let main = document.getElementById('lista');
        let prikaz = "";
        for (let p of await this.zanroviServis.dohvatiZanrove()) {
            prikaz += "<li> ID: " + p.id + " Ime: " + p.zanr_ime + "</li>";
        }
        main.innerHTML = prikaz;
    }
    async obrisiKojiNemaju() {
        this.zanroviServis.obrisiZanrove();
        this.ucitajZanrove();
    }
    async promijeni() {
        var staroZanr = document.getElementById("staroZanr").value;
        var novoZanr = document.getElementById("novoZanr").value;
        let ima = false;
        for (let p of await this.zanroviServis.dohvatiZanrove()) {
            if (staroZanr == p.id) {
                ima = true;
                break;
            }
        }
        if (ima) {
            await this.zanroviServis.promijeniZanr(staroZanr, novoZanr);
            this.ucitajZanrove();
        }
        else {
            let h3 = document.getElementById("h3");
            h3.innerHTML = "Niste unijeli valjan ID!";
        }
    }
    async dohvatiTMDB() {
        let main = document.getElementById("tmdb_lista");
        let prikaz = "<ul>";
        for (let p of await this.zanroviServis.dohvatiZanroveTMDB()) {
            prikaz += "<li> Naziv: " + p.name + "</li>";
        }
        prikaz += "</ul>";
        main.innerHTML = prikaz;
    }
};
ZanroviComponent = __decorate([
    Component({
        selector: 'app-zanrovi',
        templateUrl: './zanrovi.component.html',
        styleUrls: ['./zanrovi.component.sass']
    })
], ZanroviComponent);
export { ZanroviComponent };
//# sourceMappingURL=zanrovi.component.js.map