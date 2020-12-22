const express = require("express");
const app = express();
//--------------------------------------------------------------

const PORT = 4000;

function handleListening(){
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req,res){
    console.log(req);
    res.send("Hello from home");
}

function handleProfile(req, res){
    res.send("You are on my profile");
    //이 서버가 웹사이트 서버처럼 작동하려면res.send에 완전한 html,css 파일을 send해줘야함
}

app.get("/",handleHome);
//client의 GET 요청에 대한 처리임 http://localhost:4000으로 접근했을때 처음보여지는 "/"기본경로에 대한처리임

app.get("/profile", handleProfile);
//http://localhost:4000/profile에 접근했을떄 처리되는것임


app.listen(PORT,handleListening);