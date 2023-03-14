import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PocetnaComponent = class PocetnaComponent {
    constructor(zanroviServis, filmoviServis) {
        this.zanroviServis = zanroviServis;
        this.filmoviServis = filmoviServis;
        this.zanrovi = new Array();
    }
    ;
    async ngOnInit() {
        let main = document.getElementById('lista');
        let prikaz = "";
        main.innerHTML = prikaz;
        for (let p of await this.zanroviServis.dohvatiZanrove()) {
            prikaz += "<li>" + p.zanr_ime;
            let filmovi = await this.filmoviServis.dohvatiFilmove(p.id);
            if (filmovi[0] != undefined && filmovi[1] != undefined) {
                prikaz += "<ul>";
                prikaz += "<li>" + filmovi[0]["naziv"] + "</li>";
                prikaz += "<li>" + filmovi[1]["naziv"] + "</li>";
                prikaz += "</ul></li>";
            }
            else {
                prikaz += "<ul>";
                prikaz += "<li> Film za dani žanr ne postoji </li>";
                prikaz += "<li> Film za dani žanr ne postoji </li>";
                prikaz += "</ul></li>";
            }
        }
        main.innerHTML = prikaz;
    }
};
PocetnaComponent = __decorate([
    Component({
        selector: 'app-pocetna',
        templateUrl: './pocetna.component.html',
        styleUrls: ['./pocetna.component.sass']
    })
], PocetnaComponent);
export { PocetnaComponent };
//# sourceMappingURL=pocetna.component.js.map