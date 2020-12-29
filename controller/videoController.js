import routes from "../routes";
import Video from "../models/Video"; 

export const home = async(req, res) => {
    try{
    const videos = await Video.find({}); //Video테이블안의 모든 정보가져옴
    res.render("home",{pageTitle: "Home",videos:videos});
    }
    catch(err){
        console.log(err);
    }
}
//views폴더에서 파일명이 home 이고 확장자가 pug인 텔플릿 파일을 찾은 후에 보여준다.
//특정경로에서 HTML을 간편하게 보여주는 .pug를 보여준다
//render함수의 첫번째 인사는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가
//담긴 객체임

//async는 javaScript야 function의 어떤 부분은 꼭기다려야해 말하는것임
//await는 과정이 끝날때까지 기다려라 ,밑으로 그냥 진행하지말고 라는말
//await 가 끝날때까지 밑으로 못내려감
//await는 async없이는 쓸수없다
export const search = (req, res) => {
    const searchingBy = req.query.term;
    res.render("search",{pageTitle:"Search" , searchingBy : searchingBy,videos:videos});
}
export const getUpload = (req, res) => {
    res.render("upload",{pageTitle:"upload"});
}

export const postUpload = async(req, res) => {
   // const {videoFile, title, description} = req.body;
    //client에서 post하면 일반적인경우 서버에서는client의 input 태그의 name속성 값으로 조회해볼수있음
    //BUT!!!!!!!
    //multer를 이용한 즉,videos폴더를 통한 URL방식으로 접근되는 파일은
    //서버에서 req.file이라는 변수명으로 접근할수있음(변수명고정임)
    console.log(req.body);
    console.log(req.file);
    const newVideo = await Video.create({
        fileUrl: req.file.path,
        title: req.body.title,
        description: req.body.description
    });
    console.log(newVideo);
   res.redirect(routes.videoDetail(newVideo.id));
   //테이블은 각 데이터마다 고유의 id를 가지고있음, 이를 활용한것임
}

export const videoDetail = (req, res) => {
    res.render("videoDetail",{pageTitle:"Video Detail"});
}
export const editVideo = (req, res) => {
    res.render("editVideo",{pageTitle:"Edit Video"});
}
export const deleteVideo = (req, res) => {
    res.render("deleteVideo",{pageTitle:"Delete Video"});
}