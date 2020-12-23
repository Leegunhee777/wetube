//const express = require("express");
import express from "express"; //최신 문법임
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {userRouter} from './router';
const app = express();
//--------------------------------------------------------------

const handleHome = (req,res) =>{
    res.send("Hello from home");
}

const handleProfile = (req, res) =>{
    res.send("You are on my profile");
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());//보안에 특화
app.use(morgan("dev")); //로깅에특화



app.get("/",handleHome);

app.get("/profile", handleProfile);

app.use("/user",userRouter);
//http:localhost:4000/user 경로에 대한 처리를 담고있음

export default app;