//const express = require("express");
import express from "express"; //최신 문법임
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from "passport";
import session from "express-session";
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import apiRouter from './routers/apiRouter';
import routes from "./routes";
import MongoStore from "connect-mongo";
import {localsMiddleware} from "./middlewares";

import dotenv from "dotenv";
dotenv.config();

import "./passport";
const app = express();

const CokieStore = MongoStore(session);

//--------------------------------------------------------------

app.use(helmet({
    contentSecurityPolicy:false,
}));//보안에 특화

app.set("view engine","pug");
//보여줄 HTML파일들은 기본값으로 /views라는 폴더안에 저장해야함
//pug를 사용하기위한 셋팅작업

app.use("/uploads", express.static("uploads"));
//express.static(): -주어진 폴더에서 file을 전달하는 middleware임-  을 이용함
//즉,이제 '/uploads'경로면 'uploads'라는 폴더안으로 들어가진다는말임
//이처리를 해줘야 uploads폴더안에있는 동영상파일들이 정상작동함

//한마디로 mongoDB에서 
//video데이터값중 fileUrl값을보면
//uploads\videos\070e9323a372a4d7007edcf65c99b875 이라는 스트링값으로 존재한다.
//videoContorller에서 Video디비값 filesUrl을 사용하여 동영상렌더에 사용하는데,
//디비값인 uploads\videos\070e9323a372a4d7007edcf65c99b875 은 아직은 단순한 String일뿐이다.
//아직은 단순한 String값이기 때문에 스트링값으로 동영상을 재생시킬수없다. 
//우리가 가지고있는 실제 폴더의 uploads/videos안에있는 실제 동영상파일을 이용하여야 정상재생시킬수있다.
//고로
//이 스트링경로값을 , express.static("uploads")를 통해 실제 uploads폴더로 매칭하여,
//스트링경로값을 가지고 , uploads폴더내의 실제존재하는 동영상파일을 찾는식으로 진행되는것이다.

app.use("/static",express.static("static"));
//   /static을 만나면 내 프로젝트 폴더의 static폴더로 매칭해줌 (변환된 static폴더내의 .js와,.css를 서버에 인식시키기위한 행위)

app.use(cookieParser());
//cooKie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어,
//사용자 인증 같은 곳에서 쿠키를 검사할 때 사용함
app.use(bodyParser.json());
//사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어임
//request 정보에서 form 이나 json 형태로 된 body를 검사함
//bodyParser가 있어야 client의 request.body를 볼수있음
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan("dev")); //로깅에 특화

app.use( //이설정이 되어있어야!!!로그인시에 Appliction의 Cookies에서 값을 볼수있음!!!!!!!!!!!!!!!!!connect.sid라는 이름의 쿠키를 갖게된다.
    session({ //쿠키,도메인, 유효기간등..옵션설정가능
        secret:process.env.COOKIE_SECRET, //secret은 아무 문자열로서, 쿠키에 들어있는 session ID를 암호화하기위한것임
        resave:true,
        saveUninitialized: false,
        store: new CokieStore({mongooseConnection: mongoose.connection})//이 쿠키저장소에 저장하게 되는것임, 이 저장소를 mongo와 연결시켜줘야함
    })
)
app.use(passport.initialize());
//passport초기화도하고
//passport가 제 스스로 쿠키를 들여다봐서, 그 쿠키정보에 해당하는 사용자를 찾아줄거임
app.use(passport.session());
//session은 쿠키를해독함,해독된 후엔 passport로 넘어가게됨 
//passport로 넘겨지면, deserializeUser라는 함수가 실행됨
//deserialize로 사용자를 식별하게되면 passport는 방금 찾은 그 사용자를
//middleware나 routes의 request object에 할당하게 된다.
//그래서 이제 어느 route에서든 로그인한 사용자가 누구인지 체크할수있게됨

app.use(localsMiddleware);
//밑의 라우터들에 적용하고싶으면 그것들 위에 선언해야함+
//그리고 passport는 자기가 찾은 그 사용자를 request의 object, 즉
//req.user로 만들어 미들웨어에적용함<middlewares.js>참고

//app.use(function(req, res, next) {
 //   res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
  //  return next();
   // }); //비디오 안열리는 상황 처리를 위한것

app.use(routes.home,globalRouter); //경로와, 라우터를 지정해주고있음
//http:localhost:4000 경로에 대한 처리는 globalRouter에서 처리할거에요~~를 담고있음
app.use(routes.users,userRouter);
//http:localhost:4000/user 경로에 대한 처리는 userRouter에서 처리할거에요~~를 담고있음
app.use(routes.videos,videoRouter);
//http:localhost:4000/videos 경로에 대한 처리는 videoRouter에서 처리할거에요~~를 담고있음

app.use(routes.api, apiRouter);
//api처리를 위한 라우터임 http:localhost:4000/api 경로에 대한 처리는
//apiRouter에서 처리할거에요~~를 담고있음
export default app;