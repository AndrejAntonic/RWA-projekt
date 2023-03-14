import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PrijavaComponent = class PrijavaComponent {
    constructor(korisniciServis, router, recaptchaV3Service) {
        this.korisniciServis = korisniciServis;
        this.router = router;
        this.recaptchaV3Service = recaptchaV3Service;
    }
    ;
    async ngOnInit() {
        let ulogiran = await this.korisniciServis.provjeraUlogiran();
        let main = document.getElementById("poruka");
        let forma = document.getElementById("forma");
        if (ulogiran) {
            main.innerHTML = "Već ste prijavljeni!";
            forma.innerHTML = "";
        }
    }
    send(form) {
        if (form.invalid) {
            for (const control of Object.keys(form.controls)) {
                form.controls[control].markAsTouched();
            }
            return;
        }
        this.recaptchaV3Service.execute('importantAction')
            .subscribe((token) => {
            this.prijavi();
        });
    }
    async prijavi() {
        let korime = document.getElementById("korime_input").value;
        let lozinka = document.getElementById("lozinka_input").value;
        let prikaziPoruku = document.getElementById("poruka");
        let poruka = await this.korisniciServis.prijavaKorisnika(korime, lozinka);
        let splitPoruka = poruka.split('"');
        if (splitPoruka[1] == "Korisnik je blokiran!")
            prikaziPoruku.innerHTML = splitPoruka[1];
        else if (splitPoruka[1] == "Korisnik ne postoji")
            prikaziPoruku.innerHTML = splitPoruka[1];
    }
};
PrijavaComponent = __decorate([
    Component({
        selector: 'app-prijava',
        templateUrl: './prijava.component.html',
        styleUrls: ['./prijava.component.sass']
    })
], PrijavaComponent);
export { PrijavaComponent };
//# sourceMappingURL=prijava.component.js.map