import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AzuriranjeFilmovaComponent = class AzuriranjeFilmovaComponent {
    constructor(filmoviServis, korisniciServis) {
        this.filmoviServis = filmoviServis;
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
            this.ucitajFilmove();
        else
            main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!";
    }
    async ucitajFilmove() {
        let main = document.getElementById("proba");
        let prikaz = "";
        for (let p of await this.filmoviServis.dohvatiSveFilmove()) {
            prikaz += "<li>ID: " + p.film_id + " Naziv: " + p.naziv + "</li>";
        }
        main.innerHTML = prikaz;
    }
    async ucitajPodatke() {
        let id = document.getElementById("film_id").value;
        let film;
        if (id != "")
            film = await this.filmoviServis.dohvatiPodatkeFilma(id);
        let regex = /^[0-9]*$/;
        let id_label = document.getElementById("film_id_label");
        let naziv_label = document.getElementById("film_naziv_label");
        let zanr_label = document.getElementById("film_zanr_label");
        let zanr_id_label = document.getElementById("film_zanr_id_label");
        let trajanje_label = document.getElementById("film_trajanje_label");
        let datum_label = document.getElementById("film_datum_label");
        let budzet_label = document.getElementById("film_budzet_label");
        let prihodi_label = document.getElementById("film_prihodi_label");
        let jezik_label = document.getElementById("film_jezik_label");
        let originalni_naziv_label = document.getElementById("film_originalni_naziv_label");
        let opis_label = document.getElementById("film_opis_label");
        let ocjena_label = document.getElementById("film_ocjena_label");
        let broj_glasova_label = document.getElementById("film_broj_glasova_label");
        let status_label = document.getElementById("film_status_label");
        let godina_izlaska_label = document.getElementById("film_godina_izlaska_label");
        let h3 = document.getElementById("upozorenje");
        h3.innerHTML = "";
        if (film == null || !regex.test(id) || id == "") {
            id_label.innerHTML = "ID: ";
            naziv_label.innerHTML = "Naziv: ";
            zanr_label.innerHTML = "Žanr: ";
            zanr_id_label.innerHTML = "Žanr ID: ";
            trajanje_label.innerHTML = "Trajanje: ";
            datum_label.innerHTML = "Datum unosa: ";
            budzet_label.innerHTML = "Budžet: ";
            prihodi_label.innerHTML = "Prihodi: ";
            jezik_label.innerHTML = "Jezik: ";
            originalni_naziv_label.innerHTML = "Originalni naziv: ";
            opis_label.innerHTML = "Opis: ";
            ocjena_label.innerHTML = "Ocjena: ";
            broj_glasova_label.innerHTML = "Broj glasova: ";
            status_label.innerHTML = "Status: ";
            godina_izlaska_label.innerHTML = "Godina izlaska: ";
        }
        else {
            id_label.innerHTML = "ID: " + film.film_id + " ->";
            naziv_label.innerHTML = "Naziv: " + film.naziv + " ->";
            zanr_label.innerHTML = "Žanr: " + film.zanr_ime;
            zanr_id_label.innerHTML = "Žanr ID: " + film.id;
            trajanje_label.innerHTML = "Trajanje: " + film.trajanje + " ->";
            let datum = JSON.stringify(film.datum_unosa);
            let datumPolje = datum.split("-");
            let datumDan = datumPolje[2].split("T");
            datumDan = datumDan[0].split('"');
            let datumGodina = datumPolje[0].split('"');
            datum = datumDan[0] + "." + datumPolje[1] + "." + datumGodina[1] + ".";
            datum_label.innerHTML = "Datum unosa: " + datum + " ->";
            budzet_label.innerHTML = "Budžet: " + film.budzet + " ->";
            prihodi_label.innerHTML = "Prihodi: " + film.prihodi + " ->";
            jezik_label.innerHTML = "Jezik: " + film.jezik + " ->";
            originalni_naziv_label.innerHTML = "Originalni naziv: " + film.originalni_naziv + " ->";
            opis_label.innerHTML = "Opis: " + film.opis + " ->";
            ocjena_label.innerHTML = "Ocjena: " + film.ocjena + " ->";
            broj_glasova_label.innerHTML = "Broj glasova: " + film.broj_glasova + " ->";
            status_label.innerHTML = "Status: " + film.status + " ->";
            godina_izlaska_label.innerHTML = "Godina izlaska: " + film.godina_izlaska + " ->";
        }
    }
    async azuriraj() {
        let id = document.getElementById("film_id").value;
        let film;
        if (id != "")
            film = await this.filmoviServis.dohvatiPodatkeFilma(id);
        let regex = /^[0-9]*$/;
        let h3 = document.getElementById("upozorenje");
        if (film == null || !regex.test(id) || id == "")
            h3.innerHTML = "Film sa danim ID ne postoji!";
        else {
            h3.innerHTML = "";
            let naziv = document.getElementById("film_naziv").value;
            let trajanje = document.getElementById("film_trajanje").value;
            let datum = document.getElementById("film_datum").value;
            let budzet = document.getElementById("film_budzet").value;
            let prihodi = document.getElementById("film_prihodi").value;
            let jezik = document.getElementById("film_jezik").value;
            let originalni_naziv = document.getElementById("film_originalni_naziv").value;
            let opis = document.getElementById("film_opis").value;
            let ocjena = document.getElementById("film_ocjena").value;
            let broj_glasova = document.getElementById("film_broj_glasova").value;
            let status = document.getElementById("film_status").value;
            let godina_izlaska = document.getElementById("film_godina_izlaska").value;
            await this.filmoviServis.azuriranjeFilmova(id, naziv, trajanje, datum, budzet, prihodi, jezik, originalni_naziv, opis, ocjena, broj_glasova, status, godina_izlaska);
        }
        this.ucitajFilmove();
    }
};
AzuriranjeFilmovaComponent = __decorate([
    Component({
        selector: 'app-azuriranje-filmova',
        templateUrl: './azuriranje-filmova.component.html',
        styleUrls: ['./azuriranje-filmova.component.sass']
    })
], AzuriranjeFilmovaComponent);
export { AzuriranjeFilmovaComponent };
//# sourceMappingURL=azuriranje-filmova.component.js.map