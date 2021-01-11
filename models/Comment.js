import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required: "Text is required"
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    /*
    우리는 댓글구현방식2가 아닌 1을 사용할것이다. Video.js의 방식1로 ㄱㄱ
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video" //댓글구현방식2: 각 댓글마다 어느 영상의 댓글인지 남기는방법.우리가 생성한 다른 모델 Video를 참조로건다.ex) ID 1에 해당하는 Video를 가져와줘 (좋아요저장, 유저저장..할떄 쓰일수있는방식)
    }
    */
   creator: {
    type: mongoose.Schema.Types.ObjectId, //나는 User테이블관련 오브젝트 타입의 필드를설정할거야~~~
    ref: "User"
}
});

const model = mongoose.model("Comment", CommentSchema);
export default model;