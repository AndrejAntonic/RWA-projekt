const Baza = require("./baza.js");
var VratiPodaci = [];

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;"
		VratiPodaci = await this.baza.vratiSve(sql);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = [korime]
		VratiPodaci = await this.baza.vratiJedno(sql, podaci);
		this.baza.zatvoriVezu();
		if(VratiPodaci != undefined)
        {
            return VratiPodaci;
        }
        else
        {
            return null;
        }
	}

	dodaj = async function (korisnik) {
		this.baza.spojiSeNaBazu();
		let sql = `INSERT INTO korisnik (ime,prezime,lozinka,email,korime,aktivacijskiKod,TOTPkljuc,uloga_id) VALUES (?,?,?,?,?,?,?,?)`;
        var podaci = [korisnik.ime,korisnik.prezime,
                      korisnik.lozinka,korisnik.email,korisnik.korime,
					  korisnik.aktivacijskiKod,korisnik.TOTPkljuc,2];
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	obrisi = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "DELETE FROM korisnik WHERE korime=?";
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	azuriraj = async function (korime, korisnik) {
		this.baza.spojiSeNaBazu();
		let sql = "UPDATE korisnik SET"
		let podaci = []
		let bezApostrofa = ""
		let prethodno = false
		if(korisnik.ime != null) {
			sql += " ime=?"
			podaci.push(korisnik.ime)
			prethodno = true
		}
		if(korisnik.prezime != null) {
			if(prethodno)
				sql += ","
			sql += " prezime=?"
			podaci.push(korisnik.prezime)
			prethodno = true;
		}
		if(korisnik.lozinka != null) {
			let polje = korisnik.lozinka.split('"')
			bezApostrofa = polje[1]
			if(prethodno)
				sql += ","
			sql += " lozinka=?"
			podaci.push(bezApostrofa)
		}
		sql += " WHERE korime=?"
		podaci.push(korime)
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	azurirajAdmin = async function(korime, korisnik) {
		this.baza.spojiSeNaBazu();
		let sql = "UPDATE korisnik SET"
		let podaci = []
		let prethodno = false
		if(korisnik.ime != "") {
			sql += " ime=?"
			podaci.push(korisnik.ime)
			prethodno = true
		}
		if(korisnik.prezime != "") {
			if(prethodno)
				sql += ","
			sql += " prezime=?"
			podaci.push(korisnik.prezime)
			prethodno = true;
		}
		if(korisnik.totp != "") {
			if(prethodno)
				sql += ","
			sql += " TOTPkljuc=?"
			podaci.push(korisnik.totp)
			prethodno = true
		}
		if(korisnik.uloga != "") {
			if(prethodno)
				sql += ","
			sql += " uloga_id=?"
			podaci.push(korisnik.uloga)
		}
		sql += " WHERE korime=?"
		podaci.push(korime)
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	blokiraj = async function (id, blokiraj) {
		this.baza.spojiSeNaBazu();
		let sql = "UPDATE korisnik SET blokiran=? WHERE id=?"
		let podaci = [blokiraj.broj, id]
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	aktiviraj = async function (korime, kod) {
		this.baza.spojiSeNaBazu();
		let sql = "UPDATE korisnik SET aktiviran=? WHERE korime=? AND aktivacijskiKod=?";
		var podaci = [1, korime, kod];
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	aktiviran = async function (korime, lozinka) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT aktiviran FROM korisnik WHERE korime=? AND lozinka=?";
		var podaci = [korime, lozinka];
		VratiPodaci = await this.baza.vratiJedno(sql, podaci);
		VratiPodaci = JSON.stringify(podaci)
		console.log(VratiPodaci)
		const splitano = VratiPodaci.split(":")
		const splitano2 = splitano[1].split("}");
		this.baza.zatvoriVezu();
		if(splitano2[0] == "1")
		{
			return true
		}
		else
		{
			return false
		}
	}

	aktivanPromjena = async function (id, aktivan) {
		this.baza.spojiSeNaBazu();
		let sql = "UPDATE korisnik SET aktivan=? WHERE id=?"
		var podaci = [aktivan, id];
		VratiPodaci = await this.baza.dodajAzurirajObrisi(sql, podaci);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	dohvatiAktivan = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE aktivan=1"
		VratiPodaci = await this.baza.vratiSve(sql);
		this.baza.zatvoriVezu();
		return VratiPodaci;
	}

	dohvatiUlogu = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT uloga_id FROM korisnik WHERE aktivan=1"
		let VratiPodaci = await this.baza.vratiSve(sql);
		this.baza.zatvoriVezu();
		console.log(VratiPodaci);
		return VratiPodaci;
	}

	kljuc = async function (korime, lozinka) {
		
	}
}

module.exports = KorisnikDAO;