let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0]
    let ulogiran = await provjeraAktivan()
    if(ulogiran)
        ucitaj()
    else
        main.innerHTML = "Niste prijavljeni!"
});

async function provjeraAktivan(){
    var poruka = await fetch(url + "/provjeriOdjavu");
    let korisnik = await poruka.text();
    if(korisnik == "[]")
    {
        return false
    }
    else
    {
        return true
    }
}

async function ucitaj() {
    let main = document.getElementsByTagName("main")[1];
    let main0 = document.getElementsByTagName("main")[0]
    let main2 = document.getElementsByTagName("main")[2]
    let prikazFiltriranje = "<label for='filtriranjeZanr'>Filtriranje po žanru: </label>"
    prikazFiltriranje += "<input type='text' id='filtriranjeZanr'><br>"
    prikazFiltriranje += "<label for='filtriranjeDatum'>Filtriranje po datumu: </label>"
    prikazFiltriranje += "<input type='text' id='filtriranjeDatum'>"
    prikazFiltriranje += "<button type='button' onClick='filtriranje()' id='filtriranje'>Filtriranje</button><br>"
    prikazFiltriranje += "<label for='sortiranje'>Uzlazno sortiranje po: </label>"
    prikazFiltriranje += "<button type='button' onClick='sortiranjeNaziv()' id='naziv'>Nazivu</button>"
    prikazFiltriranje += "<button type='button' onClick='sortiranjeDatum()' id='datum'>Datumu</button>"
    prikazFiltriranje += "<button type='button' onClick='sortiranjeZanr()' id='zanr'>Žanru</button>"
    let prikazResetiraj = "<button type='button' onClick='resetiraj()' id='resetiraj'>Resetiraj listu filmova</button>"
    prikaz = "<ol>";
    console.log("filmoviPregled.js ucitavanje")
    for(let p of await dohvatiFilmove()){
        prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
    }
    main0.innerHTML = prikazFiltriranje
    main.innerHTML = prikaz+"</ol>";
    main2.innerHTML = prikazResetiraj
}

async function resetiraj() {
    ucitaj();
}

async function filtriranje() {
    let datumDobar
    let zanrUnos = document.getElementById("filtriranjeZanr").value
    let idZanr
    let main = document.getElementsByTagName("main")[1];
    let prikaz = "<ol>";
    idZanr = await provjeraZanr(zanrUnos);
    let datumUnos = document.getElementById("filtriranjeDatum").value
    datumDobar = await provjeraDatum(datumUnos);
    
    if(idZanr != null && datumDobar == null)
    {
        for(let p of await dohvatiFiltriranje(idZanr))
        {
            prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
        }
        main.innerHTML = prikaz+"</ol>";
    }
    else if(datumDobar != null && idZanr == null)
    {
        for(let p of await dohvatiFiltriranje(null, datumUnos)){
            prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
        }
        main.innerHTML = prikaz+"</ol>";
    }
    else if(idZanr != null && datumDobar != null)
    {
        for(let p of await dohvatiFiltriranje(idZanr, datumUnos)){
            prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
        }
        main.innerHTML = prikaz+"</ol>";
    }
}

async function sortiranjeNaziv() {
    let skracenica = "n"
    let zanrUnos = document.getElementById("filtriranjeZanr").value
    let idZanr = await provjeraZanr(zanrUnos)
    let datumUnos = document.getElementById("filtriranjeDatum").value
    let datumDobar = await provjeraDatum(datumUnos)
    let main = document.getElementsByTagName("main")[1];
    let prikaz = "<ol>";
    for(let p of await dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)){
        prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
    }
    main.innerHTML = prikaz+"</ol>";
}

async function sortiranjeDatum() {
    let skracenica = "d"
    let zanrUnos = document.getElementById("filtriranjeZanr").value
    let idZanr = await provjeraZanr(zanrUnos)
    let datumUnos = document.getElementById("filtriranjeDatum").value
    let datumDobar = await provjeraDatum(datumUnos)
    let main = document.getElementsByTagName("main")[1];
    let prikaz = "<ol>";
    for(let p of await dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)){
        prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
    }
    main.innerHTML = prikaz+"</ol>";
}

