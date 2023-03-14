import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-odjava',
  templateUrl: './odjava.component.html',
  styleUrls: ['./odjava.component.sass']
})
export class OdjavaComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service) { };

  async ngOnInit() {
    let ulogiran = await this.korisniciServis.provjeraUlogiran();
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    if(!ulogiran)
      main.innerHTML = "Niste prijavljeni!"
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.debug(token);
      this.korisnikOdjava();
    });
  }

  async korisnikOdjava() {
    let id = await this.korisniciServis.vratiKorisnikID();
    await this.korisniciServis.odjavaKorisnik(id);
    this.preusmjeravanje();
  }

  async preusmjeravanje() {
    this.router.navigateByUrl('pocetna')
  }

}
