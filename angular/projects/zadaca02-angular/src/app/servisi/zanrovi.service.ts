import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZanroviService {

  restServis = environment.restServis;

  constructor() { 
  }

  async dohvatiZanrove() {
    let odgovor = await fetch(this.restServis + "/dajZanrove");
    let podaci = await odgovor.text();
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
  }

  async obrisiZanrove() {
    await fetch(this.restServis + "/obrisiZanrove");
    let odgovor = "Zanrovi su obrisani";
    return odgovor;
  }

  async promijeniZanr(staroZanr: string, novoZanr: string) {
    await fetch(this.restServis + "/promijeniZanrove?staroZanr=" + staroZanr + "&novoZanr=" + novoZanr);
    let odgovor = "Zanr je promijenjen";
    return odgovor;
  }
  
  
  async dohvatiZanroveTMDB() {
    let odgovor = await fetch(this.restServis + "/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci)
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
  }
  
}
