export const home = (req, res) => res.render("home");
//views폴더에서 파일명이 home 이고 확장자가 pug인 텔플릿 파일을 찾은 후에 보여준다.
//특정경로에서 HTML을 간편하게 보여주는 .pug를 보여준다
export const search = (req, res) => res.send("Search");
export const videos = (req, res) => res.send("Videos");
export const upload = (req, res) => res.send("Upload");
export const videoDetail = (req, res) => res.send("Video Detail");
export const editVideo = (req, res) => res.send("Edit Video");
export const deleteVideo = (req, res) => res.send("Delete Video");