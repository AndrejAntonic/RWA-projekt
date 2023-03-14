import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent {

  constructor(private korisniciServis: KorisniciService) { };

  ngOnInit() {
    this.ucitajKorisnika();
  }

  async ucitajKorisnika() {
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    let azuriraj: HTMLElement = document.getElementById("azuriraj") as HTMLElement;
    let prikaz = "";
    let ulogiran = await this.korisniciServis.provjeraUlogiran();
    if(ulogiran) {
      let korime = await this.korisniciServis.vratiKorisnikKorime();
      let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime);
      prikaz += "<li>Ime: " + korisnik.ime + "</li>";
      prikaz += "<li>Prezime: " + korisnik.prezime + "</li>";
      prikaz += "<li>Korisničko ime: " + korisnik.korime + "</li>";
      prikaz += "<li>E-mail: " + korisnik.email + "</li>";
      prikaz += "<li>Hashana lozinka: " + korisnik.lozinka + "</li>";
    }
    else {
      prikaz += "Niste prijavljeni!";
      azuriraj.innerHTML = "";
    }
    main.innerHTML = prikaz;
  }

  async azurirajKorisnika() {
    let ime = (<HTMLInputElement>document.getElementById("ime")).value;
    let prezime = (<HTMLInputElement>document.getElementById("prezime")).value;
    let lozinka = (<HTMLInputElement>document.getElementById("lozinka")).value;
    let korime = await this.korisniciServis.vratiKorisnikKorime();
    let hashanaLozinka = ""
    if(lozinka != "")
      hashanaLozinka = await this.korisniciServis.enkriptirajLozinku(lozinka, korime);
    await this.korisniciServis.azurirajKorisnika(korime, ime, prezime, hashanaLozinka);
    this.ucitajKorisnika();
  }

}
