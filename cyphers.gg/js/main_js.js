// main.html

//api 변수
const inputNickname = document.querySelector(".input_nickname");
const searchButton = document.querySelector(".search_button");
let playerNickname = null;
let playerId = null;

// 랭킹 이벤트 변수
const rankingMenu = document.querySelector(".ranking_menu")
const rankingButton = document.querySelector(".ranking_button");
const close = document.querySelector(".close")


// 유저아이디 받아오기

async function searchPlayer(nickname, wordType) {
  try {
    const apiUrl = `https://api.neople.co.kr/cy/players?nickname=${nickname}&wordType=${wordType}&apikey=BBm56lzP9IxtGbM0tPRw0y0prd0ATmAR`;
    const response = await fetch(apiUrl);
    let searchData = await response.json();
    if(!searchData.rows || searchData.rows.length === 0){
      alert("존재하지 않는 닉네임 입니다.")
    }
    else if(searchData.rows[0].nickname === playerNickname){
      playerId = searchData.rows[0].playerId;
      localStorage.setItem("playerNickname",searchData.rows[0].nickname);
      location.href = "infor.html";
    }
  } catch (error) {
    console.error('ERROR:', error);
  }
}

inputNickname.addEventListener("keydown", function(event){
  if(event.keyCode === 13){
    playerNickname = inputNickname.value;
    
    if(playerNickname == "" || inputNickname.value.length<1){
      alert("닉네임을 다시 입력해주세요");
      inputNickname.value = "";
    }
    else{
      searchPlayer(playerNickname,"match")
    }
    
  }
});

searchButton.addEventListener("click", function () {
  playerNickname = inputNickname.value;
  if(playerNickname == "" || inputNickname.value.length<1){
    alert("닉네임을 다시 입력해주세요");
    inputNickname.value = "";
  }
  else{
    searchPlayer(playerNickname,"match")
  }
});

//랭킹 이벤트
rankingButton.addEventListener("click",function(){
  rankingMenu.style.cssText = "left:0;";
})

close.addEventListener("click",function(){
  rankingMenu.style.cssText = "left:-20%;"
})


