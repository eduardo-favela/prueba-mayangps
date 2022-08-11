import { Router } from 'express'
import loginController  from '../controllers/loginController'

class LoginRoutes {
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.post('/iniciarsesion', loginController.login)
        this.router.post('/setSessionKey', loginController.setSessionKey)
        this.router.post('/deleteSessionKey', loginController.deleteSessionKey)
        this.router.post('/checkKey', loginController.checkKey)
    }
}

const loginRoutes = new LoginRoutes()
export default loginRoutes.router