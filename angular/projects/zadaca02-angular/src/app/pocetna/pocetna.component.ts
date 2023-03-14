import { Component, EventEmitter, Output } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';
import { ZanroviService } from '../servisi/zanrovi.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.sass']
})

export class PocetnaComponent {

  constructor(private zanroviServis: ZanroviService, private filmoviServis: FilmoviService) { };

  async ngOnInit() {
    let main: HTMLElement = document.getElementById('lista') as HTMLElement;
    let prikaz = "";
    main.innerHTML = prikaz;
    for(let p of await this.zanroviServis.dohvatiZanrove()){
      prikaz += "<li>" + p.zanr_ime;
      let filmovi = await this.filmoviServis.dohvatiFilmove(p.id);
      if(filmovi[0] != undefined && filmovi[1] != undefined)
      {
          prikaz+="<ul>";
            prikaz+="<li>"+filmovi[0]["naziv"]+"</li>"
            prikaz+="<li>"+filmovi[1]["naziv"]+"</li>"
            prikaz+="</ul></li>"
        }
        else
        {
            prikaz+="<ul>";
            prikaz+="<li> Film za dani žanr ne postoji </li>"
            prikaz+="<li> Film za dani žanr ne postoji </li>"
            prikaz+="</ul></li>"
        }
        
    }
    main.innerHTML = prikaz;
  }

  /*
  ngOnInit() {
    this.provjeriPodatke();
    if(this.zanrovi.length == 0) {
      setTimeout(this.provjeriPodatke.bind(this), 3000);
    }
  }

  provjeriPodatke() {
    this.zanrovi = this.zanroviServis.dajZanrove();
    this.sviZanrovi = this.zanrovi;
  }

  
  naziv?:string;

  filmovi: Array<FilmoviI> = new Array<FilmoviI>();
  sviFilmovi?: Array<FilmoviI>;

  constructor(private filmoviServis: FilmoviService) {};

  prikaziFilm(naziv?:string) {
    this.naziv = naziv;
  }

  ngOnInit() {
    this.provjeriPodatke();
    if(this.filmovi.length == 0)
      setTimeout(this.provjeriPodatke.bind(this), 3000);
  }

  
  provjeriPodatke() {
    this.filmovi = this.filmoviServis.dajFilmove();
    this.sviFilmovi = this.filmovi;
  }

  @Output() prikaziDetalje = new EventEmitter<string>();

  zanrovi: Array<ZanroviI> = new Array<ZanroviI>();
  sviZanrovi?: Array<ZanroviI>;

  constructor(private zanroviServis: ZanroviService) { };

  ngOnInit() {
    this.provjeriPodatke();
    if(this.zanrovi.length == 0) {
      setTimeout(this.provjeriPodatke.bind(this), 3000);
    }
  }

  provjeriPodatke() {
    this.zanrovi = this.zanroviServis.dajZanrove();
    this.sviZanrovi = this.zanrovi;
    
  }
  */
}
