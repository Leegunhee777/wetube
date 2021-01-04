import express from "express";
import routes from "../routes";
import {home, search} from "../controller/videoController";
import { postJoin,getJoin, getLogin, postLogin, logout,githubLogin, postGithubLogIn,getMe } from "../controller/userController";
import { onlyPublic,onlyPrivate } from "../middlewares";
import passport from "passport";
const globalRouter = express.Router();

//만약 로그인된 상태라면, Join(가입)과  Login(로그인화면)경로 접근금지
//onlyPublic미들웨어를 사용

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, postJoin, postLogin);


globalRouter.get(routes.login,onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);


globalRouter.get(routes.home, home);
//home경로에대한, 접속이 이루어지면 home controller함수발동
globalRouter.get(routes.logout, onlyPrivate,  logout)
globalRouter.get(routes.search, search )


globalRouter.get(routes.gitHub, githubLogin);
//localhost:4000/auth/github 경로가 되면 githubLogin함수실행하여 github인증 유도,
//인증이 완료된후엔
//우리가 지정했던 callbackURL:"http://localhost:4000/auth/github/callback" 이 경로로
//돌아오게된다.
//저 경로로 돌아왔을 경우의 라우터처리도 해줘야함
globalRouter.get(routes.githubCallback,
    passport.authenticate("github",{failureRedirect:"/login"}),
    postGithubLogIn
    );
//callbackURL로 돌아왔을때 authentichate()함수로 로그인처리해주고
//postGithubLogIn 함수발동시켜서 홈으로보낸다


globalRouter.get(routes.me, getMe);
//users/me경로에대한처리임

export default globalRouter;
