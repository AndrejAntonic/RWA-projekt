import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';
import { ZanroviService } from '../servisi/zanrovi.service';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.sass']
})
export class ZanroviComponent {

  constructor(private zanroviServis: ZanroviService, private korisniciServis: KorisniciService) { };

  async ngOnInit() {
    this.provjeraUloga();
  }

  async provjeraUloga() {
    let main: HTMLElement = document.getElementById("glavni") as HTMLElement;
    let ulogiran = await this.korisniciServis.provjeraUloga()
    if(ulogiran)
        this.ucitajZanrove();
    else
        main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!"
  }

  async ucitajZanrove() {
    let main: HTMLElement = document.getElementById('lista') as HTMLElement;
    let prikaz = ""
    for(let p of await this.zanroviServis.dohvatiZanrove()) {
      prikaz += "<li> ID: " + p.id + " Ime: " + p.zanr_ime + "</li>";
    }
    main.innerHTML = prikaz;
  }

  async obrisiKojiNemaju() {
    this.zanroviServis.obrisiZanrove();
    this.ucitajZanrove();
  }

  async promijeni() {
    var staroZanr = (<HTMLInputElement>document.getElementById("staroZanr")).value;
    var novoZanr = (<HTMLInputElement>document.getElementById("novoZanr")).value;
    let ima = false;
    for(let p of await this.zanroviServis.dohvatiZanrove()) {
      if(staroZanr == p.id) {
        ima = true;
        break;
      }
    }
    if(ima) {
      await this.zanroviServis.promijeniZanr(staroZanr, novoZanr);
      this.ucitajZanrove();
    }
    else {
      let h3: HTMLElement = document.getElementById("h3") as HTMLElement;
      h3.innerHTML = "Niste unijeli valjan ID!";
    }
  }

  async dohvatiTMDB() {
    let main: HTMLElement = document.getElementById("tmdb_lista") as HTMLElement;
    let prikaz = "<ul>";
    for(let p of await this.zanroviServis.dohvatiZanroveTMDB()) {
      prikaz += "<li> Naziv: " + p.name + "</li>";
    }
    prikaz += "</ul>";
    main.innerHTML = prikaz;
  }

}