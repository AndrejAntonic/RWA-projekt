import { Component } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-azuriranje-filmova',
  templateUrl: './azuriranje-filmova.component.html',
  styleUrls: ['./azuriranje-filmova.component.sass']
})
export class AzuriranjeFilmovaComponent {

  constructor(private filmoviServis: FilmoviService, private korisniciServis: KorisniciService) { };

  async ngOnInit() {
    this.provjeraUloga();
  }

  async provjeraUloga() {
    let main: HTMLElement = document.getElementById("glavni") as HTMLElement;
    let ulogiran = await this.korisniciServis.provjeraUloga()
    if(ulogiran)
        this.ucitajFilmove();
    else
        main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!"
  }

  async ucitajFilmove() {
    let main: HTMLElement = document.getElementById("proba") as HTMLElement;
    let prikaz = "";
    for(let p of await this.filmoviServis.dohvatiSveFilmove()) {
      prikaz += "<li>ID: " + p.film_id + " Naziv: " + p.naziv + "</li>";
    }
    main.innerHTML = prikaz;
  }

  async ucitajPodatke() {
    let id = (<HTMLInputElement>document.getElementById("film_id")).value;
    let film;
    if(id != "")
      film = await this.filmoviServis.dohvatiPodatkeFilma(id);
    let regex = /^[0-9]*$/
    let id_label: HTMLElement = document.getElementById("film_id_label") as HTMLElement;
    let naziv_label: HTMLElement = document.getElementById("film_naziv_label") as HTMLElement;
    let zanr_label: HTMLElement = document.getElementById("film_zanr_label") as HTMLElement;
    let zanr_id_label: HTMLElement = document.getElementById("film_zanr_id_label") as HTMLElement;
    let trajanje_label: HTMLElement = document.getElementById("film_trajanje_label") as HTMLElement;
    let datum_label: HTMLElement = document.getElementById("film_datum_label") as HTMLElement;
    let budzet_label: HTMLElement = document.getElementById("film_budzet_label") as HTMLElement;
    let prihodi_label: HTMLElement = document.getElementById("film_prihodi_label") as HTMLElement;
    let jezik_label: HTMLElement = document.getElementById("film_jezik_label") as HTMLElement;
    let originalni_naziv_label: HTMLElement = document.getElementById("film_originalni_naziv_label") as HTMLElement;
    let opis_label: HTMLElement = document.getElementById("film_opis_label") as HTMLElement;
    let ocjena_label: HTMLElement = document.getElementById("film_ocjena_label") as HTMLElement;
    let broj_glasova_label: HTMLElement = document.getElementById("film_broj_glasova_label") as HTMLElement;
    let status_label: HTMLElement = document.getElementById("film_status_label") as HTMLElement;
    let godina_izlaska_label: HTMLElement = document.getElementById("film_godina_izlaska_label") as HTMLElement;
    let h3: HTMLElement = document.getElementById("upozorenje") as HTMLElement;
    h3.innerHTML = "";
    if(film == null || !regex.test(id) || id == "") {
      id_label.innerHTML = "ID: ";
      naziv_label.innerHTML = "Naziv: ";
      zanr_label.innerHTML = "Žanr: ";
      zanr_id_label.innerHTML = "Žanr ID: ";
      trajanje_label.innerHTML = "Trajanje: ";
      datum_label.innerHTML = "Datum unosa: ";
      budzet_label.innerHTML = "Budžet: ";
      prihodi_label.innerHTML = "Prihodi: ";
      jezik_label.innerHTML = "Jezik: ";
      originalni_naziv_label.innerHTML = "Originalni naziv: ";
      opis_label.innerHTML = "Opis: ";
      ocjena_label.innerHTML = "Ocjena: ";
      broj_glasova_label.innerHTML = "Broj glasova: ";
      status_label.innerHTML = "Status: ";
      godina_izlaska_label.innerHTML = "Godina izlaska: ";
    }
    else {
      id_label.innerHTML = "ID: " + film.film_id + " ->";
      naziv_label.innerHTML = "Naziv: " + film.naziv + " ->";
      zanr_label.innerHTML = "Žanr: " + film.zanr_ime;
      zanr_id_label.innerHTML = "Žanr ID: " + film.id;
      trajanje_label.innerHTML = "Trajanje: " + film.trajanje + " ->";
      let datum = JSON.stringify(film.datum_unosa);
      let datumPolje = datum.split("-");
      let datumDan = datumPolje[2].split("T");
      datumDan = datumDan[0].split('"');
      let datumGodina = datumPolje[0].split('"');
      datum = datumDan[0] + "." + datumPolje[1] + "." + datumGodina[1] + ".";
      datum_label.innerHTML = "Datum unosa: " + datum + " ->";
      budzet_label.innerHTML = "Budžet: " + film.budzet + " ->";
      prihodi_label.innerHTML = "Prihodi: " + film.prihodi + " ->";
      jezik_label.innerHTML = "Jezik: " + film.jezik + " ->";
      originalni_naziv_label.innerHTML = "Originalni naziv: " + film.originalni_naziv + " ->";
      opis_label.innerHTML = "Opis: " + film.opis + " ->";
      ocjena_label.innerHTML = "Ocjena: " + film.ocjena + " ->";
      broj_glasova_label.innerHTML = "Broj glasova: " + film.broj_glasova + " ->";
      status_label.innerHTML = "Status: " + film.status + " ->";
      godina_izlaska_label.innerHTML = "Godina izlaska: " + film.godina_izlaska + " ->";
    }
  }

  async azuriraj() {
    let id = (<HTMLInputElement>document.getElementById("film_id")).value;
    let film;
    if(id != "")
      film = await this.filmoviServis.dohvatiPodatkeFilma(id);
    let regex = /^[0-9]*$/
    let h3: HTMLElement = document.getElementById("upozorenje") as HTMLElement;
    if(film == null || !regex.test(id) || id == "")
      h3.innerHTML = "Film sa danim ID ne postoji!"
    else {
      h3.innerHTML = "";
      let naziv = (<HTMLInputElement>document.getElementById("film_naziv")).value;
      let trajanje = (<HTMLInputElement>document.getElementById("film_trajanje")).value;
      let datum = (<HTMLInputElement>document.getElementById("film_datum")).value;
      let budzet = (<HTMLInputElement>document.getElementById("film_budzet")).value;
      let prihodi = (<HTMLInputElement>document.getElementById("film_prihodi")).value;
      let jezik = (<HTMLInputElement>document.getElementById("film_jezik")).value;
      let originalni_naziv = (<HTMLInputElement>document.getElementById("film_originalni_naziv")).value;
      let opis = (<HTMLInputElement>document.getElementById("film_opis")).value;
      let ocjena = (<HTMLInputElement>document.getElementById("film_ocjena")).value;
      let broj_glasova = (<HTMLInputElement>document.getElementById("film_broj_glasova")).value;
      let status = (<HTMLInputElement>document.getElementById("film_status")).value;
      let godina_izlaska = (<HTMLInputElement>document.getElementById("film_godina_izlaska")).value;
      await this.filmoviServis.azuriranjeFilmova(id, naziv, trajanje, datum, budzet, prihodi, jezik, originalni_naziv, opis, ocjena, broj_glasova, status, godina_izlaska);
    }
    this.ucitajFilmove();
  }

}
