"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/setUser', userController_1.default.setUser);
        this.router.post('/updateUser', userController_1.default.updateUser);
        this.router.post('/deleteUser', userController_1.default.deleteUser);
        this.router.post('/getUserInfo', userController_1.default.getUserInfo);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
