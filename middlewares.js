import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: "uploads/videos/"});
//우리가 file을 upload하면,server에 있는 폴더(uploads/video/)에 Upload,
//multer가 자동적으로 uploads/video/폴더를 만들어서 그곳에 file을 저장한다는말
export const uploadVideo = multerVideo.single('videoFile');
//single은 오직하나의 파일만 upload할수 있는걸 의미함
//single('')안의 값은 client측에서 post요청시의 file태그의 name=''값을 넣어주면됨
// ex)client 쪽의 form태그안의 input(type="file", id="file", name="videoFile", required=true, accept="video/*")

export const localsMiddleware = (req, res, next) =>{
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: false,
        id:1
    }//DB생성전 가짜 정보
    next(); //이걸호출해야 다음 작업으로 넘어가짐
};

