let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0]
    let ulogiran = await provjeraAktivan()
    if(ulogiran)
        main.innerHTML = "Već ste prijavljeni!"
    else
        ucitaj()
});

async function ucitaj() {
    let main = document.getElementsByTagName("main")[1]
    let prikaz = "<form action='/prijava' method='POST'>"
    prikaz += "<label for'korime'>Korisničko ime</label>"
    prikaz += "<input type='text' name='korime' />"
    prikaz += "<label for='lozinka'>Lozinka</label>"
    prikaz += "<input type='text' name='lozinka' />"
    prikaz += "<label for='totp'>TOTP</label>"
    prikaz += "<input type='text' name='totp' />"
    prikaz += "<input type='submit' value='Šalji' />"
    prikaz += "</form>"
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