let url = "http://localhost:12005";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0];
    let prikaz = "<ol>";
    console.log("pocetna.js ucitavanje ----------------------------------")
    //console.log(await dohvatiFilmove("love",1));
    for(let p of await dohvatiZanrove()){
        prikaz+="<li>"+p.zanr_ime;
        let filmovi = await dohvatiFilmove(p.id);
        if(filmovi[0] != undefined && filmovi[1] != undefined)
        {
            prikaz+="<ul>";
            prikaz+="<li>"+filmovi[0]["naziv"]+"</li>"
            prikaz+="<li>"+filmovi[1]["naziv"]+"</li>"
            prikaz+="</ul></li>"
        }
        else
        {
            prikaz+="<ul>";
            prikaz+="<li> Film za dani žanr ne postoji </li>"
            prikaz+="<li> Film za dani žanr ne postoji </li>"
            prikaz+="</ul></li>"
        }
    }
    main.innerHTML = prikaz+"</ol>";
});

async function dohvatiZanrove(){
    let odgovor = await fetch(url+"/dajZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}

/*
async function dohvatiZanrove(){
    let odgovor = await fetch(url+"/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}
*/

async function dohvatiFilmove(zanr){
    let odgovor = await fetch(url+"/dajDvaFilma?zanr="+zanr);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
}

/*
async function dohvatiFilmove(zanr){
    let odgovor = await fetch(url+"/dajDvaFilma?zanr="+zanr);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
}
*/
