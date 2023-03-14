-- MySQL Script generated by MySQL Workbench
-- Thu Nov 10 09:42:04 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema RWA2022aantonic20
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema RWA2022aantonic20
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `RWA2022aantonic20` DEFAULT CHARACTER SET utf8 ;
USE `RWA2022aantonic20` ;

-- -----------------------------------------------------
-- Table `RWA2022aantonic20`.`zanr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RWA2022aantonic20`.`zanr` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `zanr_ime` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `RWA2022aantonic20`.`uloga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RWA2022aantonic20`.`uloga` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `opis` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `RWA2022aantonic20`.`korisnik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RWA2022aantonic20`.`korisnik` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korime` VARCHAR(45) NOT NULL,
  `lozinka` TEXT NOT NULL,
  `ime` VARCHAR(20) NOT NULL,
  `prezime` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `aktivan` TINYINT(1) NULL DEFAULT '0',
  `aktivacijskiKod` INT NULL,
  `TOTPkljuc` TEXT NULL,
  `aktiviran` TINYINT(1) NULL DEFAULT '0',
  `blokiran` TINYINT(1) NULL DEFAULT '0',
  `uloga_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_korisnik_uloga_idx` (`uloga_id` ASC) VISIBLE,
  CONSTRAINT `fk_korisnik_uloga`
    FOREIGN KEY (`uloga_id`)
    REFERENCES `RWA2022aantonic20`.`uloga` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `RWA2022aantonic20`.`film`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RWA2022aantonic20`.`film` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tmdb_id` INT NULL,
  `naziv` TEXT NULL,
  `datum_unosa` DATE NULL,
  `trajanje` INT NULL,
  `status` VARCHAR(45) NULL,
  `budzet` INT NULL,
  `jezik` VARCHAR(45) NULL,
  `originalni_naziv` TEXT NULL,
  `opis` TEXT NULL,
  `ocjena` DOUBLE NULL,
  `broj_glasova` INT NULL,
  `prihodi` INT NULL,
  `godina_izlaska` INT NULL,
  `korisnik_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_film_korisnik1_idx` (`korisnik_id` ASC) VISIBLE,
  CONSTRAINT `fk_film_korisnik1`
    FOREIGN KEY (`korisnik_id`)
    REFERENCES `RWA2022aantonic20`.`korisnik` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `RWA2022aantonic20`.`watchlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RWA2022aantonic20`.`watchlist` (
  `korisnik_id` INT NOT NULL,
  `film_id` INT NOT NULL,
  PRIMARY KEY (`korisnik_id`, `film_id`),
  INDEX `fk_korisnik_has_film_film1_idx` (`film_id` ASC) VISIBLE,
  INDEX `fk_korisnik_has_film_korisnik1_idx` (`korisnik_id` ASC) VISIBLE,
  CONSTRAINT `fk_korisnik_has_film_korisnik1`
    FOREIGN KEY (`korisnik_id`)
    REFERENCES `RWA2022aantonic20`.`korisnik` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korisnik_has_film_film1`
    FOREIGN KEY (`film_id`)
    REFERENCES `RWA2022aantonic20`.`film` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `RWA2022aantonic20`.`zanr_filma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RWA2022aantonic20`.`zanr_filma` (
  `zanr_id` INT NOT NULL,
  `film_id` INT NOT NULL,
  PRIMARY KEY (`zanr_id`, `film_id`),
  INDEX `fk_zanr_has_film_film1_idx` (`film_id` ASC) VISIBLE,
  INDEX `fk_zanr_has_film_zanr1_idx` (`zanr_id` ASC) VISIBLE,
  CONSTRAINT `fk_zanr_has_film_zanr1`
    FOREIGN KEY (`zanr_id`)
    REFERENCES `RWA2022aantonic20`.`zanr` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_zanr_has_film_film1`
    FOREIGN KEY (`film_id`)
    REFERENCES `RWA2022aantonic20`.`film` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
