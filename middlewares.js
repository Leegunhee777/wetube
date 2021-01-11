import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: "uploads/videos/"});
//우리가 file을 upload하면,server에 있는 폴더(uploads/video/)에 Upload,
//multer가 자동적으로 uploads/video/폴더를 만들어서 그곳에 file을 저장한다는말
export const uploadVideo = multerVideo.single('videoFile');
//single은 오직하나의 파일만 upload할수 있는걸 의미함
//single('')안의 값은 client측에서 post요청시의 file태그의 name=''값을 넣어주면됨
// ex)client 쪽의 form태그안의 input(type="file", id="file", name="videoFile", required=true, accept="video/*")
//<routers/videoRouter.js참고>

const multerAvatar = multer({dest : "uploads/avatars/"});
export const uploadAvatar = multerAvatar.single('avatar');


export const localsMiddleware = (req, res, next) =>{
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;   
    console.log('미들웨어:');
    console.log(req.user);
    
    //존재하지않다면 빈 object를 넘김
    //passport가 사용자를 로그인 시킬때, passport는 쿠키, serialize, deserialize등의
    //기능을 다 지원해주는 것은 물론이고, user가 담긴 object를 요청(request)에도 올려준다.
    //즉,
    //client측에서의 모든request에 대해,서버에서 req.user로 로그인중인 쿠키정보를 받을수있다.!!!
    //그 user가 담긴 object를 모든템플릿에서 사용할수있게,locals 변수로 선언해주는것임

    next(); //이걸호출해야 다음 작업으로 넘어가짐
};


//로그인상태인 사람에게 제한을 두기위한용도
//ex)로그인한사람은 회원가입이나,로그인화면 경로에 접근할필요없다.
export const onlyPublic = (req, res, next)=> {
    if(req.user){ //로그인된상태라면 그 이후의 controller에는 접근못하게함
        res.redirect(routes.home);
    }
    else{
        next();
    }
};

//로그인상태인 사람만 접근할수있는 용도
//ex) 프로필 수정하기, 비빌번호변경, 비디오 업로드
export const onlyPrivate = (req, res, next) =>{
    if(req.user){
        next();
    }
    else{
        res.redirect(routes.home);
    }
};

