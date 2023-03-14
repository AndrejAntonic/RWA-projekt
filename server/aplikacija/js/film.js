let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0]
    let ulogiran = await provjeraAktivan()
    if(ulogiran)
        ucitaj()
    else
        main.innerHTML = "Niste prijavljeni!"
});

async function provjeraAktivan() {
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
    let main = document.getElementsByTagName("main")[0];
    prikaz = "";
    for(let p of await dohvatiFilmove()){
        prikaz+="<button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button><br>";
    }
    main.innerHTML = prikaz
}

async function dohvatiFilmove() {
    let odgovor = await fetch(url+"/dajFilmove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let filmovi = JSON.parse(podaci);
    return filmovi;
}

async function gumbPritisnut(zanr) {
    let main = document.getElementsByTagName("main")[1]
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
    podaci += "<li> Godina izlaska: " +film.godina_izlaska + "</li>"
    podaci += "<li> Korisnik dodao: " + film.korime + "</li>"
    podaci += "</ul>"
    main.innerHTML = podaci
}

async function dohvatiFilm(id) {
    let odgovor = await fetch(url+"/dajFilm/"+id);
    let podaci = await odgovor.text();
    let film = JSON.parse(podaci);
    return film;
}