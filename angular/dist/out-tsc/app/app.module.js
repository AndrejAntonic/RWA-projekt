import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ProfilComponent } from './profil/profil.component';
import { PregledFilmovaComponent } from './pregled-filmova/pregled-filmova.component';
import { FilmComponent } from './film/film.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { AzuriranjeFilmovaComponent } from './azuriranje-filmova/azuriranje-filmova.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { OdjavaComponent } from './odjava/odjava.component';
const routes = [
    { path: "pocetna", component: PocetnaComponent },
    { path: "prijava", component: PrijavaComponent },
    { path: "dokumentacija", component: DokumentacijaComponent },
    { path: "registracija", component: RegistracijaComponent },
    { path: "profil", component: ProfilComponent },
    { path: "pregled_filmova", component: PregledFilmovaComponent },
    { path: "film", component: FilmComponent },
    { path: "zanrovi", component: ZanroviComponent },
    { path: "azuriranje_filmova", component: AzuriranjeFilmovaComponent },
    { path: "korisnici", component: KorisniciComponent },
    { path: "odjava", component: OdjavaComponent },
    { path: "", redirectTo: "pocetna", pathMatch: "full" }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            PocetnaComponent,
            PrijavaComponent,
            DokumentacijaComponent,
            RegistracijaComponent,
            ProfilComponent,
            PregledFilmovaComponent,
            FilmComponent,
            ZanroviComponent,
            AzuriranjeFilmovaComponent,
            KorisniciComponent,
            OdjavaComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            RecaptchaV3Module,
            RouterModule.forRoot(routes)
        ],
        providers: [
            {
                provide: RECAPTCHA_V3_SITE_KEY,
                useValue: environment.recaptcha.siteKey,
            }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map