import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OdjavaComponent = class OdjavaComponent {
    constructor(korisniciServis, router, recaptchaV3Service) {
        this.korisniciServis = korisniciServis;
        this.router = router;
        this.recaptchaV3Service = recaptchaV3Service;
    }
    ;
    async ngOnInit() {
        let ulogiran = await this.korisniciServis.provjeraUlogiran();
        let main = document.getElementById("lista");
        if (!ulogiran)
            main.innerHTML = "Niste prijavljeni!";
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
            this.korisnikOdjava();
        });
    }
    async korisnikOdjava() {
        let id = await this.korisniciServis.vratiKorisnikID();
        await this.korisniciServis.odjavaKorisnik(id);
        this.preusmjeravanje();
    }
    async preusmjeravanje() {
        this.router.navigateByUrl('pocetna');
    }
};
OdjavaComponent = __decorate([
    Component({
        selector: 'app-odjava',
        templateUrl: './odjava.component.html',
        styleUrls: ['./odjava.component.sass']
    })
], OdjavaComponent);
export { OdjavaComponent };
//# sourceMappingURL=odjava.component.js.map