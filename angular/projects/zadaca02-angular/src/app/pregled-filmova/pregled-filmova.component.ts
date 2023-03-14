import { Component } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';
import { KorisniciService } from '../servisi/korisnici.service';
import { ZanroviService } from '../servisi/zanrovi.service';

@Component({
  selector: 'app-pregled-filmova',
  templateUrl: './pregled-filmova.component.html',
  styleUrls: ['./pregled-filmova.component.sass']
})
export class PregledFilmovaComponent {

  constructor(private filmoviServis: FilmoviService, private zanroviServis: ZanroviService, private korisniciServis: KorisniciService) { };

  async ngOnInit() {
    this.ucitajKorisnika();
  }

  async ucitajKorisnika() {
    let main: HTMLElement = document.getElementById("glavni") as HTMLElement;
    let ulogiran = await this.korisniciServis.provjeraUlogiran();
    if(ulogiran) {
      this.ucitajFilmove();
    }
    else {
      main.innerHTML = "Niste prijavljen";
    }
  }

  async ucitajFilmove() {
    let main: HTMLElement = document.getElementById('lista') as HTMLElement;
    let prikaz = "<ul>";
    for(let p of await this.filmoviServis.dohvatiSveFilmove()) {
      prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
    }
    prikaz += "</ul>"
    main.innerHTML = prikaz;
  }

  async sortiranjeNaziv() {
    let skracenica = "n";
    let zanrUnos = (<HTMLInputElement>document.getElementById("filtriranjeZanr")).value;
    let idZanr = await this.provjeraZanr(zanrUnos);
    let datumUnos = (<HTMLInputElement>document.getElementById("filtriranjeDatum")).value;
    let datumDobar = await this.provjeraDatum(datumUnos);
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    let prikaz = "<ul>";
    for(let p of await this.filmoviServis.dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)) {
      prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
    }
    prikaz += "</ul>"
    main.innerHTML = prikaz;
  }

  async sortiranjeDatum() {
    let skracenica = "d";
    let zanrUnos = (<HTMLInputElement>document.getElementById("filtriranjeZanr")).value;
    let idZanr = await this.provjeraZanr(zanrUnos);
    let datumUnos = (<HTMLInputElement>document.getElementById("filtriranjeDatum")).value;
    let datumDobar = await this.provjeraDatum(datumUnos);
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    let prikaz = "<ul>";
    for(let p of await this.filmoviServis.dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)) {
      prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
    }
    prikaz += "</ul>"
    main.innerHTML = prikaz;
  }

  async sortiranjeZanr() {
    let skracenica = "z";
    let zanrUnos = (<HTMLInputElement>document.getElementById("filtriranjeZanr")).value;
    let idZanr = await this.provjeraZanr(zanrUnos);
    let datumUnos = (<HTMLInputElement>document.getElementById("filtriranjeDatum")).value;
    let datumDobar = await this.provjeraDatum(datumUnos);
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    let prikaz = "<ul>";
    for(let p of await this.filmoviServis.dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)) {
      prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
    }
    prikaz += "</ul>"
    main.innerHTML = prikaz;
  }

  async provjeraDatum(datumUnos: string) {
    let regexDatum = /\d{2}(\.)\d{2}(\.)\d{4}/
    if(datumUnos != "" && regexDatum.test(datumUnos))
      return datumUnos;
    else
      return null;
  }

  async provjeraZanr(zanr:string) {
    let idZanr, pronaden = false;
    if(zanr != null) {
      for(let p of await this.zanroviServis.dohvatiZanrove()) {
        if(p.zanr_ime == zanr) {
          idZanr = p.id;
          pronaden = true;
        }
      }
    }
    if(pronaden)
      return idZanr;
    else
      return null;
  }

  async filtriranje() {
    let zanrUnos = (<HTMLInputElement>document.getElementById("filtriranjeZanr")).value;
    let idZanr = await this.provjeraZanr(zanrUnos);
    let datumUnos = (<HTMLInputElement>document.getElementById("filtriranjeDatum")).value;
    let datumDobar = await this.provjeraDatum(datumUnos);
    let main: HTMLElement = document.getElementById("lista") as HTMLElement;
    let prikaz = "<ul>";
    for(let p of await this.filmoviServis.dohvatiFiltriranje(idZanr, datumDobar)) {
      prikaz += "<li>" + p.film_id + ". Naziv: " + p.naziv + "</li>";
    }
    prikaz += "</ul>"
    main.innerHTML = prikaz;
  }

}
