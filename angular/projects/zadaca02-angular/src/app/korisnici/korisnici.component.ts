import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.sass']
})
export class KorisniciComponent {

  constructor(private korisniciServis: KorisniciService) { };

  ngOnInit() {
    this.provjeraUloga();
  }

  async provjeraUloga() {
    let main: HTMLElement = document.getElementById("glavni") as HTMLElement;
    let ulogiran = await this.korisniciServis.provjeraUloga()
    if(ulogiran)
        this.ucitajKorisnike();
    else
        main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!"
  }

  async ucitajKorisnike() {
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    let prikaz = "";
    for(let p of await this.korisniciServis.dohvatiKorisnike()) {
      prikaz += "<li> ID: " + p.id + " Korisničko ime: " + p.korime + "</li>";
    }
    main.innerHTML = prikaz;;
  }

  async ucitajPodatke() {
    let korime = (<HTMLInputElement>document.getElementById("korime_input")).value;
    let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime)
    let main: HTMLElement = document.getElementById("azuriranje") as HTMLElement;
    let poruka: HTMLElement = document.getElementById("poruka") as HTMLElement;
    if(korisnik == null || korime == "") {
      if(korisnik == null)
        poruka.innerHTML = "<b>Korisnik ne postoji</b>"
      else
        poruka.innerHTML = ""
      let id_label: HTMLElement = document.getElementById("id_label") as HTMLElement;
      id_label.innerHTML = "ID: ";
      let lozinka_label: HTMLElement = document.getElementById("lozinka_label") as HTMLElement;
      lozinka_label.innerHTML = "Lozinka: ";
      let email_label: HTMLElement = document.getElementById("email_label") as HTMLElement;
      email_label.innerHTML = "E-mail: ";
      let ime_label: HTMLElement = document.getElementById("ime_label") as HTMLElement;
      ime_label.innerHTML = "Ime: ";
      let prezime_label: HTMLElement = document.getElementById("prezime_label") as HTMLElement;
      prezime_label.innerHTML = "Prezime: ";
      let totp_label: HTMLElement = document.getElementById("totp_label") as HTMLElement;
      totp_label.innerHTML = "TOTP ključ: ";
      let uloga_label: HTMLElement = document.getElementById("uloga_label") as HTMLElement;
      uloga_label.innerHTML = "Uloga: ";
    }
    else {
      if(korisnik.blokiran == 1)
        poruka.innerHTML = "<b>Korisnik je blokiran</b>"
      else
        poruka.innerText = "";
      let id_label: HTMLElement = document.getElementById("id_label") as HTMLElement;
      id_label.innerHTML = "ID: " + korisnik.id;
      let lozinka_label: HTMLElement = document.getElementById("lozinka_label") as HTMLElement;
      lozinka_label.innerHTML = "Lozinka: " + korisnik.lozinka;
      let email_label: HTMLElement = document.getElementById("email_label") as HTMLElement;
      email_label.innerHTML = "E-mail: " + korisnik.email;
      let ime_label: HTMLElement = document.getElementById("ime_label") as HTMLElement;
      ime_label.innerHTML = "Ime: " + korisnik.ime + " -> ";
      let prezime_label: HTMLElement = document.getElementById("prezime_label") as HTMLElement;
      prezime_label.innerHTML = "Prezime: " + korisnik.prezime + " -> ";
      let totp_label: HTMLElement = document.getElementById("totp_label") as HTMLElement;
      totp_label.innerHTML = "TOTP ključ: " + korisnik.TOTPkljuc + " -> ";
      let uloga_label: HTMLElement = document.getElementById("uloga_label") as HTMLElement;
      uloga_label.innerHTML = "Uloga: " + korisnik.uloga_id + " -> ";
    }
  }

  async blokirajKorisnika() {
    let korime = (<HTMLInputElement>document.getElementById("korime_input")).value;
    let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime)
    let poruka: HTMLElement = document.getElementById("gumbPoruka") as HTMLElement;
    if(korime == "" || korisnik == null)
      poruka.innerHTML = "Korisnik ne postoji!";
    else if(korisnik.blokiran == 0) 
      await this.korisniciServis.blokirajOdblokirajKorisnika(korisnik.id, 1);
    else if(korisnik.blokiran == 1)
      await this.korisniciServis.blokirajOdblokirajKorisnika(korisnik.id, 0);
    this.ucitajPodatke();
  }

  async azuriranjeKorisnika() {
    let korime = (<HTMLInputElement>document.getElementById("korime_input")).value;
    let korisnik = await this.korisniciServis.dohvatiPodatkeKorisnika(korime)
    let poruka: HTMLElement = document.getElementById("gumbPoruka") as HTMLElement;
    if(korime == "" || korisnik == null)
      poruka.innerHTML = "Korisnik ne postoji!";
    else {
      let ime = (<HTMLInputElement>document.getElementById("ime_input")).value;
      let prezime = (<HTMLInputElement>document.getElementById("prezime_input")).value;
      let totp = (<HTMLInputElement>document.getElementById("totp_input")).value;
      let uloga = (<HTMLInputElement>document.getElementById("uloga_input")).value;
      await this.korisniciServis.azurirajKorisnikaAdmin(korime, ime, prezime, totp, uloga);
    }
    this.ucitajPodatke();
  }

}
