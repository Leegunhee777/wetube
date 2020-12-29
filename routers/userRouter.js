import express from "express";
import routes from "../routes";
import {users, userDetail,editProfile,changePassword}
from "../controller/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile,editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;


/*
//이것들이 다 router임
userRouter.get("/",(req, res)=> res.send('user index'));
//http:localhost:4000/user 로 접근했을때의 처리
userRouter.get("/edit",(req, res) => res.send('user edit'));
//http:localhost:4000/user/edit 로 접근했을때의 처리
userRouter.get("/password", (req, res) => res.send("user password"));
//http:localhost:4000/password 로 접근했을 때의 처리
*/