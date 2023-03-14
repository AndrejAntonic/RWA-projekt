const Baza = require("./baza");
var VratiPodaci = [];

class ZanrDAO {

    constructor() {
		this.baza = new Baza();
	}

    dajSve = async function() {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM zanr";
        VratiPodaci = await this.baza.vratiSve(sql);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    daj = async function(id) {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM zanr WHERE id=?";
        let podaci = [id];
        VratiPodaci = await this.baza.vratiJedno(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    azuriraj = async function(id, zanr) {
        this.baza.spojiSeNaBazu();
        let sql = "UPDATE zanr SET zanr_ime=? WHERE id=?"
        let podaci = [zanr.novoZanr, id];
        VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    dodaj = async function(zanr) {
        this.baza.spojiSeNaBazu();
        let sql = "INSERT INTO zanr VALUES (?,?);"
        let podaci = [zanr.id, zanr.ime];
        VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    obrisi = async function(id) {
        this.baza.spojiSeNaBazu();
        let sql = "DELETE FROM zanr WHERE id=?"
        let podaci = [id]
        VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }

    obrisiSve = async function() {
        this.baza.spojiSeNaBazu();
        let sql = "DELETE FROM zanr WHERE NOT EXISTS (SELECT * FROM zanr_filma WHERE zanr_id=zanr.id)"
        VratiPodaci = await this.baza.dodajAzurirajObrisi(sql);
        this.baza.zatvoriVezu();
        return VratiPodaci;
    }
}

module.exports = ZanrDAO;