import express from "express";
import routes from "../routes";
import {home, search} from "../controller/videoController";
import { postJoin,getJoin, getLogin, post, postLogin, logout} from "../controller/userController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
//home경로에대한, 접속이 이루어지면 home controller함수발동


globalRouter.get(routes.join, getJoin)
globalRouter.post(routes.join, postJoin)


globalRouter.get(routes.login, getLogin)
globalRouter.post(routes.login, postLogin)

globalRouter.get(routes.logout, logout)
globalRouter.get(routes.search, search )
 
export default globalRouter;