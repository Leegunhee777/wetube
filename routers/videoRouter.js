import express from 'express';
import routes from "../routes";
import {postUpload, getUpload, videoDetail, getEditVideo,postEditVideo, deleteVideo} from '../controller/videoController';
import {uploadVideo} from "../middlewares";
import { onlyPrivate } from "../middlewares";

const videoRouter  = express.Router();

//Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload,onlyPrivate, uploadVideo, postUpload);
//우리가 file을 upload하면,server에 있는 폴더(uploads/video/)에 Upload
//그다음 postUpload라는 function은 해당 file에 접근함(file자체가아닌 URL방식으로)


//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);



//EditVideo
videoRouter.get(routes.editVideo(),onlyPrivate, getEditVideo);
//client측 경로에 대한 접속이 이루어지면 , getEditVideo함수발동
videoRouter.post(routes.editVideo(),onlyPrivate, postEditVideo);
//client측 해당경로에서 post요청이 들어올경우, postEditvideo함수발동


//delete
videoRouter.get(routes.deleteVideo(), onlyPrivate,deleteVideo);


export default videoRouter;