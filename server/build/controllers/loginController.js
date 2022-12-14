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
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`SELECT * FROM Usuarios WHERE usuario = ?;`, req.body.usuario, function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    bcrypt_1.default.compare(req.body.contra, result[0].contra, function (err, response) {
                        res.json(response);
                    });
                }
                else {
                    res.json(false);
                }
            });
        });
    }
    setSessionKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultUsr = yield database_1.default.query(`SELECT * FROM Usuarios WHERE usuario = ?`, req.body.usuarioID);
            if (resultUsr.length > 0) {
                req.body.usuarioID = resultUsr[0].usuarioID;
                database_1.default.query(`INSERT INTO Sesiones set ?`, req.body, function (err, result, fields) {
                    if (err)
                        throw err;
                    res.json(result);
                });
            }
            else {
                console.log(resultUsr);
                res.json(false);
            }
        });
    }
    deleteSessionKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`DELETE FROM Sesiones WHERE sesiones.key = ?`, req.body.key, function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    checkKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`SELECT * FROM sesiones WHERE sesiones.key = ?`, [req.body.key], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
