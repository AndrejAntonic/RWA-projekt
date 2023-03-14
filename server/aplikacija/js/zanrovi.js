let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0]
    let ulogiran = await provjeraUloga()
    console.log("-----------------------" + ulogiran)
    if(ulogiran)
        await ucitajZanrove()
    else
        main.innerHTML = "Morate biti administrator da uđete u ovu stranicu!"
});

async function provjeraUloga(){
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

async function dodajSve() {
    let main = document.getElementsByTagName("p")[0]
    let prikaz = "<ul>"
    for(let p of await dohvatiTMDBZanrove())
    {
        if(await provjeraPostoji(p.id))
            prikaz += "<li>" + p.name + " već postoji u bazi </li>"
        else
        {
            await dodajUBazu(p.id, p.name)
        }
    }
    ucitajZanrove();
    main.innerHTML += prikaz + "</ul>"
}

async function dodajOdabrano(){
    let main = document.getElementsByTagName("p")[0]
    let prikaz = "<ul>"
    let checkbox = document.querySelectorAll("input[type=checkbox]:checked")
    for(var i = 0; i < checkbox.length; i++)
    {
        if(await provjeraPostoji(checkbox[i].value))
            prikaz += "<li>" + checkbox[i].name + " već postoji u bazi </li>"
        else
        {
            await dodajUBazu(checkbox[i].value, checkbox[i].name)
        }
    }
    ucitajZanrove();
    main.innerHTML += prikaz + "</ul>"
}

async function provjeraPostoji(id) {
    let provjera = false;
    for(let p of await dohvatiZanrove())
    {
        if(p.id == id)
        {
           provjera = true;
        }
    }
    return provjera
}

async function dodajUBazu(id, naziv)
{
    let tijelo = {
        id: id,
        ime: naziv
    }
    let parametri = { method: 'POST', body: JSON.stringify(tijelo)}
    await fetch(url+"/dodajZanr?id="+id+"&ime="+naziv, parametri);
    let odgovor = "Zanrovi su dodani"
    return odgovor
}

async function dohvatiZanrove(){
    let odgovor = await fetch(url+"/dajZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}

async function obrisiZanrove() {
    await fetch(url+"/obrisiZanrove");
    let odgovor = "Zanrovi su obrisani";
    return odgovor
}

async function promijeniZanr(staroZanr, novoZanr) {
    await fetch(url+"/promijeniZanrove?staroZanr=" + staroZanr + "&novoZanr=" + novoZanr);
    let odgovor = "Zanr je promijenjen";
    return odgovor
}

async function dohvatiTMDBZanrove() {
    let odgovor = await fetch(url+"/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci)
    let zanrovi = JSON.parse(podaci);
    return zanrovi
}

async function ucitajZanrove() {
    let main0 = document.getElementsByTagName("main")[0]
    let main = document.getElementsByTagName("main")[1];
    let main2 = document.getElementsByTagName("main")[2]
    let main3 = document.getElementsByTagName("main")[3]
    let prikaz = "<ol>";
    let prikaz0 = "<button type='button' onClick='obrisiKojiNemaju()' id='obrisi'>Obriši sve žanrove koji nemaju film</button>"
    let prikaz3 = "<button type='button' onClick='dohvatiTMDB()' id='dohvatiTMDB'>Dohvati žanrove sa TMDB</button>"
    let prikaz2 = "<label for='staroZanr'>ID žanr-a kojemu želite promijeniti naziv:</label>"
    prikaz2 += "<input type='text' id='staroZanr' name='staroZanr'>"
    prikaz2 += "<label for='novoZanr'>Novi naziv:</label>"
    prikaz2 += "<input type='text' id='novoZanr' name='novoZanr'>"
    prikaz2 += "<button type='button' onClick='promijeni()' id='promijeni'>Promijeni</button>"
    console.log("zanrovi.js ucitavanje")
    for(let p of await dohvatiZanrove()){
        prikaz+="<li> ID: "+p.id+"  Ime: "+p.zanr_ime+"</li>";
    }
    main0.innerHTML = prikaz0
    main.innerHTML = prikaz+"</ol>";
    main2.innerHTML = prikaz2
    main3.innerHTML = prikaz3
}

async function obrisiKojiNemaju() {
    await obrisiZanrove();
    ucitajZanrove();
}

async function dohvatiTMDB() {
    let main = document.getElementsByTagName("main")[4]
    let prikaz = "<ul>"
    for(let p of await dohvatiTMDBZanrove()){
        prikaz += "<li> Naziv: " + p.name + "<input type='checkbox' id='"+p.id+"' value='"+p.id+"' name='"+p.name+"'></li>"
    }
    prikaz += "</ul>"
    prikaz +=  "<button type='button' id='dodajSve' onclick='dodajSve()'>Dodaj sve u bazu</button>"
    prikaz += "<button type='button' id='dodajOdabrano' onclick='dodajOdabrano()'>Dodaj odabrano u bazu</button>"
    main.innerHTML = prikaz
}

async function promijeni() {
    const staroZanr = document.getElementById("staroZanr").value;
    const novoZanr = document.getElementById("novoZanr").value;
    let ima = false;
    for(let p of await dohvatiZanrove()){
        if(staroZanr == p.id)
        {
            ima = true;
            break;
        }
    }
    if(ima){
        await promijeniZanr(staroZanr, novoZanr)
        this.location.reload();
    }
    else {
        let h3 = document.getElementsByTagName("h3")[0]
        h3.innerHTML = "Niste unijeli valjan ID!"
    }
}