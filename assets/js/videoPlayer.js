const videoContainer = document.querySelector("#jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");


const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
      method: "POST"
    });
  };
  //fetch의 POST VS GET
  //:database를 변경할 필요가 없으면 GETRuquest ㄱㄱ
  //:database를 변경해야하는 일이면 POSTRuquest ㄱㄱ

  //window.location.href는 현재내가 위치해있는 경로를 뽑아낼수있음
  //split을 쓰면 videos단어를 중심으로 2등분할수있음,
  //그냥 fetch("......")만 쓰면 GetRequest임
  //PostRequest를 하려면 위에서 처럼 저렇게 써야함


  //참고 fetch('/api...'..=>제일앞에 / 있으면 무조건 localhost:4000/생략임<절대경로>
  // 'api/...'를 하면=> 현재경로/ + api/...되는것임  <상대경로>  


// videoPlayer.removeEventListener("ended", ...);
   //이벤트를 삭제할땐 remove를 하면됨
function init(){
    videoPlayer.addEventListener("ended", registerView);
}


if(videoContainer){ //우리가 원하는 페이지에 있다는 것을체크하기위해 if(videoContainer..이런식으로해당페이지의요소를불러와서 확인하는것임)
                    //모든 js파일들이 assets/main.js폴더로 import되어  views의 main.pug에서 불러들여 사용하고있다.
                    //그럼 모든 js파일들이 한군데로 몰려있다는건데, 여기서 문제가 
                    //내가 원하는 페이지에 내가 원하는 js파일을 어찌 실행시키냐는것이다.
                    //그문제는 내가 원하는 페이지에서 요소를 가져와 그 요소가 true일때 원하는 js파일의 init()초기화를 진행하면된다.
    init();
}

