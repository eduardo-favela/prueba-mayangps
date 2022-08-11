-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pruebamayan
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pruebamayan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pruebamayan` DEFAULT CHARACTER SET utf8mb4 ;
USE `pruebamayan` ;

-- -----------------------------------------------------
-- Table `pruebamayan`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pruebamayan`.`usuarios` (
  `usuarioID` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(25) NULL DEFAULT NULL,
  `contra` VARCHAR(60) NULL DEFAULT NULL,
  `descrip` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`usuarioID`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `pruebamayan`.`sesiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pruebamayan`.`sesiones` (
  `sesionID` INT(11) NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(25) NOT NULL,
  `usuarioID` INT(11) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`sesionID`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC) ,
  INDEX `fk_Sesiones_usuario1_idx` (`usuarioID` ASC) ,
  CONSTRAINT `fk_Sesiones_usuario1`
    FOREIGN KEY (`usuarioID`)
    REFERENCES `pruebamayan`.`usuarios` (`usuarioID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;