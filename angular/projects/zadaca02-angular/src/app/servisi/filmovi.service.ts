import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilmoviService {

  restServis = environment.restServis;

  constructor() { 
  }

  async dohvatiFilmove(zanr: number) {
    //let parametri = "?stranica=1&brojFilmova=100&zanr=" + zanr;
    let odgovor = await fetch (this.restServis + "/dajDvaFilma?zanr=" + zanr)
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

  async dohvatiSveFilmove() {
    let odgovor = await fetch(this.restServis + "/dajFilmove");
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

  async dohvatiPodatkeFilma(id:string) {
    let odgovor = await fetch(this.restServis + "/dajFilm/" + id);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

  async dohvatiSortiranoFiltrirano(zanr: string, datum: string | null, sortiranje: string) {
    if(zanr == null && datum == null) {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?sortiraj=" + sortiranje);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
    else if(zanr != null && datum == null) {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr + "&sortiraj=" + sortiranje);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
    else if(zanr == null && datum != null) {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?datum=" + datum + "&sortiraj=" + sortiranje);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
    else {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr + "&datum=" + datum + "&sortiraj=" + sortiranje);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
  }

  async dohvatiFiltriranje(zanr: string | null, datum: string | null) {
    if(zanr != null && datum == null) {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
    else if(zanr == null && datum != null) {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?datum=" + datum);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
    else {
      let odgovor = await fetch(this.restServis + "/dajFilmove/?zanr=" + zanr + "&datum=" + datum);
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci);
      return filmovi;
    }
  }

  async azuriranjeFilmova(id: string, naziv: string, trajanje: string, datum: string, budzet: string, prihodi: string, jezik: string, originalni_naziv: string, opis: string, ocjena: string, broj_glasova: string, status: string, godina_izlaska: string) {
    let tijelo = {
      naziv: naziv,
      trajanje: trajanje,
      datum: datum,
      budzet: budzet,
      prihodi: prihodi,
      jezik: jezik,
      org_naziv: originalni_naziv,
      opis: opis,
      ocjena: ocjena,
      broj_glasova: broj_glasova,
      status: status,
      godina: godina_izlaska
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)}
    await fetch(this.restServis +"/azurirajFilm?id="+id+"&naziv="+naziv+"&trajanje="+trajanje+"&datum="+datum+"&budzet="+budzet+"&prihodi="+prihodi+"&jezik="+jezik+"&org_naziv="+originalni_naziv+"&opis="+opis+"&ocjena="+ocjena+"&broj_glasova="+broj_glasova+"&status="+status+"&godina="+godina_izlaska, parametri);
    let odgovor = "Podaci su ažurirani";
  }


  dajNasumceBroj(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
  }
}