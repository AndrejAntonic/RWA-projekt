import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let ZanroviService = class ZanroviService {
    constructor() {
        this.restServis = environment.restServis;
        this.zanrovi = new Array();
        let zanrovi = localStorage.getItem("zanrovi");
        if (zanrovi == null) {
            this.osvjeziZanrove();
        }
        else {
            this.zanroviBAZA = JSON.parse(zanrovi);
        }
    }
    async dohvatiZanrove() {
        let odgovor = await fetch(this.restServis + "/dajZanrove");
        let podaci = await odgovor.text();
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }
    async obrisiZanrove() {
        await fetch(this.restServis + "/obrisiZanrove");
        let odgovor = "Zanrovi su obrisani";
        return odgovor;
    }
    async promijeniZanr(staroZanr, novoZanr) {
        await fetch(this.restServis + "/promijeniZanrove?staroZanr=" + staroZanr + "&novoZanr=" + novoZanr);
        let odgovor = "Zanr je promijenjen";
        return odgovor;
    }
    async dohvatiZanroveTMDB() {
        let odgovor = await fetch(this.restServis + "/dajSveZanrove");
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }
    async osvjeziZanrove() {
        let o = (await fetch(this.restServis + "zanr/"));
        if (o.status == 200) {
            let r = JSON.parse(await o.text());
            console.log(r);
            this.zanroviBAZA = r;
            localStorage.setItem("zanrovi", JSON.stringify(r));
        }
    }
    dajZanrove() {
        if (this.zanrovi.length == 0) {
            if (this.zanroviBAZA == undefined) {
                return new Array();
            }
            else if (this.zanroviBAZA.results.length == 0) {
                return new Array();
            }
            else {
                this.zanrovi = new Array();
                for (let zanrBAZA of this.zanroviBAZA.results) {
                    let zanr = { zanr_ime: zanrBAZA.zanr_ime };
                    this.zanrovi.push(zanr);
                }
                return this.zanrovi;
            }
        }
        else {
            return this.zanrovi;
        }
    }
};
ZanroviService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ZanroviService);
export { ZanroviService };
//# sourceMappingURL=zanrovi.service.js.map