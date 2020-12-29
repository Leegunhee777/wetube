import app from "./app";
import  "./db";
//import만 해줘도 db가 연결됨
import "./models/Video";
import "./models/Comment";
//위에서는 DB연결만해줬기때문에, 디비안의 모델은 인식하지못함
//디비안의 모델을 인식시키기위해 import "./models/Vidoe"; 적어줘야함

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;


const handleListening = () => console.log(`listening on `);

app.listen(PORT,handleListening);