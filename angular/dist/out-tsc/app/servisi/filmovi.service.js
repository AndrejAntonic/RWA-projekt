import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let FilmoviService = class FilmoviService {
    constructor() {
        this.restServis = environment.restServis;
        this.filmovi = new Array();
        let filmovi = localStorage.getItem("filmovi");
        if (filmovi == null)
            this.osvjeziFilmove(1, "");
        else
            this.filmoviBaza = JSON.parse(filmovi);
    }
    async dohvatiFilmove(zanr) {
        //let parametri = "?stranica=1&brojFilmova=100&zanr=" + zanr;
        let odgovor = await fetch(this.restServis + "/dajDvaFilma?zanr=" + zanr);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    async dohvatiSveFilmove() {
        let odgovor = await fetch(this.restServis + "/dajFilmove");
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    async dohvatiPodatkeFilma(id) {
        let odgovor = await fetch(this.restServis + "/dajFilm/" + id);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    async dohvatiSortiranoFiltrirano(zanr, datum, sortiranje) {
        if (zanr == null && datum == null) {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?sortiraj=" + sortiranje);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
        else if (zanr != null && datum == null) {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr + "&sortiraj=" + sortiranje);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
        else if (zanr == null && datum != null) {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?datum=" + datum + "&sortiraj=" + sortiranje);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
        else {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr + "&datum=" + datum + "&sortiraj=" + sortiranje);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
    }
    async dohvatiFiltriranje(zanr, datum) {
        if (zanr != null && datum == null) {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
        else if (zanr == null && datum != null) {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?datum=" + datum);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
        else {
            let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr + "&datum=" + datum);
            let podaci = await odgovor.text();
            let filmovi = JSON.parse(podaci);
            return filmovi;
        }
    }
    async azuriranjeFilmova(id, naziv, trajanje, datum, budzet, prihodi, jezik, originalni_naziv, opis, ocjena, broj_glasova, status, godina_izlaska) {
        let tijelo = {
            naziv: naziv,
            trajanje: trajanje,
            datum: datum,
            budzet: budzet,
            prihodi: prihodi,
            jezik: jezik,
            org_naziv: originalni_naziv,
            opis: opis,
            ocjena: ocjena,
            broj_glasova: broj_glasova,
            status: status,
            godina: godina_izlaska
        };
        let parametri = { method: 'PUT', body: JSON.stringify(tijelo) };
        await fetch(this.restServis + "/azurirajFilm?id=" + id + "&naziv=" + naziv + "&trajanje=" + trajanje + "&datum=" + datum + "&budzet=" + budzet + "&prihodi=" + prihodi + "&jezik=" + jezik + "&org_naziv=" + originalni_naziv + "&opis=" + opis + "&ocjena=" + ocjena + "&broj_glasova=" + broj_glasova + "&status=" + status + "&godina=" + godina_izlaska, parametri);
        let odgovor = "Podaci su ažurirani";
    }
    async osvjeziFilmove(stranica, zanr) {
        //let parametri = "?stranica=" + stranica + "&brojFilmova=100&zanr=" + zanr;
        let parametri = "?stranica=" + stranica + "&brojFilmova=100";
        let o = (await fetch(this.restServis + "filmovi/" + parametri));
        if (o.status == 200) {
            let r = JSON.parse(await o.text());
            console.log(r);
            this.filmoviBaza = r;
            localStorage.setItem("filmovi", JSON.stringify(r));
        }
    }
    dajNasumceBroj(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    dajFilmove() {
        if (this.filmovi.length == 0) {
            if (this.filmoviBaza == undefined)
                return new Array();
            else if (this.filmoviBaza.results.length == 0)
                return new Array();
            else {
                this.filmovi = new Array();
                for (let filmBaza of this.filmoviBaza.results) {
                    let film = { naziv: filmBaza.naziv };
                    this.filmovi.push(film);
                }
                return this.filmovi;
            }
        }
        else
            return this.filmovi;
    }
};
FilmoviService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FilmoviService);
export { FilmoviService };
//# sourceMappingURL=filmovi.service.js.map