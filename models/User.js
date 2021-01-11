import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments:[ //나는 Comment 테이블관련 오브젝트 타입의 필드를설정할거야~~~
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment" 
        }
    ],
    videos:[
        { //나는Video 테이블관련 오브젝트 타입의 필드를설정할거야~~~
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video" 
        }
    ]
});

UserSchema.plugin(passportLocalMongoose,{usernameField:'email'});
//passportLocalMongoose에게 내가 정의한 스키마의 어떤 field를, username으로 할것인가 알려줘야함
//우린 디비의 email필드를  passportLocalMongoose에서 username으로 사용할것임

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
const model = mongoose.model("User", UserSchema);

export default model;