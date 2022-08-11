"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class UserController {
    setUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //ESTE MÉTODO RECIBE UN OBJETO CON CUATRO PROPIEDADES, UNA LLAMADA user, OTRA LLAMADA pass, UNA empleados_idempleado
            //Y tipo_usuario
            //CON ESTOS DATOS SE INSERTARÁ UN NUEVO USUARIO EN LA BASE DE DATOS CON UNA CONTRASEÑA ENCRIPTADA
            const resultUsr = yield database_1.default.query(`SELECT * FROM Usuarios WHERE usuario = ?`, req.body.usuario);
            if (resultUsr.length > 0) {
                res.json(false);
            }
            else {
                const saltRounds = 13;
                bcrypt_1.default.hash(req.body.contra, saltRounds, function (err, hash) {
                    return __awaiter(this, void 0, void 0, function* () {
                        req.body.contra = hash;
                        yield database_1.default.query(`INSERT INTO Usuarios set ?`, req.body, function (err, result, fields) {
                            if (err)
                                throw err;
                            res.json(result);
                        });
                    });
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //ESTE MÉTODO RECIBE UN OBJETO CON DOS PROPIEDADES, UNA LLAMADA user Y OTRA LLAMADA pass
            //LA PROPIEDAD pass ES LA NUEVA CONTRASEÑA DEL USUARIO Y LA PROPIERDAD user ES EL USUARIO AL QUE SE
            //LE VA A CAMBIAR LA CONTRASEÑA
            if (req.body.pass) {
                const saltRounds = 13;
                bcrypt_1.default.hash(req.body.pass, saltRounds, function (err, hash) {
                    return __awaiter(this, void 0, void 0, function* () {
                        req.body.pass = hash;
                        yield database_1.default.query(`UPDATE Usuarios SET contra = ?, usuario = ?, descrip = ? WHERE usuarioID = ?`, [req.body.pass, req.body.usuario, req.body.descrip, req.body.usuarioID], function (err, result, fields) {
                            if (err)
                                throw err;
                            res.json(result);
                        });
                    });
                });
            }
            else {
                yield database_1.default.query(`UPDATE Usuarios SET usuario = ?, descrip = ? WHERE usuario = ?`, [req.body.usuario, req.body.descrip, req.body.usuarioID], function (err, result, fields) {
                    if (err)
                        throw err;
                    res.json(result);
                });
            }
        });
    }
    getUserInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`SELECT usuarios.usuarioID, usuario,contra, descrip
        FROM usuarios
        INNER JOIN sesiones on sesiones.usuarioID = usuarios.usuarioID
        WHERE sesiones.key = ?;`, req.body.key, function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    res.json(result[0]);
                }
                else {
                    res.json(false);
                }
            });
        });
    }
}
const userController = new UserController();
exports.default = userController;
