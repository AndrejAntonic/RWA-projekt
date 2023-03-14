let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    ispisiPodatke();
});

async function ispisiPodatke() {
    let main = document.getElementsByTagName("main")[0];
    let prikaz = ""
    let ulogiran = await provjeraAktivan()
    if(ulogiran)
    {
        let korime = await vratiID();
        let korisnik = await dohvatiPodatke(korime)
        prikaz += "<h3>Vaši korisnički podaci: </h3><ul>"
        prikaz += "<li>Ime: " + korisnik.ime + "</li>"
        prikaz += "<li>Prezime: " + korisnik.prezime + "</li>"
        prikaz += "<li>Korisničko ime: " + korisnik.korime + "</li>"
        prikaz += "<li>E-mail: " + korisnik.email + "</li>"
        prikaz += "<li>Hashana lozinka: " + korisnik.lozinka + "</li>"
        prikaz += "<p>Ažuriraj podatke: </p>"
        prikaz += "<label for='ime'>Ime:</label>"
        prikaz += "<input type='text' id='ime' name='ime'></input>"
        prikaz += "<br><label for='prezime'>Prezime:</label>"
        prikaz += "<input type='text' id='prezime' name='prezime'></input>"
        prikaz += "<br><label for='lozinka'>Lozinka:</label>"
        prikaz += "<input type='text' id='lozinka' name='lozinka'></input>"
        prikaz += "&emsp;<button type='button' id='azuriraj' name='"+ korisnik.korime +"' onClick='azuriraj(name)'>Ažuriraj</button>"
    }
    else
        prikaz += "Niste prijavljeni!"
    main.innerHTML = prikaz
}

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

async function vratiID() {
    var poruka = await fetch(url + "/provjeriOdjavu");
    let korisnik = await poruka.text();
    let prvo = korisnik.split(":")
    let drugo = prvo[2].split('"')
    return drugo[1]
}

async function dohvatiPodatke(korime){
    let odgovor = await fetch(url+"/dajProfil?korime="+korime);
    let podaci = await odgovor.text();
    console.log(odgovor);
    let korisnik = JSON.parse(podaci);
    return korisnik;
}

async function enkriptirajLozinku(lozinka, korime){
    let odgovor = await fetch(url+"/enkriptirajLozinku?lozinka="+lozinka+"&korime="+korime)
    let podaci = await odgovor.text();
    return podaci
}

async function azuriraj(korime) {
    let ime = document.getElementById("ime").value
    let prezime = document.getElementById("prezime").value
    let lozinka = document.getElementById("lozinka").value
    let hashanaLozinka = ""
    if(lozinka != ""){
        hashanaLozinka = await enkriptirajLozinku(lozinka, korime)
    }
    let tijelo = {
        ime: ime,
        prezime: prezime,
        lozinka: hashanaLozinka
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)}
    await fetch(url+"/azurirajKorisnika?korime="+korime+"&ime="+ime+"&prezime="+prezime+"&lozinka="+hashanaLozinka, parametri);
    let odgovor = "Podaci su ažurirani"
    ispisiPodatke()
}
