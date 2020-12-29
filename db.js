import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//config()함수로 .env파일안에있는 정보를 불러올수있다.
//process.env.Key이름 으로 접근가능

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
//String으로 된 Database를 요청함, 어디에 Database가 저장되어있는지 알려주는것임

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log(`Error on DB :${error}`);
db.once("open",handleOpen);
//한번실행되는것 디비가 open되면 handleOpen함수르 한번실행해라~~
db.on("error",handleError)



























/*
export const videos = [
    {
        id: 324353,
        title:"Video awssome",
        description:"This is something I love",
        views:24,
        videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator:{
            id: 12124124,
            name: "Nicolas",
            email:"nico@las.com",

        }
    },
    {
        id: 12351235,
        title:"Video Like",
        description:"This is something I love",
        views:24,
        videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator:{
            id: 12124124,
            name: "Nicolas",
            email:"nico@las.com",

        }
    },
    {
        id: 76896789,
        title:"Video Pass",
        description:"This is something I love",
        views:24,
        videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator:{
            id: 12124124,
            name: "Nicolas",
            email:"nico@las.com",

        }
    },
    {
        id: 3907980,
        title:"Video look",
        description:"This is something I love",
        views:24,
        videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator:{
            id: 12124124,
            name: "Nicolas",
            email:"nico@las.com",

        }
    }
]

*/