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

    public async setUser(req: Request, res: Response) {

        //ESTE MÉTODO RECIBE UN OBJETO CON CUATRO PROPIEDADES, UNA LLAMADA user, OTRA LLAMADA pass, UNA empleados_idempleado
        //Y tipo_usuario
        //CON ESTOS DATOS SE INSERTARÁ UN NUEVO USUARIO EN LA BASE DE DATOS CON UNA CONTRASEÑA ENCRIPTADA

        const resultUsr = await db.query(`SELECT * FROM Usuarios WHERE usuario = ?`, req.body.usuario)
        if (resultUsr.length > 0) {
            res.json(false)
        }
        else {
            const saltRounds = 13;
            bcrypt.hash(req.body.contra, saltRounds, async function (err, hash) {
                req.body.contra = hash
                await db.query(`INSERT INTO Usuarios set ?`, req.body, function (err: any, result: any, fields: any) {
                    if (err) throw err
                    res.json(result)
                });
            });
        }
    }

    public async updateUser(req: Request, res: Response) {

        //ESTE MÉTODO RECIBE UN OBJETO CON DOS PROPIEDADES, UNA LLAMADA user Y OTRA LLAMADA pass
        //LA PROPIEDAD pass ES LA NUEVA CONTRASEÑA DEL USUARIO Y LA PROPIERDAD user ES EL USUARIO AL QUE SE
        //LE VA A CAMBIAR LA CONTRASEÑA

        const saltRounds = 13;
        bcrypt.hash(req.body.contra, saltRounds, async function (err, hash) {
            req.body.contra = hash
            await db.query(`UPDATE Usuarios SET contra = ? WHERE usuario = ?`, [req.body.contra, req.body.usuario], function (err: any, result: any, fields: any) {
                if (err) throw err
                res.json(result)
            });
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
}

const loginController = new LoginController()
export default loginController