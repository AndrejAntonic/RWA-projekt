let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0]
    let ulogiran = await provjeraUloga()
    if(ulogiran)
        await ucitajKorisnike()
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

async function ucitajKorisnike() {
    let main = document.getElementsByTagName("main")[0]
    let main1 = document.getElementsByTagName("main")[1]
    let prikaz = "<ul>"
    for(let p of await dohvatiKorisnike()){
        prikaz+="<li><button type='button' id='"+p.korime+"' onclick='gumbPritisnut(id)'>"+p.korime+"</button></li>";
    }
    main.innerHTML = prikaz + "</ul>"
    main1.innerHTML = ""
}

async function dohvatiKorisnike(){
    let odgovor = await fetch(url+"/dajKorisnike");
    let podaci = await odgovor.text();
    console.log(podaci);
    let filmovi = JSON.parse(podaci);
    return filmovi;
}

async function gumbPritisnut(korime) {
    let main = document.getElementsByTagName("main")[1]
    let korisnik = await dohvatiKorisnika(korime)
    let podaci = "<h3> Podaci o korisniku: </h3> <ul>"
    if(korisnik.blokiran == 1)
        podaci += "<b>Korisnik je blokiran</b>"
    podaci += "<li> ID: " + korisnik.id + "</li>"
    podaci += "<li> Korisničko ime: " + korisnik.korime + "</li>"
    podaci += "<li> Hashana lozinka: " + korisnik.lozinka + "</li>"
    podaci += "<li> E-mail: " + korisnik.email + "</li>"
    podaci += "<li> Ime: " + korisnik.ime + "<input type='text' id='ime'></li>"
    podaci += "<li> Prezime: " + korisnik.prezime + "<input type='text' id='prezime'></li>"
    podaci += "<li> TOTPkljuc: " + korisnik.TOTPkljuc + "<input type='text' id='totpkljuc'></li>"
    podaci += "<li> Uloga: " + korisnik.uloga_id + "<input type='text' id='uloga'> 1 = administrator; 2 = običan korisnik</li>"
    podaci += "</ul>"
    podaci += "<button type='button' id='"+korisnik.korime+"' onClick='azuriraj(id)'>Ažuriraj</button> &emsp;"
    if(korisnik.blokiran == 0)
        podaci += "<button type'button' id='"+korisnik.id+"' onClick='blokiraj(id, 1)'>Blokiraj korisnika</button>"
    else
        podaci += "<button type'button' id='"+korisnik.id+"' onClick='blokiraj(id, 0)'>Odblokiraj korisnika</button>"
    main.innerHTML = podaci
}

async function blokiraj(id, broj) {
    let tijelo = {
        broj: broj
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)}
    await fetch(url+"/blokirajKorisnika?id="+id+"&broj="+broj, parametri);
    let odgovor = "Podaci su ažurirani"
    ucitajKorisnike();
}

async function azuriraj(korime) {
    let ime = document.getElementById("ime").value
    let prezime = document.getElementById("prezime").value
    let totp = document.getElementById("totpkljuc").value
    let uloga = document.getElementById("uloga").value

    let tijelo = {
        ime: ime,
        prezime: prezime,
        totp: totp,
        uloga: uloga
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)}
    await fetch(url+"/azurirajKorisnikaAdmin?korime="+korime+"&ime="+ime+"&prezime="+prezime+"&totp="+totp+"&uloga="+uloga, parametri);
    let odgovor = "Podaci su ažurirani"
    ucitajKorisnike();
}

async function dohvatiKorisnika(korime) {
    let odgovor = await fetch(url+"/dajProfil?korime="+korime);
    let podaci = await odgovor.text();
    console.log(podaci);
    let korisnik = JSON.parse(podaci);
    return korisnik;
}