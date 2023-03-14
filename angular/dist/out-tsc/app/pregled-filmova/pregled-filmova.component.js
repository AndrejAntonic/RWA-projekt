import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PregledFilmovaComponent = class PregledFilmovaComponent {
    constructor(filmoviServis, zanroviServis, korisniciServis) {
        this.filmoviServis = filmoviServis;
        this.zanroviServis = zanroviServis;
        this.korisniciServis = korisniciServis;
    }
    ;
    async ngOnInit() {
        this.ucitajKorisnika();
    }
    async ucitajKorisnika() {
        let main = document.getElementById("glavni");
        let ulogiran = await this.korisniciServis.provjeraUlogiran();
        if (ulogiran) {
            this.ucitajFilmove();
        }
        else {
            main.innerHTML = "Niste prijavljen";
        }
    }
    async ucitajFilmove() {
        let main = document.getElementById('lista');
        let prikaz = "<ul>";
        for (let p of await this.filmoviServis.dohvatiSveFilmove()) {
            prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
        }
        prikaz += "</ul>";
        main.innerHTML = prikaz;
    }
    async sortiranjeNaziv() {
        let skracenica = "n";
        let zanrUnos = document.getElementById("filtriranjeZanr").value;
        let idZanr = await this.provjeraZanr(zanrUnos);
        let datumUnos = document.getElementById("filtriranjeDatum").value;
        let datumDobar = await this.provjeraDatum(datumUnos);
        let main = document.getElementById("lista");
        let prikaz = "<ul>";
        for (let p of await this.filmoviServis.dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)) {
            prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
        }
        prikaz += "</ul>";
        main.innerHTML = prikaz;
    }
    async sortiranjeDatum() {
        let skracenica = "d";
        let zanrUnos = document.getElementById("filtriranjeZanr").value;
        let idZanr = await this.provjeraZanr(zanrUnos);
        let datumUnos = document.getElementById("filtriranjeDatum").value;
        let datumDobar = await this.provjeraDatum(datumUnos);
        let main = document.getElementById("lista");
        let prikaz = "<ul>";
        for (let p of await this.filmoviServis.dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)) {
            prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
        }
        prikaz += "</ul>";
        main.innerHTML = prikaz;
    }
    async sortiranjeZanr() {
        let skracenica = "z";
        let zanrUnos = document.getElementById("filtriranjeZanr").value;
        let idZanr = await this.provjeraZanr(zanrUnos);
        let datumUnos = document.getElementById("filtriranjeDatum").value;
        let datumDobar = await this.provjeraDatum(datumUnos);
        let main = document.getElementById("lista");
        let prikaz = "<ul>";
        for (let p of await this.filmoviServis.dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)) {
            prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
        }
        prikaz += "</ul>";
        main.innerHTML = prikaz;
    }
    async provjeraDatum(datumUnos) {
        let regexDatum = /\d{2}(\.)\d{2}(\.)\d{4}/;
        if (datumUnos != "" && regexDatum.test(datumUnos))
            return datumUnos;
        else
            return null;
    }
    async provjeraZanr(zanr) {
        let idZanr, pronaden = false;
        if (zanr != null) {
            for (let p of await this.zanroviServis.dohvatiZanrove()) {
                if (p.zanr_ime == zanr) {
                    idZanr = p.id;
                    pronaden = true;
                }
            }
        }
        if (pronaden)
            return idZanr;
        else
            return null;
    }
    async filtriranje() {
        let zanrUnos = document.getElementById("filtriranjeZanr").value;
        let idZanr = await this.provjeraZanr(zanrUnos);
        let datumUnos = document.getElementById("filtriranjeDatum").value;
        let datumDobar = await this.provjeraDatum(datumUnos);
        let main = document.getElementById("lista");
        let prikaz = "<ul>";
        for (let p of await this.filmoviServis.dohvatiFiltriranje(idZanr, datumDobar)) {
            prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
        }
        prikaz += "</ul>";
        main.innerHTML = prikaz;
    }
};
PregledFilmovaComponent = __decorate([
    Component({
        selector: 'app-pregled-filmova',
        templateUrl: './pregled-filmova.component.html',
        styleUrls: ['./pregled-filmova.component.sass']
    })
], PregledFilmovaComponent);
export { PregledFilmovaComponent };
//# sourceMappingURL=pregled-filmova.component.js.map