import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(filmoviServis) {
        this.filmoviServis = filmoviServis;
        this.title = 'Zadaca02Angular';
        this.putanja = 'pocetna';
    }
    ;
    prebaciNa(putanja, dogadaj) {
        this.putanja = putanja;
        console.log("prebacujem na:" + dogadaj);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.sass']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map