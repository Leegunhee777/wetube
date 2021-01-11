import { userDetail } from "./controller/userController";

// Global
const HOME ="/";

const JOIN ="/join";
const LOGIN ="/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";

const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";


//Videos

const VIDEOS = "/videos";

const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id"; //해당 :id는/ params로 접근하면 id 추출할수있음
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//API server와 그냥 통신하기위한 URL이 될것임
//사이트를이용하는 user가 접근할수있는 url도 아니고, 해당 url에 어떤것도 렌더 할 수 없다.
//이 라우터는 유저가 어떤곳을 클릭해서 들어가는 그 라우터개념이 아님
const API = "/api";
const REGISTER_VIEW = "/:id/view";

//Comment
const ADD_COMMENT = "/:id/comment";


const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail : id =>{
        if(id){
            return `/users/${id}`;  //1. (안넣을때도있지만,데이타를넣어서)단순히경로를바꾸기위한용도/파라미터가 들어오는상황(라우터속에있지않을때 앞에 /users/를 직접 추가해줘야함)
        }
        else{
            return USER_DETAIL;   //2. 1에의해 바뀐 경로에 대한 처리를하기위한용도(라우터에의해 일반적으로처리될때 앞에 /users/가 자동생략되게됨 express.Router()에의해서 이미경로가 지정됨 )
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    upload : UPLOAD,
    
    videoDetail : id => {
        if(id){
            return `/videos/${id}`; //1).   (안넣을때도있지만,데이타를넣어서)단순히경로를바꾸기위한용도임/파라미터가 들어오는상황(라우터속에있지않을때 앞에 /video/를 직접 추가해줘야함)
        }                           //경로를 바꾼다고, 자동으로 바뀐 경로에대한 .pug가 렌더되는게아님,
        
        else{                       //그 바뀐경로에 대한 .pug파일을 지정해줘야되는것임
            return VIDEO_DETAIL;  //2).   1에의해 바뀐 경로에 대한 렌더를 하기위한용도(라우터에의해 일반적으로처리될때 앞에 /video/가 자동생략되게됨 express.Router()에의해서 이미경로가 지정됨 )
        
        }
    },

    editVideo : id =>{
        if(id) {
            return `/videos/${id}/edit`;
        }
        else{
            return  EDIT_VIDEO
        } 
    },
    deleteVideo :  id =>{
        if(id){
            return `/videos/${id}/delete`;
        }else{
            return DELETE_VIDEO;  //예를 들어 editVideo.pug에서 videoDetail(video.id)를 호출하여 경로를 http://localhost:4000/videos/5feb821b77642921f4832185/delete 이런식으로 바꿧다한들
                                  //해당 경로에 대한 get처리가 안되있다면 Cannot GET /videos/5feb821b77642921f4832185/delete 이런에러가뜸
                                  //해당 경로에서 서버에서 -> client측에 보여줄 data(GET처리)가 설정이 안되있다는것임 ,이걸설정해줘야 해당 경로에서 무언가 보인다.
                                  //1)만하고 2)를 안하면 문제가 생긴다는 말임
        }
    },
    gitHub: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me:ME,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT
};

export default routes;