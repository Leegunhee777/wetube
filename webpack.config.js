const path = require("path");
//파일과, 디렉토리(경로)를 absolute로 만들어주는 기능을 가지고있음
//컴퓨터나 서버에서의 전체경로를 갖게 된다는말
const autoprefixer = require("autoprefixer");

//const ExtractCSS = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const MODE = process.env.WEBPACK_ENV;//pakage.json의 script의 WEBPACK_ENV를 가져온것임

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
//__dirname은 현재의 프레젝트 디렉토리 이름, Node.js전역변수로서 어디서든 접근가능함
const OUTPUT_DIR = path.join(__dirname, "static");
//static이라는 폴더로 보내라,export해라~~라는 의미
//결과적으로 npm run dev:assets 를 하면 static폴더가 생기고 그안에
//styles.css , main.js파일이 생겨야함

const config = {
    entry: ["@babel/polyfill",ENTRY_FILE],//"@babel/polyfill" 브라우저에 아직 없는것(호환을 도와준다고생각해라)을 보유하고있다.   npm install @babel/polyfill설치
    mode:MODE,
    module: { //module을 발견할때마다, 다음과 같은 rules를 따라라 라고정의하고있다
        rules: [
            {//assets폴더의 .js파일변환을 위한 룰 정의
                test: /\.(js)$/,
                use:[
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {//assets폴더의 scss부분을 -> css 로 변환하기위한 룰 정의

                test: /\.(scss)$/, //SCSS로 끝나는 어떤 module(우리의경우엔 syles.scss파일)을만나면
                use:[ //plugin을 사용하도록함,
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {                       //그 부분만 텍스트를 추출해서 어딘가로 보낼거임
                        loader:"css-loader" //마지막으로 이제 webpack이 CSS를 이해할수있게됨
                    },
                    {
                        loader: "postcss-loader", //CSS를 받아서, 우리가 얘한테 주는 plugin을 가지고 CSS를변환해준다.
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                    'autoprefixer',
                                    {
                                        browsers:"cover 99.5%"
                                    },
                                    ]
                                ]
                            }
                           
                        }
                    },
                    {
                        loader:"sass-loader" //SCSS를 받아서 CSS로 바꿔줌
                    }


                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"  //static 폴더안에 main.js에 라는 파일이생김
    },
    plugins:[
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles.css'  //static폴더안에 styles.css라는 폴더가생김
            }),
    ]
};


module.exports = config;