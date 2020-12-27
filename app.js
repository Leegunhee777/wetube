//const express = require("express");
import express from "express"; //최신 문법임
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import routes from "./routes";
const app = express();
//--------------------------------------------------------------

app.set("view engine","pug");
//보여줄 HTML파일들은 기본값으로 /views라는 폴더안에 저장해야함
//pug를 사용하기위한 셋팅작업

app.use(cookieParser());
//cooKie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어,
//사용자 인증 같은 곳에서 쿠키를 검사할 때 사용함
app.use(bodyParser.json());
//사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어임
//request 정보에서 form 이나 json 형태로 된 body를 검사함
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());//보안에 특화
app.use(morgan("dev")); //로깅에 특화

app.use(routes.home,globalRouter); //경로와, 라우터를 지정해주고있음
//http:localhost:4000 경로에 대한 처리를 담고있음
app.use(routes.users,userRouter);
//http:localhost:4000/user 경로에 대한 처리를 담고있음
app.use(routes.videos,videoRouter);
//http:localhost:4000/videos 경로에 대한 처리를 담고있음
                    
export default app;