async function sortiranjeZanr() {
    let skracenica = "z"
    let zanrUnos = document.getElementById("filtriranjeZanr").value
    let idZanr = await provjeraZanr(zanrUnos)
    let datumUnos = document.getElementById("filtriranjeDatum").value
    let datumDobar = await provjeraDatum(datumUnos)
    let main = document.getElementsByTagName("main")[1];
    let prikaz = "<ol>";
    for(let p of await dohvatiSortiranoFiltrirano(idZanr, datumDobar, skracenica)){
        prikaz+="<li> Naziv: <button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
    }
    main.innerHTML = prikaz+"</ol>";
}

async function gumbPritisnut(zanr) {
   let main = document.getElementsByTagName("main")[3]
   let film = await dohvatiFilm(zanr)
   let podaci = "<h3> Podaci o filmu: " + film.naziv + "</h3> <ul>"
   podaci += "<li> ID: " + film.film_id + "</li>"
   podaci += "<li> Žanr: " + film.zanr_ime + "</li>"
   podaci += "<li> Žanr ID: " + film.id + "</li>"
   podaci += "<li> Trajanje: " + film.trajanje + "</li>"
   let datum = JSON.stringify(film.datum_unosa);
   let datumPolje = datum.split("-")
   let datumDan = datumPolje[2].split("T")
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
   podaci += "<li> Godina izlaska: " + film.godina_izlaska + "</li>"
   podaci += "</ul>"
   main.innerHTML = podaci
}

async function dohvatiFilm(id) {
    let odgovor = await fetch(url+"/dajFilm/"+id);
    let podaci = await odgovor.text();
    console.log(podaci);
    let film = JSON.parse(podaci);
    return film;
}

async function provjeraZanr(zanr = null) {
    let idZanr
    let pronaden = false;
    if(zanr != null) 
    {
        for(let p of await dohvatiZanrove())
        {
            if(p.zanr_ime == zanr)
            {
                idZanr = p.id
                pronaden = true
            }
        }
    }
    if(pronaden)
        return idZanr
    else
        return null;
}

async function provjeraDatum(datum = null) {
    let regexDatum = /\d{2}(\.)\d{2}(\.)\d{4}/
    if(datum != "" && regexDatum.test(datum))
        return datum
    else
        return null
}

async function dohvatiSortiranoFiltrirano(zanr = null, datum = null, sortiranje = null) {
    if(zanr == null && datum == null)
    {
        let odgovor = await fetch(url+"/dajFilmove/?sortiraj="+sortiranje);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    else if(zanr != null && datum == null)
    {
        let odgovor = await fetch(url+"/dajFilmove/?zanr="+zanr+"&sortiraj="+sortiranje);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    else if(zanr == null && datum != null)
    {
        let odgovor = await fetch(url+"/dajFilmove/?datum="+datum+"&sortiraj="+sortiranje);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    } 
    else
    {
        let odgovor = await fetch(url+"/dajFilmove/?zanr="+zanr+"&datum="+datum+"&sortiraj="+sortiranje);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
}

async function dohvatiFilmove(sortiranje = null){
    if(sortiranje != null)
    {
        let odgovor = await fetch(url+"/dajFilmove/?sortiraj="+sortiranje);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    else
    {
        let odgovor = await fetch(url+"/dajFilmove");
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
}

async function dohvatiZanrove(){
    let odgovor = await fetch(url+"/dajZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}

async function dohvatiFiltriranje(zanr = null, datum = null) {
    if(zanr != null && datum == null)
    {
        let odgovor = await fetch(url+"/dajFilmove/?zanr="+zanr);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    else if(zanr == null && datum != null)
    {
        let odgovor = await fetch(url+"/dajFilmove/?datum="+datum);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    else
    {
        let odgovor = await fetch(url+"/dajFilmove/?zanr="+zanr+"&datum="+datum);
        let podaci = await odgovor.text();
        console.log(podaci);
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
}