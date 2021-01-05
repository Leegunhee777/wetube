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
//serializeUser()는 어떤방식으로 서버의 세션에 쿠키를 저장할껀지를 지정한다!!!!!!!!!!!!!!!!!!!!!!



passport.deserializeUser(function (user, done) {
    User.findById(user._id, function(err, user){ done(err, user); });
    //done(null, user);  //원래는이거만있었음
    });

//deserializeUser()는 세션에 저장된 쿠키정보를, 어떤형식으로 req.user에 저장할껀지를지정해준다.!!!!!!!!!!!!!!!!!!!1
//ex)User.findById(user._id, function(err, user){ done(err, user.name); }); 이라면
//done(err,user.name) 이기때문에 req.user값은 user.name값만 찍힌다.


/*
차이1
passport.deserializeUser(function (user, done) {
    done(null, user);  //서버세션에 저장된 쿠키정보를가지고 user를 req.user에 저장하는방법
    });
차이2
passport.deserializeUser(function (user, done) {
    User.findById(user._id, function(err, user){ done(err, user); }); 
    //User테이블에 저장된 user._id정보를 기반으로 user를 뽑아내어 , 디비에서 뽑은 user정보를 req.user에 저장하는방법 
    });
*/
//passport.deserializeUser(User.deserializeUser());//이방식도 가능하긴한데 오류나서 다른방식으로 한것임
//passport-local-mongoose가 제공하는 .deserializeUser()함수를 사용한것임, 이부분 (User.deserializeUser())

//보통 일반적으로 쿠키에 user.id를 담고 그 user.id를 토대로 사용자를 찾는다!!!
//이게 일반적인 passport의 쓰임
//이것으로 passport가 사용자 인증을 처리할수 있도록 설정이 완려되었음


//----------------------------------------------------------------------------