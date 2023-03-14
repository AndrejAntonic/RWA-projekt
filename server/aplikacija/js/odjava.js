let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0];
    let prikaz = ""
    let ulogiran = await provjeraAktivan()
    if(ulogiran)
    {
        prikaz += "Jeste li sigurni da se želite odjaviti? &emsp;"
        prikaz += "<button type='button' id='da' onclick='odjaviMe()'>Da</button> &emsp;"
        prikaz += "<button type='button' id='ne' onclick='nemojMeOdjaviti()'>Ne</button>"
    }
    else
        prikaz += "Niste prijavljeni!"
    main.innerHTML = prikaz
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

async function odjaviMe() {
    let id = await vratiID();
    let tijelo = {
        aktivan: 0
    }
    let parametri = { method: 'PUT', body: JSON.stringify(tijelo)}
    await fetch(url + "/odjavi?id=" + id + "&aktivan=" + 0, parametri);
    document.location.href = url + "/"
}

async function nemojMeOdjaviti() {
    document.location.href = url + "/"
}

async function vratiID() {
    var poruka = await fetch(url + "/provjeriOdjavu");
    let korisnik = await poruka.text();
    let prvo = korisnik.split('"')
    let drugo = prvo[2].split(":")
    let trece = drugo[1].split(",")
    return trece[0]
}