import { Component } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.sass']
})
export class FilmComponent {

  constructor(private filmoviServis: FilmoviService, private korisniciServis: KorisniciService) { };

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
      main.innerHTML = "Niste prijavljeni!";
    }
  }

  async ucitajFilmove() {
    let main: HTMLElement = document.getElementById('lista') as HTMLElement;
    let prikaz = "";
    for(let p of await this.filmoviServis.dohvatiSveFilmove()) {
      prikaz += "<li>ID: " + p.film_id + " Naziv: " + p.naziv + "</li>";
    }
    main.innerHTML = prikaz;
  }

  async gumbPritisnut() {
    let id = (<HTMLInputElement>document.getElementById("odabraniFilm")).value;
    let main: HTMLElement = document.getElementById("podaci_film") as HTMLElement;
    let upozorenje: HTMLElement = document.getElementById("upozorenje") as HTMLElement;
    let film = await this.filmoviServis.dohvatiPodatkeFilma(id);
    let podaci = "";
    if(film == null)
      upozorenje.innerHTML = "Film sa upisanim ID ne postoji!";
    else {
      podaci = "<h3> Podaci o filmu: " + film.naziv + "</h3> <ul>"
      podaci += "<li> ID: " + film.film_id + "</li>"
      podaci += "<li> Žanr: " + film.zanr_ime + "</li>"
      podaci += "<li> Žanr ID: " + film.id + "</li>"
      podaci += "<li> Trajanje: " + film.trajanje + "</li>"
      let datum = JSON.stringify(film.datum_unosa);
      let datumPolje = datum.split("-")
      let datumDan = datumPolje[2].split("T")
      datumDan = datumDan[0].split('"');
      let datumGodina = datumPolje[0].split('"')
      datum = datumDan[0] + "." + datumPolje[1] + "." + datumGodina[1] + "."
      podaci += "<li> Datum unosa: " + datum + "</li>"
      podaci += "<li> Trajanje: " + film.trajanje + "</li>"
      podaci += "<li> Budžet: " + film.budzet + "</li>"
      podaci += "<li> Prihodi: " + film.prihodi + "</li>"
      podaci += "<li> Jezik: " + film.jezik + "</li>"
      podaci += "<li> Originalni naziv: " + film.originalni_naziv + "</li>"
      podaci += "<li> Opis: " + film.opis + "</li>"
      podaci += "<li> Ocjena: " + film.ocjena + "</li>"
      podaci += "<li> Broj glasova: " + film.broj_glasova + "</li>"
      podaci += "<li> Godina izlaska: " +film.godina_izlaska + "</li>"
      podaci += "<li> Korisnik dodao: " + film.korime + "</li>"
      podaci += "</ul>"
    }
    main.innerHTML = podaci
  }

}
