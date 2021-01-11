import routes from "../routes";
import Video from "../models/Video"; 
import Comment from "../models/Comment";

export const home = async(req, res) => {
    try{
    const videos = await Video.find({}).sort({_id:-1}); //Video테이블안의 모든 정보가져옴 ,.sort({_id:-1})를쓰면 역순으로 sort해줌, HOME화면에서 새로운놈이 먼저 보여지게됨
    //console.log(videos);
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
export const search = async(req, res) => {
    const searchingBy = req.query.term;
    let videos =[];
    try{
        videos = await Video.find({title: {$regex: searchingBy, $options: "i"}});
        //regex(정규표현식)의 도움을 받으면, 디비에서 searchingBy와 일치하지 않아도
        //해당 단어를 포함하고있으면 ,그 데이터를 뽑아낼수있음
        //$options: "i" :대소문자 구분없게 하고싶을때
    }catch(error){
        console.log(error);
    }
    
    res.render("search",{pageTitle:"Search" , searchingBy : searchingBy,videos:videos});
}
export const getUpload = (req, res) => {
    res.render("upload",{pageTitle:"upload"});
}

export const postUpload = async (req, res) => {
   // const {videoFile, title, description} = req.body;
    //client에서 post하면 일반적인경우 body의 내용을 서버에서는 client의 input 태그의 name속성 값으로 조회해볼수있음
    //BUT!!!!!!!
    //multer를 이용한 즉,videos폴더를 통한 URL방식으로 접근되는 파일은
    //서버에서 req.file이라는 변수명으로 접근할수있음(변수명고정임)
    console.log(req.body);
    console.log(req.file);
    const newVideo = await Video.create({ //비디오 생성할때 생성한 <비디오테이블>에 유저 id도 추가해주고
        fileUrl: req.file.path,
        title: req.body.title,
        description: req.body.description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo._id); //<유저테이블에>, 본인이올린 비디오 정보도 추가,req.user에는 User.js의 데이터정보가 다 날아옴, 그중 videos필드에 , 배열에 값을 추가해준것임
    req.user.save();
   
    res.redirect(routes.videoDetail(newVideo.id));
   //테이블은 각 데이터마다 고유의 id를 가지고있음, 이를 활용한것임
}

export const videoDetail =  async(req, res) => {
    //console.log(req.params);// /:id형식에서의 URL로 부터 정보를 가져오는 방법 params
try{
    const video = await Video.findById(req.params.id).populate("creator").populate("comments"); //디비의 오브젝트고유의id값으로 오브젝트 전체를 뽑아내는방법
    //console.log("이후");                                                    //populate는 objectID타입data 에만 쓸수있음
    //console.log(video);
    res.render("videoDetail",{pageTitle: video.title, video: video});
}
catch(error){
    console.log(error);
    res.redirect(routes.home); //존재하지않는 URL로 가면 홈으로 이동
}
}

export const getEditVideo = async(req, res) => {
    try{
        const video = await Video.findById(req.params.id);
        if(video.creator != req.user.id){ //!==로 비교하면안되는게 creator(object)과 user.id(string)는 내용은 같으나 Type이 다름 고로, != 로 내용비교만해야함
            throw Error(); //try문안에서 throw Error()를하면, 자동적으로 catch로 감
        }else{
            res.render("editVideo",{pageTitle: `Edit ${video.title}`, video});
        }
    }catch(error){
        res.redirect(routes.home);
    }
}
//get은 뭔가를 채워넣는 작업(보여주는작업)이고,
//post는 업데이트하고 redirect하는 작업이다.
export const postEditVideo = async(req, res) => {
    try{
        await Video.findOneAndUpdate({_id : req.params.id},{title:req.body.title, description: req.body.description});
        //indOneAndupdate함수는 무언가를 반환할 필요가 없는 함수라 위에서와같이 적은거임
        //{_id : req.params.id} 이조건의 _id를 찾고 해당 _id의 title값과 description값을 update한다.
        res.redirect(routes.videoDetail(req.params.id));
    }catch(error){
        res.redirect(routes.home);
    }
}



export const deleteVideo = async(req, res) => {
    try{
        const video = await Video.findById(req.params.id);
        if(video.creator != req.user.id)
        {
            throw Error();
        }else{
            await Video.findOneAndRemove({_id: req.params.id});
        }
       
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home); //성공하던 실패하던 home으로감
}


//Register Video View
//만약누가 이 URL로 온다면 우린id를 얻어서 views를 +1 해줄것임
//그냥 database만 변경하는기능임

export const postRegisterView = async(req, res) =>{
    const {id} = req.params;
    try{
        const video = await Video.findById(id);
        video.view = video.view +1;
        video.save();
       
        res.status(200);
    }catch(error){
        res.status(400);
        res.end();
    }finally{
        res.end();
    }
}

//Comment관련
export const postAddComment = async (req, res) => {
    try{
        const newComment = await Comment.create({    //create으로 디비에 저장까지됨!
            text: req.body.comment,                 //comment 데이터생성
            creator: req.user.id
        });
        const video = await Video.findById(req.params.id); //비디오를 찾아서, comments프로퍼티에 값추가
        video.comments.push(newComment._id);
        video.save();
    }catch{
        res.status(400);
    }finally{
        res.end();
    }
}