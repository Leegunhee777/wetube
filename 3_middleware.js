//const express = require("express");
import express from "express"; //최신 문법임
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();
//--------------------------------------------------------------

const PORT = 4000;

const handleListening = () =>{
    console.log(`Listening on: http://localhost:${PORT}`);
}

const handleHome = (req,res) =>{
   // console.log(req);
    res.send("Hello from home");
}

const handleProfile = (req, res) =>{
    res.send("You are on my profile");
    //이 서버가 웹사이트 서버처럼 작동하려면res.send에 완전한 html,css 파일을 send해줘야함
}

const betweenHome = (req, res, next) => {
    console.log("Im between");
    //res.send("not happening"); //next()대신 미들웨어에서 res.send()를하면 라우터처리함수까지 가기전에 진행이 멈춤 
    next();//다음미들웨어 or 끝단으로 보내는것임
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());//보안에 특화
app.use(betweenHome);
app.use(morgan("dev")); //로깅에특화


//app.use를 사용하면 모든 경로에대해 betweenHome미들웨어를 실행시킬수있다.(접속하면 안되는 IP를 ,라우터처리전에 거르는 용도로도 쓸수있음)
//라우터등록이 안되있는 경로에 대해서도 반응함, localhost:4000/lkweunlaksjdfnlaiskejf 라고 적어도 반응한다는 말임

//app.use()의 위치도 중요 , 만약 app.use()함수 위에 app.get("/profile", handleProfile);를 정의한다면 
//http://localhost:4000/profile에 접속해도 app.use(betweenHome)이 발동되지않는다.(코드는 위에서 아래로 실행되기때문)

app.get("/",betweenHome,handleHome);
//client의 GET 요청에 대한 처리임 http://localhost:4000으로 접근했을때 처음보여지는 "/"기본경로에 대한처리임
//betweenHome은 미들웨어로서 사용되고있음, Client측의 GET요청과 res.send 사이에서 일을 수행하고있음


app.get("/profile", handleProfile);
//http://localhost:4000/profile에 접근했을떄 처리되는것임


app.listen(PORT,handleListening);