import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database'


class LoginController {
    public async login(req: Request, res: Response) {
        await db.query(`SELECT * FROM Usuarios WHERE usuario = ?;`, req.body.usuario, function (err: any, result: string | any[], fields: any) {
            if (err) throw err
            if (result.length > 0) {
                bcrypt.compare(req.body.contra, result[0].contra, function (err, response) {
                    res.json(response)
                });
            }
            else {
                res.json(false)
            }
        });
    }

    public async setSessionKey(req: Request, res: Response) {
        const resultUsr = await db.query(`SELECT * FROM Usuarios WHERE usuario = ?`, req.body.usuarioID)
        if (resultUsr.length > 0) {
            req.body.usuarioID = resultUsr[0].usuarioID
        }
        await db.query(`INSERT INTO Sesiones set ?`, req.body, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.json(result)
        });
    }

    public async deleteSessionKey(req: Request, res: Response) {
        await db.query(`DELETE FROM Sesiones WHERE sesiones.key = ?`, req.body.key, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.json(result)
        });
    }

    public async checkKey(req: Request, res: Response) {
        await db.query(`SELECT * FROM sesiones WHERE sesiones.key = ?`, [req.body.key], function (err: any, result: any, fields: any) {
            if (err) throw err
            if (result.length > 0) {
                res.json(true)
            }
            else {
                res.json(false)
            }
        });
    }
}

const loginController = new LoginController()
export default loginController