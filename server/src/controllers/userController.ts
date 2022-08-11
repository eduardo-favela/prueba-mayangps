import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database'


class UserController {
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
        if (req.body.pass) {
            const saltRounds = 13;
            bcrypt.hash(req.body.pass, saltRounds, async function (err, hash) {
                req.body.pass = hash
                await db.query(`UPDATE Usuarios SET contra = ?, usuario = ?, descrip = ? WHERE usuarioID = ?`,
                    [req.body.pass, req.body.usuario, req.body.descrip, req.body.usuarioID], function (err: any, result: any, fields: any) {
                        if (err) throw err
                        res.json(result)
                    });
            });
        }
        else {
            await db.query(`UPDATE Usuarios SET usuario = ?, descrip = ? WHERE usuarioID = ?`,
                [req.body.usuario, req.body.descrip, req.body.usuarioID], function (err: any, result: any, fields: any) {
                    if (err) throw err
                    res.json(result)
                });
        }
    }

    public async deleteUser(req: Request, res: Response) {

        await db.query(`DELETE FROM Sesiones WHERE usuarioID = ?`, req.body.usuarioID, async function (err: any, result: any, fields: any) {
            if (err) throw err
            await db.query(`DELETE FROM Usuarios WHERE usuarioID = ?`,
            [req.body.usuarioID], function (err: any, result: any, fields: any) {
                if (err) throw err
                res.json(true)
            });
        });
    }

    public async getUserInfo(req: Request, res: Response) {
        await db.query(`SELECT usuarios.usuarioID, usuario,contra, descrip
        FROM usuarios
        INNER JOIN sesiones on sesiones.usuarioID = usuarios.usuarioID
        WHERE sesiones.key = ?;`, req.body.key, function (err: any, result: any, fields: any) {
            if (err) throw err
            if (result.length > 0) {
                res.json(result[0])
            }
            else {
                res.json(false)
            }
        })
    }
}

const userController = new UserController()
export default userController