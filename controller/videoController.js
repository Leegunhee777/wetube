import routes from "../routes";
import {videos} from "../db";

export const home = (req, res) => res.render("home",{pageTitle: "Home",videos:videos});
//views폴더에서 파일명이 home 이고 확장자가 pug인 텔플릿 파일을 찾은 후에 보여준다.
//특정경로에서 HTML을 간편하게 보여주는 .pug를 보여준다
//render함수의 첫번째 인사는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가
//담긴 객체임
export const search = (req, res) => {
    const searchingBy = req.query.term;
    res.render("search",{pageTitle:"Search" , searchingBy : searchingBy,videos:videos});
}
export const getUpload = (req, res) => {
    res.render("upload",{pageTitle:"upload"});
}

export const postUpload = (req, res) => {
    const {file, title, description} = req.body;
    console.log(req.body);
    //To do: 비디오 업로드 및 저장
    res.redirect(routes.videoDetail(324353))
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