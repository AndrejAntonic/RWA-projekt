let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0]
    let ulogiran = await provjeraUloga()
    if(ulogiran)
        await ucitajFilmove()
    else
        main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!"
});

async function provjeraUloga() {
    var poruka = await fetch(url + "/provjeriUlogu");
    let korisnik = await poruka.text();
    console.log(korisnik)
    if(korisnik == "[]")
    {
        return false
    }
    else {
        let uloga1 = korisnik.split(':')
        let uloga2 = uloga1[1].split("}")
        if (uloga2[0] == 2) {
            return false
        }
        else if (uloga2[0] == 1) {
            return true
        }
    }
}

async function ucitajFilmove() {
    let main = document.getElementsByTagName("main")[0]
    let main1 = document.getElementsByTagName("main")[1]
    let prikaz = "<ul>"
    for(let p of await dohvatiFilmove()){
        prikaz+="<li><button type='button' id='"+p.film_id+"' onclick='gumbPritisnut(id)'>"+p.naziv+"</button></li>";
    }
    main.innerHTML = prikaz + "</ul>"
    main1.innerHTML = ""
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

async function gumbPritisnut(zanr) {
    let main = document.getElementsByTagName("main")[1]
    let film = await dohvatiFilm(zanr)
    let podaci = "<h3> Podaci o filmu: </h3> <ul>"
    podaci += "<li> ID: " + film.film_id + "</li>"
    podaci += "<li> Naziv: " + film.naziv + "<input type='text' id='naziv'> </li>"
    podaci += "<li> Žanr: " + film.zanr_ime + "</li>"
    podaci += "<li> Žanr ID: " + film.id + "</li>"
    podaci += "<li> Trajanje: " + film.trajanje + "<input type='text' id='trajanje'></li>"
    let datum = JSON.stringify(film.datum_unosa);
    let datumPolje = datum.split("-")
    let datumDan = datumPolje[2].split("T")
    let datumGodina = datumPolje[0].split('"')
    datum = datumDan[0] + "." + datumPolje[1] + "." + datumGodina[1] + "."
    podaci += "<li> Datum unosa: " + datum + "<input type='text' id='datum'></li>"
    podaci += "<li> Budžet: " + film.budzet + "<input type='text' id='budzet'></li>"
    podaci += "<li> Prihodi: " + film.prihodi + "<input type='text' id='prihodi'></li>"
    podaci += "<li> Jezik: " + film.jezik + "<input type='text' id='jezik'></li>"
    podaci += "<li> Originalni naziv: " + film.originalni_naziv + "<input type='text' id='org_naziv'></li>"
    podaci += "<li> Opis: " + film.opis + "<input type='text' id='opis'></li>"
    podaci += "<li> Ocjena: " + film.ocjena + "<input type='text' id='ocjena'></li>"
    podaci += "<li> Broj glasova: " + film.broj_glasova + "<input type='text' id='broj_glasova'></li>"
    podaci += "<li> Status: " + film.status + "<input type='text' id='status'></li>"
    podaci += "<li> Godina izlaska: " + film.godina_izlaska + "<input type='text' id='godina'></li>"
    podaci += "</ul>"
    podaci += "<button type='button' id='"+film.film_id+"' onClick='azuriraj(id)'>Ažuriraj</button>"
    main.innerHTML = podaci
 }

 async function dohvatiFilm(id) {
    let odgovor = await fetch(url+"/dajFilm/"+id);
    let podaci = await odgovor.text();
    console.log(podaci);
    let film = JSON.parse(podaci);
    return film;
}

async function azuriraj(id) {
    let naziv_filma = document.getElementById("naziv").value
    let trajanje = document.getElementById("trajanje").value
    let datum = document.getElementById("datum").value
    let budzet = document.getElementById("budzet").value
    let prihodi = document.getElementById("prihodi").value
    let jezik = document.getElementById("jezik").value
    let org_naziv = document.getElementById("org_naziv").value
    let opis = document.getElementById("opis").value
    let ocjena = document.getElementById("ocjena").value
    let broj_glasova = document.getElementById("broj_glasova").value
    let status = document.getElementById("status").value
    let godina = document.getElementById("godina").value

    let tijelo = {
        naziv: naziv_filma,
        trajanje: trajanje,
        datum: datum,
        budzet: budzet,
        prihodi: prihodi,
        jezik: jezik,
        org_naziv: org_naziv,
        opis: opis,
        ocjena: ocjena,
        broj_glasova: broj_glasova,
        status: status,
        godina: godina
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)}
    await fetch(url+"/azurirajFilm?id="+id+"&naziv="+naziv_filma+"&trajanje="+trajanje+"&datum="+datum+"&budzet="+budzet+"&prihodi="+prihodi+"&jezik="+jezik+"&org_naziv="+org_naziv+"&opis="+opis+"&ocjena="+ocjena+"&broj_glasova="+broj_glasova+"&status="+status+"&godina="+godina, parametri);
    let odgovor = "Podaci su ažurirani"
    ucitajFilmove()
}
