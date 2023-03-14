PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `zanr` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `zanr_ime` VARCHAR(45) NOT NULL);

CREATE TABLE IF NOT EXISTS `uloga` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `opis` TEXT NULL);

CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `korime` VARCHAR(45) NOT NULL,
  `lozinka` TEXT NOT NULL,
  `ime` VARCHAR(20) NOT NULL,
  `prezime` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `aktivan` TINYINT(1) NULL DEFAULT '0',
  `aktivacijskiKod` INTEGER NULL,
  `TOTPkljuc` TEXT NULL,
  `aktiviran` TINYINT(1) NULL DEFAULT '0',
  `blokiran` TINYINT(1) NULL DEFAULT '0',
  `uloga_id` INTEGER NOT NULL,
  FOREIGN KEY(`uloga_id`) REFERENCES `uloga`(`id`));

CREATE TABLE IF NOT EXISTS `film` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `tmdb_id` INTEGER NULL,
  `naziv` TEXT NULL,
  `datum_unosa` DATE NULL,
  `trajanje` INTEGER NULL,
  `status` VARCHAR(45) NULL,
  `budzet` INTEGER NULL,
  `jezik` VARCHAR(45) NULL,
  `originalni_naziv` TEXT NULL,
  `opis` TEXT NULL,
  `ocjena` DOUBLE NULL,
  `broj_glasova` INTEGER NULL,
  `prihodi` INTEGER NULL,
  `godina_izlaska` INTEGER NULL,
  `korisnik_id` INTEGER NOT NULL,
  FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik`(`id`));

  update korisnik set aktivan=0 where aktivan=1
  select * from korisnik

CREATE TABLE IF NOT EXISTS `watchlist` (
  `korisnik_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY (`korisnik_id`,`film_id`)
  FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik`(`id`),
  FOREIGN KEY (`film_id`) REFERENCES `film`(`id`));

CREATE TABLE IF NOT EXISTS `zanr_filma` (
  `zanr_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY (`zanr_id`,`film_id`),
  FOREIGN KEY (`zanr_id`) REFERENCES `zanr`(`id`),
  FOREIGN KEY (`film_id`) REFERENCES `film`(`id`));

INSERT INTO `zanr` (`id`, `zanr_ime`) VALUES
(12, 'Adventure'),
(14, 'Fantasy'),
(16, 'Animation'),
(18, 'Drama'),
(27, 'Horror'),
(28, 'Action'),
(35, 'Comedy'),
(36, 'History'),
(37, 'Western'),
(53, 'Thriller'),
(80, 'Crime'),
(99, 'Documentary'),
(878, 'Science Fiction'),
(9648, 'Mystery'),
(10402, 'Music'),
(10749, 'Romance'),
(10751, 'Family'),
(10752, 'War'),
(10770, 'TV Movie');

INSERT INTO `zanr` (`id`, `zanr_ime`) VALUES
(12, 'Adventure'),
(14, 'Fantasy'),
(16, 'Animation'),
(27, 'Horror'),
(36, 'History'),
(53, 'Thriller'),
(80, 'Crime'),
(99, 'Documentary'),
(878, 'Science Fiction'),
(9648, 'Mystery'),
(10402, 'Music'),
(10749, 'Romance'),
(10751, 'Family'),
(10752, 'War'),
(10770, 'TV Movie');

INSERT INTO `uloga` (`id`, `naziv`, `opis`) VALUES
(1, 'admin', 'Administrator stranice.'),
(2, 'registrirani korisnik', 'Registrirani korisnik stranice.');

INSERT INTO `korisnik` (`id`, `korime`, `lozinka`, `ime`, `prezime`, `email`, `aktivan`, `aktivacijskiKod`, `TOTPkljuc`, `aktiviran`, `blokiran`, `uloga_id`) VALUES
(1, 'obican', '09a253656755a14360f0e82b858dc2526b765ad87f7279115f7fd9a232d4e8e9', 'asd', 'obican', 'giwiji5506@pamaweb.com', 1, 61357, 'ARERKBRFBACAIAADAZBROBRAAIEAAAAIBACAEAZEARCRTBICARCRGCIJAAAATAAFAZDAEBZAAADATAACAAAACBRBAADAEAZAAACREAA', 1, 0, 2),
(2, 'administrator', '2ef80fac3d49e06f1a2d2907c8173cf288bb9ad0241bdbc1ad25cc6af8a07f17', 'administrator', 'administrator', 'giwiji5506@pamaweb.com', 0, 67492, 'AAEAABRABADAACAFBAAAAAAABEDRIAAAAACRCAIDBAAAIBZDAECRAAAEBACAIBZAAABRGAICAMBRAAAJAAAAABAAAAERGAICAAAAAAA', 1, 0, 1),
(5, 'iolic', 'b1b07c3976b2faa4e938d30a878f4028aa2472ac8bd257c2dad21f7a8e1daef9', 'ivic', 'Olić', 'tefayig186@invodua.com', 0, 32562, 'ARAAAAACAACRRAAFAABAAAAAAAAAGCADAADAIAAAAADACCIDAIEAOBAJAZAAEBAAAMEACAAJAEEAMAAAAICAOAZBBEBAOCAAAAAATCA', 1, 0, 2),
(6, 'korisnik', 'f9ba78feaaf296cacebc2e36ac8ca57ff9406131d64c03cf12245ac0c39de5df', 'Korisnik', 'korisnik', 'hegap23178@turuma.com', 0, 44730, 'BEAAABIAAACRRBIBAAAAICAIBACAABIHAICAEAABAREAAAAAAACREBZGAAAAEAZFAAAATBIFARARABZFAIAAACAAAIDRIAIAAAEREAR', 1, 0, 2);

