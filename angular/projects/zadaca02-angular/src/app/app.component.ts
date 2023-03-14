import { Component } from '@angular/core';
import { FilmoviService } from './servisi/filmovi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'Zadaca02Angular';
  putanja='pocetna';

  constructor(private filmoviServis: FilmoviService) {};

  prebaciNa(putanja:string, dogadaj:any) {
    this.putanja = putanja;
    console.log("prebacujem na:" + dogadaj);
  }
  
}
