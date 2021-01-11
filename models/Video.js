import mongoose from "mongoose";

//스키마정의
const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String, //우리는 파일의 링크를 저장할거지 , 파일 자체 바이트를 저장하지않을꺼임 너무무거워지기때문
        required: "File URL is required" //fileUrl을 입력값이 없을때 나오는 에러처리
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    view: {
        type: Number,
        default:0 //초깃값 설정
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    comments:[   //나는 Comment 테이블관련 오브젝트 타입의 필드를설정할거야~~~
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment" //댓글구현방식1. : 각 비디오마다, 댓글리스트(array)를가지고있는방법
                           //[1,2,4,7] 이런식으로 해당 Video와 연결된 Comment들의ID가 저장된다.
        }
    ],
    creator: { //나는 User 테이블관련 오브젝트 타입의 필드를설정할거야~~~
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

//스키마를 이용하여 모델만들기
const model = mongoose.model("Video",VideoSchema);
//모델의 이름은 Video로 만들고/ 해당모델의 스키마는 위에서 정의한 VideoSchema 로 정의

export default model;