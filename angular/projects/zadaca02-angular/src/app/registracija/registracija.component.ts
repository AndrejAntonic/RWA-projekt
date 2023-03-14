import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.sass']
})
export class RegistracijaComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service) { };

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.log(token);
      this.registriraj();
    });
  }

  async registriraj() {
    let ime = (<HTMLInputElement>document.getElementById("ime")).value;
    let prezime = (<HTMLInputElement>document.getElementById("prezime")).value;
    let lozinka = (<HTMLInputElement>document.getElementById("lozinka")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let korime = (<HTMLInputElement>document.getElementById("korime")).value;
    await this.korisniciServis.registracijaKorisnika(ime, prezime, lozinka, email, korime);
    let poruka: HTMLElement = document.getElementById("poruka") as HTMLElement;
    poruka.innerHTML = "Registracija je uspješna";
  }

}
