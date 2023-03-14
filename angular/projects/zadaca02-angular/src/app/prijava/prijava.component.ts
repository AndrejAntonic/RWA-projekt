import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.sass']
})
export class PrijavaComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service) { };

  async ngOnInit() {
    let ulogiran = await this.korisniciServis.provjeraUlogiran();
    let main: HTMLElement = document.getElementById("poruka") as HTMLElement;
    let forma: HTMLElement = document.getElementById("forma") as HTMLElement;
    if(ulogiran) {
      main.innerHTML = "Već ste prijavljeni!"
      forma.innerHTML = ""
    }
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
      this.prijavi();
    });
  }

  async prijavi() {
    let korime = (<HTMLInputElement>document.getElementById("korime_input")).value;
    let lozinka = (<HTMLInputElement>document.getElementById("lozinka_input")).value;
    let prikaziPoruku: HTMLElement = document.getElementById("poruka") as HTMLElement;
    let poruka = await this.korisniciServis.prijavaKorisnika(korime, lozinka);
    let splitPoruka = poruka.split('"');
    if(splitPoruka[1] == "Korisnik je blokiran!")
      prikaziPoruku.innerHTML = splitPoruka[1];
    else if(splitPoruka[1] == "Korisnik ne postoji")
      prikaziPoruku.innerHTML = splitPoruka[1];
  }

}
