import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RegistracijaComponent = class RegistracijaComponent {
    constructor(korisniciServis, router, recaptchaV3Service) {
        this.korisniciServis = korisniciServis;
        this.router = router;
        this.recaptchaV3Service = recaptchaV3Service;
    }
    ;
    send(form) {
        if (form.invalid) {
            for (const control of Object.keys(form.controls)) {
                form.controls[control].markAsTouched();
            }
            return;
        }
        this.recaptchaV3Service.execute('importantAction')
            .subscribe((token) => {
            this.registriraj();
        });
    }
    async registriraj() {
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let lozinka = document.getElementById("lozinka").value;
        let email = document.getElementById("email").value;
        let korime = document.getElementById("korime").value;
        await this.korisniciServis.registracijaKorisnika(ime, prezime, lozinka, email, korime);
        let poruka = document.getElementById("poruka");
        poruka.innerHTML = "Registracija je uspješna";
    }
};
RegistracijaComponent = __decorate([
    Component({
        selector: 'app-registracija',
        templateUrl: './registracija.component.html',
        styleUrls: ['./registracija.component.sass']
    })
], RegistracijaComponent);
export { RegistracijaComponent };
//# sourceMappingURL=registracija.component.js.map