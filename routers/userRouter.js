import express from "express";
import routes from "../routes";
import {users, userDetail,editProfile,changePassword}
from "../controller/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile,editProfile);

userRouter.get(routes.changePassword, changePassword);
//http://localhost:4000/users/change-password 로 접근해야함
//routes.changePassword가 가지고있는 값은 "/change-password" 이라
//localhost:4000/change-password 로 접근해야하는거아니야? 라고 생각할수있지만 ㄴㄴ
//express.Router();에 의해서 userRouter는 /users에 대한 경로를 담당하고있으므로,
//앞에 /users가 생략된거라고 생각해도 무방함 
userRouter.get(routes.userDetail(), userDetail);


export default userRouter;


/*
//이것들이 다 router임
userRouter.get("/",(req, res)=> res.send('user index'));
//http:localhost:4000/user 로 접근했을때의 처리
userRouter.get("/edit",(req, res) => res.send('user edit'));
//http:localhost:4000/user/edit 로 접근했을때의 처리
userRouter.get("/password", (req, res) => res.send("user password"));
//http:localhost:4000/user/password 로 접근했을 때의 처리
*/