import { Router } from 'express'
import userController  from '../controllers/userController'

class UserRoutes {
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.post('/setUser', userController.setUser)
        this.router.post('/updateUser', userController.updateUser)
        this.router.post('/getUserInfo', userController.getUserInfo)
    }
}

const userRoutes = new UserRoutes()
export default userRoutes.router