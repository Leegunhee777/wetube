import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

//이놈도 fackCommnet에 맞춰, 그 댓글수도 맞춰줘야하기때문에 그 처리를 위한것임
const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML)+1; //+1을해주기 위해 parseInt를해주는것임
};


//이런방식을 쓰면 form에서 페이지 새로고침없이 POST할수있음!!!!!!!!!
//헌데 추가된 댓글을 확인하려면 , 새로고침버튼을 눌러야 추가된댓글을 확인할수있는데
// 이건 너무 비효율적이지 않음??  그래서 SPA인 React가 쩌는거임!!!(상태가 변하면 알아서 재랜더링을 자동으로해주므로)
//근데 바닐라 javascript에선 어쩔수 없으니
//그래서 생각한게 페이크 댓글임!!!
//<기존> Post로 보낸후 내가 새로고침을 누르지 않는이상 새롭게추가된 댓글 확인불가
//<수정> Post로 보낸후, 해당 data가 서버로 잘넘어갔는지 확인후에 ->
//새로고침을 누르지않아도 추가된댓글을 바로확인할수있게 페이크댓글을 만들어 이를 보완한다.

const addFakeComment = (comment) =>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
}

const sendComment = async (comment) =>{
    //form태그가 위치한곳은 videodetail.pug임
    //http://localhost:4000/videos/5ff60606ca1e33384009913a 이런식의 경로에 위치해있음
    //고로
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios(`/api/${videoId}/comment`,{
        method: "POST",
        data:{            //data로 보낸것은 서버에서 req.body.comment로 접근가능
            comment :comment
        }
        });

    console.log(response);
    
    if( response.status === 200){ //위에서의 POST가 서버에 도착해여 정상적으로 처리되었을경우에 , FackComment처리
        addFakeComment(comment);
    }
   
   
}

//이 예제는 axios를 사용한 POST이고,
//videoPlayer.js는 fetch를 사용한 POST임!!!
const handleSubmit = (event) =>{
    event.preventDefault();//form에서 submit시 발생하는 새로고침현상 막는법
    const commentInput = addCommentForm.querySelector("input") //form안의 input태그를 가져옴
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = ""; //input값 초기화해주기
}

function init(){
    addCommentForm.addEventListener("submit",handleSubmit);
}

if(addCommentForm){
    init();
}

//비교!!!!!!!!!!!form태그 자체의 기능으로 post하는 방식은 upload.pug참조!!!!
//여기선 axios를 활용해 post할것임