import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";

import dotenv from 'dotenv'; //.env 파일안에있는 환경변수에 접근하기 위함임
import { githubLoginCallback } from "./controller/userController";
import routes from "./routes";
//github사용자인증을 마치고 왔을때 실행되는 함수임

dotenv.config();

passport.use(User.createStrategy());
//passport-local-mongoose가 제공하는 strategy를 사용하려한다.
//createStrategy()는 이미 구성된 passport-local의 LocalStratogy!!!를 생성합니다
//기본적으로 username과 password를 쓰는 strategy이다!!! <models/User.js>참고


passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:4000/auth/github/callback'
    }, githubLoginCallback));

/*

참고--
<passport.js>
passport.use(User.createStrategy());

//passport-local-mongoose가 제공하는 strategy를 사용하려한다.
//createStrategy()는 이미 구성된 passport-local의 LocalStratogy를 생성합니다
//username과 password를 쓰는 strategy이다

//헌데 우리는 plugin을 통해 우리 디비의 email을  username으로 사용하도록 설정하였음
<models/User.js>
//-> UserSchema.plugin(passportLocalMongoose,{usernameField:"email"});

//고로 결과적으로 우리의 passport 전략은 username(우리의 DB의 email)과 password를 쓰는 전략으로 설정되있음

*/

passport.serializeUser(function (user, done) {
    done(null, user);
    });
//passport.serializeUser(User.serializeUser()); //이방식도 가능하긴한데 오류나서 다른방식으로 한것임
//passport-local-mongoose가 제공하는 .serializeUser()함수를 사용한것임, 이부분 (User.serializeUser())
//passport야 쿠키에는 오직 user.id만 담아서 보내도록하여라~~라고 정의해주는부분임
//주의!!!
//serializeUser함수의 done(null, user);부분을 
//user로 하면 로그인유저의 전체 user정보가 request마다 넘어오고
//user.id로 적으면 로그인유저의id정보만 request마다 넘어온다. 

passport.deserializeUser(function (user, done) {
    done(null, user);
    });
//passport.deserializeUser(User.deserializeUser());//이방식도 가능하긴한데 오류나서 다른방식으로 한것임
//passport-local-mongoose가 제공하는 .deserializeUser()함수를 사용한것임, 이부분 (User.deserializeUser())

//보통 일반적으로 쿠키에 user.id를 담고 그 user.id를 토대로 사용자를 찾는다!!!
//이게 일반적인 passport의 쓰임
//이것으로 passport가 사용자 인증을 처리할수 있도록 설정이 완려되었음


//----------------------------------------------------------------------------