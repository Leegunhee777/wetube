import express from "express";
import routes from "../routes";
import {postAddComment, postRegisterView} from '../controller/videoController';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
/*
apiRouter.get(routes.registerView, postRegisterView);

localhost:4000/api/:id/view" 경로에 대한 처리임
만약누가 이 URL로 온다면 우린id를 얻어서 views를 +1 해줄것임

ex) client측 코드에에서 단순히 fetch만쓰면 fetch("http://localhost:4000/api/5ff60606ca1e33384009913a/view") ,이방식은<getRequest임>을쓰면
위의 라우터가 반응함

=>우리는 동영상을 끝까지 다 시청하였을때 동영상의 view를 +1하도록해줄것임
*/


apiRouter.post(routes.addComment, postAddComment);
export default apiRouter;

