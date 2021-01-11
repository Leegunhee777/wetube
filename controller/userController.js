import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
  };
  



export const postJoin = async(req, res, next) => {
    //console.log(req.body);
    const {name, email, password, password2} = req.body;
    if(password !== password2){
        res.status(400);//서버상태에대한 응답을 보낼수도있음
        res.render("join",{pageTitle:"Join"});
    }
    else{
        try{
        //To Do: Register User
        //To Do: Log user in
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            //passport-local-mongoose가 제공하는 .register()를 사용하려한다.
            //register라는 함수를 사용하면 디비에 user라는 테이블이름으로
            //위에서 만든객체인 {name,email}+ salt + hash (salt와 hash는 패스워드암호화시켜주는것임)들이 디비에저장까지도됨
            //사용자를 디비에 저장까지는 해놓은 상태임
            next(); //다음미들웨어 처리로 ㄱㄱ

        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }   
};


    
//로그인처리를 위한함수
export const postLogin = passport.authenticate("local",{  //기억해야됨!! 지금 우리의 passport의 인증방식은 username(우리 예제에서는 email)과 password를
                                     //찾아보도록 하고있다.//우리의 DB와 연동되있는 .authenticate()임
        failureRedirect: '/login', //인증실패시처리
        successRedirect: '/'   //인증 성공시 처리
    });
    //local은 우리가 설치해준 Strategy의 이름


//사용자를 github인증으로 보내기 위해 필요한코드
export const githubLogin = passport.authenticate("github");


//<passport.js>파일에서 설정할때씀사용자가 github인증후에 정보를 가지고 돌아왔을때 실행되는 콜백함수임
export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) =>{
    //console.log(accessToken, refreshToken, profile, cb);
    const {id, avatar_url, name, email} = profile._json; //깃헙을 통해 받아온 유저정보임
    
    try{
        const user = await User.findOne({email:email});
        
        if(user){  //깃헙을 통해 로그인하려했는데,깃헙에 등록된 이메일이
                   //이미 로컬로 회원가입되있을때 처리하는 상황임
            user.githubId = id; //깃헙의유저id정보값을 user.githubId 프로퍼티의 값에 넣어주고
            user.save();       //저장함
            return cb(null,user);
            //cb콜백함수에 첫번째파라미터에 에러관련, 두번째파라미터에 user객체를담는것임
            // cb함수에 에러가 null 이고 유저객체를 담아 호출하면 정상처리됨을 알리는것임
            //cb콜백함수를 통해 정상처리를 알려야 다음 진행이됨 !!!
            //passport는 cb(null,user)를 통해 전달된 user를 취해서 쿠키를 만들고,저장하고,
            //저장된 쿠키를 브라우저로 보내게됨
        }else{
            const newUser = await User.create({
                email: email,
                name: name,
                githubId: id,
                avatarUrl: avatar_url
            });
            return cb(null, newUser);
            // cb함수에 에러가 null 이고 유저객체를 담아 호출하면 정상처리됨을 알리는것임 
            //cb콜백함수를 통해 정상처리를 알려야 다음 진행이됨 !!!
        }
    }catch(error){
        return cb(error); //두번째파라미터인 유저객체 없이, 에러에대한 첫번째파라미터만 넘길경우 문제가 있다 알리는것임
                             
    }
}
//profile파라미터에 유저의 깃헙정보가 넘어옴


//사용자가 깃헙인증후에 callbackURL경로로 돌아왔을때 실행되는함수
export const postGithubLogIn = (req, res) =>{
    res.redirect(routes.home);
}

export const getLogin = (req, res) => {
    res.render("login",{pageTitle:"Login"});
}

export const logout = (req, res) => {
    //로그아웃처리하기
    req.logout(); //passport를 사용할때, 이렇게만 하면 로그아웃처리가 자동으로됨 //이처리를해주면 더이상 client의 쿠키정보가,
                  //서버로 보내지지않게됨, 이런처리는 passport가 자동으로해줌
    res.redirect(routes.home);
}

//////////////////////////////////////////////////////////////////
//둘다 User Detail을 보여주긴함 상황이다름
//나의프로필버튼누를때의상황
export const getMe = async (req, res) =>  {
    try{
        const user = await User.findById(req.user._id).populate('videos');
        res.render("userDetail",{pageTitle:"User Detail", user : user});
    }catch(error){
        res.redirect(routes.home);
    }
};
//로그인된후에 모든 request에 대해 로그인유저의 쿠키정보가 req.user로 넘어오기때문에 이를 이용하려함
//req.user는 현재 로그인된 사용자임



//비디오detail에서 업로드한사람을 클릭했을때의 상황
export const userDetail = async (req, res) =>  {
    const{id} = req.params;
    try{
        const user = await User.findById(id).populate('videos');
        console.log('타인의프로필접근정보궁금한것');
        console.log(user);
        res.render("userDetail",{pageTitle:"User Detail", user:user});
    }catch(error){
        res.redirect(routes.home);
    }
};
////////////////////////////////////////////////////////////////
export const getEditProfile = (req, res) => res.render("editProfile",{pageTitle:"Edit Profile"});

//프로필수정하기에 대한 처리임
export const postEditProfile = async (req, res) =>{
    try{
        //req.user로 넘어오는 로그인유저의 id를 기반으로 User테이블에서 찾은뒤
        //업데이트할것을 두번째 파라미터로 넘겨주면 업데이트됨
        await User.findByIdAndUpdate(req.user._id,{
            name:req.body.name,
            email :req.body.email,
            avatarUrl: req.file ? req.file.path : req.user.avatarUrl
            //프로필업데이트에서, 사진파일을 업데이트한다면 첨부된 파일이 있을것이므로,
            //업데이트 파일사진을 보여주고, 사진파일 업데이트는 안했을경우는 기존에 있던 사진을 넘겨준다
        });
        res.redirect(routes.me);
    }catch(error){
        res.redirect(routes.editProfile);
    }
 };


export const getChangePassword = (req, res) => {
    res.render("changePassword",{pageTitle:"Change Password"});
}

export const postChangePassword = async (req, res) => {
    const {oldPassword, newPassword, newPassword1} = req.body;
    try{
            if(newPassword !== newPassword1){
                res.status(400);
                res.redirect(`/users/${routes.changePassword}`);
                return;
            }
            //정상적인 진행일경우의 처리과정임 ,passport-local-mongoose (설치했으니),에서 제공해주는 함수를이용해 손쉽게 비빌번호를바꿀거임
            //https://www.npmjs.com/package/passport-local-mongoose참고
            await req.user.changePassword(oldPassword,newPassword); //이거면 비번바뀜
            res.redirect(routes.me);
    }catch(error){
        //기존패스워드를 잘못입력한경우는 여기서 걸러짐
        console.log("현재비번잘못입력");
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
}