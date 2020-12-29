import express from 'express';
import routes from "../routes";
import {postUpload, getUpload, videoDetail, editVideo, deleteVideo} from '../controller/videoController';
import {uploadVideo} from "../middlewares";

const videoRouter  = express.Router();


videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload,uploadVideo,postUpload);
//우리가 file을 upload하면,server에 있는 폴더(uploads/video/)에 Upload
//그다음 postUpload라는 function은 해당 file에 접근함(file자체가아닌 URL방식으로)
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);


export default videoRouter;