INSERT INTO `film` (`id`, `tmdb_id`, `naziv`, `datum_unosa`, `trajanje`, `status`, `budzet`, `jezik`, `originalni_naziv`, `opis`, `ocjena`, `broj_glasova`, `prihodi`, `godina_izlaska`, `korisnik_id`) VALUES
(1, NULL, 'Atonement', '2022-11-18', 123, 'Izašao', 30000000, 'Engleski', 'Atonement', 'Trinaestogodišnja spisateljica Briony Tallis nepovratno mijenja tijek nekoliko života kad optuži ljubavnika svoje starije sestre za zločin koji on nije počinio.', 7.8, 279000, 129000000, 2007, 1),
(2, NULL, 'A Streetcar Named Desire', '2022-10-10', 122, 'Izašao', 1800000, 'Engleski', 'A Streetcar Named Desire', 'Uznemirena Blanche DuBois seli se svojoj sestri u New Orleans i muči je brutalni šogor dok se njezina stvarnost raspada oko nje.', 7.9, 109000, 8000000, 1951, 2),
(3, NULL, 'asdf', '2022-09-23', 134, 'Izašao', 22000000, 'Engleski', '12 Years a Slave', 'U Sjedinjenim Državama prije rata, Solomon Northup, slobodni crnac iz sjeverne države New York, otet je i prodan u ropstvo.', 8.1, 699000, 187000000, 2013, 1),
(4, NULL, 'Rambo', '2022-11-07', 92, 'Izašao', 55000000, 'Engleski', 'Rambo', 'U Tajlandu, John Rambo pridružuje se skupini plaćenika kako bi krenuli u ratom razorenu Burmu i spasili skupinu kršćanskih humanitarnih radnika koje je otela nemilosrdna lokalna pješačka jedinica.', 7, 233000, 113200000, 2008, 2),
(5, NULL, 'Die Hard', '2022-11-08', 152, 'Izašao', 28000000, 'Engleski', 'Die Hard', 'Policajac njujorške policije pokušava spasiti svoju ženu i nekoliko drugih koje su njemački teroristi uzeli za taoce tijekom božićne zabave u Nakatomi Plazi u Los Angelesu.', 8.2, 873000, 139800000, 1988, 1),
(6, NULL, 'Crank', '2022-10-21', 78, 'Izašao', 12000000, 'Engleski', 'Crank', 'Profesionalni ubojica Chev Chelios saznaje da mu je suparnik ubrizgao otrov koji će ga ubiti ako mu padne broj otkucaja srca.', 6.9, 250000, 42900000, 2006, 2),
(7, NULL, 'Monty Python and the Holy Grail', '2022-09-16', 91, 'Izašao', 400000, 'Engleski', 'Monty Python and the Holy Grail', 'Kralj Artur i njegovi vitezovi Okruglog stola kreću u nadrealnu, niskobudžetnu potragu za Svetim gralom, nailazeći na mnoge, vrlo blesave prepreke.', 8.2, 541000, 5000000, 1975, 1),
(8, NULL, 'The Naked Gun: From the Files of Police Squad!', '2022-11-09', 85, 'Izašao', 12000000, 'Engleski', 'The Naked Gun: From the Files of Police Squad!', 'Nesposobni policijski detektiv Frank Drebin mora spriječiti pokušaj atentata na kraljicu Elizabetu II.', 7.6, 170000, 152000000, 1988, 2),
(9, NULL, 'Dumb and Dumber', '2022-08-11', 107, 'Izašao', 17000000, 'Engleski', 'Dumb and Dumber', 'Nakon što žena ostavi aktovku na terminalu zračne luke, glupi vozač limuzine i njegov gluplji prijatelj kreću na urnebesno putovanje u Aspen kako bi je vratili.', 7.3, 386000, 247000000, 1994, 1),
(10, NULL, 'The Good, the Bad and the Ugly', '2022-09-24', 178, 'Izašao', 1200000, 'Engleski', 'Il buono, il brutto, il cattivo', 'Prijevara s lovom na glave udružuje dvojicu muškaraca u neugodan savez protiv trećeg u utrci da pronađu bogatstvo u zlatu zakopano na udaljenom groblju.', 8.8, 758000, 38900000, 1966, 2);

INSERT INTO `zanr_filma` (`zanr_id`, `film_id`) VALUES
(18, 1),
(18, 2),
(18, 3),
(28, 4),
(28, 5),
(28, 6),
(35, 7),
(35, 8),
(35, 9),
(37, 10);