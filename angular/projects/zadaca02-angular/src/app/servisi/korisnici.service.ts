import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  restServis = environment.restServis;

  constructor() { }

  async provjeraUlogiran() {
    let poruka = await fetch(this.restServis + "/provjeriOdjavu");
    let korisnik = await poruka.text();
    if(korisnik == "[]")
      return false;
    else
      return true;
  }

  async vratiKorisnikKorime() {
    let poruka = await fetch(this.restServis + "/provjeriOdjavu");
    let korisnik = await poruka.text();
    let prvo = korisnik.split(":");
    let drugo = prvo[2].split('"');
    return drugo[1];
  }

  async dohvatiPodatkeKorisnika(korime: string) {
    let odgovor = await fetch(this.restServis + "/dajProfil?korime=" + korime);
    let podaci = await odgovor.text();
    let korisnik = JSON.parse(podaci);
    return korisnik;
  }

  async enkriptirajLozinku(lozinka: string, korime: string) {
    let odgovor = await fetch(this.restServis + "/enkriptirajLozinku?lozinka=" + lozinka + "&korime=" + korime);
    let podaci = await odgovor.text();
    return podaci;
  }

  async azurirajKorisnika(korime: string, ime: string, prezime: string, lozinka: string) {
    let tijelo = {
      ime: ime,
      prezime: prezime,
      lozinka: lozinka
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)};
    await fetch(this.restServis + "/azurirajKorisnika?korime=" + korime + "&ime=" + ime + "&prezime=" + prezime + "&lozinka=" + lozinka, parametri);
  }

  async vratiKorisnikID() {
    let poruka = await fetch(this.restServis + "/provjeriOdjavu");
    let korisnik = await poruka.text();
    let prvo = korisnik.split('"');
    let drugo = prvo[2].split(":");
    let trece = drugo[1].split(",");
    return trece[0];
  }

  async odjavaKorisnik(id: string) {
    let tijelo = {
      aktivan: 0
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)};
    await fetch(this.restServis + "/odjavi?id=" + id + "&aktivan=" + 0, parametri);
  }

  async dohvatiKorisnike() {
    let odgovor = await fetch(this.restServis + "/dajKorisnike");
    let podaci = await odgovor.text();
    let korisnici = JSON.parse(podaci);
    return korisnici;
  }

  async blokirajOdblokirajKorisnika(id: string, broj: number) {
    let tijelo = {
      broj: broj
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)};
    await fetch(this.restServis + "/blokirajKorisnika?id=" + id + "&broj=" + broj, parametri);
  }

  async azurirajKorisnikaAdmin(korime: string, ime: string, prezime: string, totp: string, uloga: string) {
    let tijelo = {
      ime: ime,
      prezime: prezime,
      totp: totp,
      uloga: uloga
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)};
    await fetch(this.restServis + "/azurirajKorisnikaAdmin?korime=" + korime + "&ime=" + ime + "&prezime=" + prezime + "&totp=" + totp + "&uloga=" + uloga, parametri);
  }

  async prijavaKorisnika(korime: string, lozinka: string) {
    let tijelo = {
      korime: korime,
      lozinka: lozinka
    }
    let parametri = { method: 'POST', body: JSON.stringify(tijelo)};
    let poruka = await fetch(this.restServis + "/prijava?korime=" + korime + "&lozinka=" + lozinka, parametri);
    let odgovor = await poruka.text();
    return odgovor;
  }

  async registracijaKorisnika(ime: string, prezime: string, lozinka: string, email: string, korime: string) {
    let tijelo = {
      ime: ime,
      prezime: prezime,
      lozinka: lozinka,
      email: email,
      korime: korime,
    }
    let parametri = { method: 'POST', body: JSON.stringify(tijelo)};
    let poruka = await fetch(this.restServis + "/registracija?ime=" + ime + "&prezime=" + prezime + "&lozinka=" + lozinka + "&email=" + email + "&korime=" + korime, parametri);
    let odgovor = await poruka.text();
    return odgovor;
  }

  async provjeraUloga() {
    var poruka = await fetch(this.restServis + "/provjeriUlogu");
    let korisnik = await poruka.text();
    let provjera = false;
    if(korisnik == "[]")
      provjera = false;
    else {
      let uloga1 = korisnik.split(':');
      let uloga2 = uloga1[1].split("}");
      if(uloga2[0] == '2')
        provjera =  false;
      else if(uloga2[0] == '1')
        provjera =  true;
    }
    return provjera;
  }
}
