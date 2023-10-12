let playerNickname = null;

// 플레이어 정보
let nickname = null;
let playerId = null;
let clanName = null;
let grade = null;
let topRP = null;
let nowRP = null;
let recordWin = null;
let recordLose = null;
let recordStop = null;
let recordWinning= null;
let tier = null;

// 플레이어 전적 정보
let matchDate = null;
let matchTime = null;
let matchMap = null;
let matchId = null;
let matchCharacter = null;
let matchCharacterId = null;
let matchAttackPoint = null;
let matchBattlePoint = null;
let matchDamagePoint = null;
let matchKill = null;
let matchAssist = null;
let matchDead = null;
let matchHeal = null;
let matchLevel = null;
let matchResult = null;
let matchWinning = null;

// 평균
let totalMatch = 0;
let totalKill = 0;
let totalDeadth = 0;
let totalAssist = 0

let averageKill = 0;
let averageDeadth = 0;
let averageAssist = 0;
let averageKDA = 0;

playerNickname = localStorage.getItem("playerNickname")


// 프로필
const $nickname = document.querySelector(".nickname")
const $grade = document.querySelector(".grade")
const $clan = document.querySelector(".clan")

// 티어
const $rankWin = document.querySelector(".rank_win")
const $rankLose = document.querySelector(".rank_lose")
const $rankStop = document.querySelector(".rank_stop")
const $rankWinning = document.querySelector(".rank_winning_point")
const $nowRP = document.querySelector(".now_rp")
const $topRP = document.querySelector(".top_rp")
const $normalWin = document.querySelector(".normal_win")
const $normalLose = document.querySelector(".normal_lose")
const $normalStop = document.querySelector(".normal_stop")
const $normalWinning = document.querySelector(".normal_winning_point")
const $rankTierImg = document.querySelector(".rank_tier_img");
const $normalTierImg = document.querySelector(".normal_tier_img")
const $tierName = document.querySelector(".tier_name")

// 평균 킬뎃
const $kill = document.querySelector(".kill");
const $deadth = document.querySelector(".deadth");
const $assist = document.querySelector(".assist");
const $KDA = document.querySelector(".KDA");

// 검색
const $inputNickname = document.querySelector(".input_nickname");
const $searchButton = document.querySelector(".search_button");

// 매칭조회변수(이거 아닌듯;;)
let gameTypeId = "rating";

const $match = document.querySelector(".match")
const $typeRating = document.querySelector(".match_type_rating");
const $typeNormal = document.querySelector(".match_type_normal")



//evnet
$inputNickname.addEventListener("keydown", function(event){
  if(event.keyCode === 13){
    playerNickname = $inputNickname.value;
    if(playerNickname == "" || $inputNickname.value.length<1){
      alert("닉네임을 다시 입력해주세요");
      $inputNickname.value = "";
    }
    else{

      removeMatchInfo()
      searchPlayer(playerNickname,"match")
      $inputNickname.value = "";
    }
  }
});

$searchButton.addEventListener("click", function () {
  playerNickname = $inputNickname.value;
  if(playerNickname == "" || $inputNickname.value.length<1){
    alert("존재하지 않는 닉네임 입니다.");
  }
  else{
    removeMatchInfo()
    searchPlayer(playerNickname,"match")
    $inputNickname.value = "";
  }
});

$typeRating.addEventListener("click",function(){
  gameTypeId = "rating"
  $typeRating.style.color = "black";
  $typeNormal.style.color = "#adadad";
  removeMatchInfo();
  searchPlayer(playerNickname,"match");
})
$typeNormal.addEventListener("click",function(){
  gameTypeId = "normal"
  $typeRating.style.color = "#adadad";
  $typeNormal.style.color = "black";
  removeMatchInfo();
  searchPlayer(playerNickname,"match");
})



// 매칭조회 요소 추가 함수
function matchInfo(matchResult,matchDate,matchTime,gameTypeId,matchCharacterId,matchCharacter,matchLevel,matchMap, matchKill,matchDead,matchAssist,matchWinning,matchAttackPoint,matchDamagePoint,matchHeal,matchBattlePoint){

  const $matchRecord = document.querySelector(".match_record")

  const $matches = document.createElement("div");
  $matches.className = "matches";
  $matchRecord.appendChild($matches);

  // 매치 내용 추가
  const $matchInfo = document.createElement("div");
  $matchInfo.className = "match_info_win";
  $matches.appendChild($matchInfo)

  const $resultBorder = document.createElement("div");
  $resultBorder.className = "result_border_win";
  $matchInfo.appendChild($resultBorder); 

  // 매치 결과
  const $result = document.createElement("div");
  $result.className = "result";
  $matchInfo.appendChild($result)

  const $resultText = document.createElement("div");
  $resultText.className = "result_text_win";
  $resultText.textContent = matchResult;
  $result.appendChild($resultText);

  // 매치 상세 내용
  const $matchProfile = document.createElement("div");
  $matchProfile.className = "match_profile_win";
  $matchInfo.appendChild($matchProfile);

  // 매치 시간,게임 타입
  const $matchProfileDetail = document.createElement("div");
  $matchProfileDetail.className = "match_profile_detail";
  $matchProfile.appendChild($matchProfileDetail);

  const $matchDate = document.createElement("p");
  $matchDate.className = "match_date";
  $matchDate.textContent = matchDate
  $matchProfileDetail.appendChild($matchDate)

  const $matchTime = document.createElement("p");
  $matchTime.className = "match_time";
  $matchTime.textContent = matchTime;
  $matchProfileDetail.appendChild($matchTime)

  const $matchType = document.createElement("p");
  $matchType.className = "match_type";
  $matchType.textContent = gameTypeId;
  $matchProfileDetail.appendChild($matchType)

  // 캐릭터,레벨,맵
  const $characterProfileImg = document.createElement("img")
  $characterProfileImg.className = "character_profile_img";
  $characterProfileImg.src = `https://img-api.neople.co.kr/cy/characters/${matchCharacterId}?zoom=3`;
  $matchProfile.appendChild($characterProfileImg)
 
  const $characterProfileDetail = document.createElement("div");
  $characterProfileDetail.className = "character_profile_detail";
  $matchProfile.appendChild($characterProfileDetail);
  
  const $characterName = document.createElement("p");
  $characterName.className = "match_name";
  $characterName.textContent = matchCharacter;
  $characterProfileDetail.appendChild($characterName)
  
  const $level = document.createElement("p");
  $level.className = "level";
  $level.textContent = "Lv."+matchLevel;
  $characterProfileDetail.appendChild($level)
  
  const $map = document.createElement("p");
  $map.className = "map";
  $map.textContent = "맵:"+matchMap;
  $characterProfileDetail.appendChild($map)
  
  // 킬뎃어시,kda
  const $matchKda = document.createElement("div");
  $matchKda.className = "match_kda";
  $matchProfile.appendChild($matchKda);
  
  const $matchKdaText = document.createElement("div")
  $matchKdaText.className = "match_kda_text";
  $matchKda.appendChild($matchKdaText);
  
  const $kdaTextKill = document.createElement("p")
  $kdaTextKill.className = "match_text_kill";
  $kdaTextKill.textContent = "킬"
  $matchKdaText.appendChild($kdaTextKill);
  
  const $kdaTextDeadth = document.createElement("p")
  $kdaTextDeadth.className = "match_text_deadth";
  $kdaTextDeadth.textContent = "데스"
  $matchKdaText.appendChild($kdaTextDeadth);
  
  const $kdaTextAssist = document.createElement("p")
  $kdaTextAssist.className = "match_text_assist";
  $kdaTextAssist.textContent = "어시스트"
  $matchKdaText.appendChild($kdaTextAssist);
  
  const $kdaTextKDA = document.createElement("p")
  $kdaTextKDA.className = "match_text_KDA";
  $kdaTextKDA.textContent = "KDA"
  $matchKdaText.appendChild($kdaTextKDA);
  
  const $line = document.createElement("hr")
  $line.className = "line";
  $matchKda.appendChild($line);
  
  const $matchKdaDetail = document.createElement("div")
  $matchKdaDetail.className = "match_kda_detail";
  $matchKda.appendChild($matchKdaDetail);
  
  const $matchKill = document.createElement("p")
  $matchKill.className = "match_kill";
  $matchKill.textContent = matchKill;
  $matchKdaDetail.appendChild($matchKill);
  
  const $matchDeadth = document.createElement("p")
  $matchDeadth.className = "match_deadth";
  $matchDeadth.textContent = matchDead;
  $matchKdaDetail.appendChild($matchDeadth);
  
  const $matchAssist = document.createElement("p")
  $matchAssist.className = "match_assist";
  $matchAssist.textContent = matchAssist;
  $matchKdaDetail.appendChild($matchAssist);
  
  const $matchKDA = document.createElement("p")
  $matchKDA.className = "match_KDA";
  $matchKDA.textContent = matchWinning;
  $matchKdaDetail.appendChild($matchKDA);
  
  // 매치 데미지,피해량,힐량,참여도
  const $matchPoint = document.createElement("div");
  $matchPoint.className = "match_point";
  $matchProfile.appendChild($matchPoint);
  
  const $matchAttack = document.createElement("p");
  $matchAttack.className = "match_attack";
  $matchAttack.textContent = "공격량:"+matchAttackPoint;
  $matchPoint.appendChild($matchAttack)
  
  const $matchDamage = document.createElement("p");
  $matchDamage.className = "match_damage";
  $matchDamage.textContent = "피해량:"+matchDamagePoint;
  $matchPoint.appendChild($matchDamage)
  
  const $matchHeal = document.createElement("p");
  $matchHeal.className = "match_heal";
  $matchHeal.textContent = "힐량:"+matchHeal;
  $matchPoint.appendChild($matchHeal)
  
  const $matchBattle = document.createElement("p");
  $matchBattle.className = "match_battle";
  $matchBattle.textContent = "전투 참여도:"+matchBattlePoint;
  $matchPoint.appendChild($matchBattle)

  if(matchResult == "승리"){
    $matchInfo.className = "match_info_win";
    $resultBorder.className = "result_border_win";
    $resultText.className = "result_text_win";
    $matchProfile.className = "match_profile_win";
  }else if(matchResult == "패배"){
    $matchInfo.className = "match_info_lose";
    $resultBorder.className = "result_border_lose";
    $resultText.className = "result_text_lose";
    $matchProfile.className = "match_profile_lose";
  }
}

// 매칭조회 요소 삭제 함수
function removeMatchInfo(){
  const $matchRecord = document.querySelector(".match_record")
  while($matchRecord.firstChild){
    $matchRecord.removeChild($matchRecord.firstChild)
  }
}
  

// 유저아이디 받아오기

async function searchPlayer(nickname, wordType) {
  try {
    const apiUrl = `https://api.neople.co.kr/cy/players?nickname=${nickname}&wordType=${wordType}&apikey=BBm56lzP9IxtGbM0tPRw0y0prd0ATmAR`;
    const response = await fetch(apiUrl);
    let searchData = await response.json();
    if(!searchData.rows || searchData.rows.length === 0){
      alert("존재하지 않는 닉네임 입니다.")
    }
    else if(searchData.rows[0].nickname === nickname){
      playerId = searchData.rows[0].playerId;
      searchPlayerInfo(playerId,gameTypeId);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function searchPlayerInfo(playerId,gameTypeId){
    try{
      const apiUrl = `https://api.neople.co.kr/cy/players/${playerId}/matches?gameTypeId=${gameTypeId}&startDate=&endDate=&limit=&next=&apikey=BBm56lzP9IxtGbM0tPRw0y0prd0ATmAR`;
      const response = await fetch(apiUrl);
      searchData = await response.json();
      
      // 프로필
      nickname = searchData.nickname;
      $nickname.innerHTML = nickname;

      grade = searchData.grade;
      $grade.innerHTML = grade+"급"

      clanName = searchData.clanName;
      $clan.innerHTML = clanName;
      if(clanName === null){
        $clan.innerHTML = "-"
      }

      // 승패정보가 없음
      if(searchData.records.length === 0){

        recordWin = "-";
        recordLose = "-";
        recordStop = "-";
        recordWinning= "-";
        $rankWin.innerHTML = recordWin+"승";
        $rankLose.innerHTML = recordLose+"패";
        $rankStop.innerHTML = recordStop+"중단";
        $rankWinning.innerHTML = "승률: "+recordWinning+"%";
        $normalWin.innerHTML = recordWin+"승";
        $normalLose.innerHTML = recordLose+"패";
        $normalStop.innerHTML = recordStop+"중단";
        $normalWinning.innerHTML = "승률: "+recordWinning+"%";
      } 

      // 승패정보 있음
      else{
        for(let i = 0; i<searchData.records.length; i++){
          
          // 일반,랭크 둘 중 하나만 존재
          if(searchData.records.length === 1){
            recordWin = searchData.records[i].winCount;
            recordLose = searchData.records[i].loseCount;
            recordStop = searchData.records[i].stopCount;
            recordWinning= (recordWin/(recordWin+recordLose))*100;
            
            if(searchData.records[0].gameTypeId == "rating"){
              
              $rankWin.innerHTML = recordWin+"승";
              $rankLose.innerHTML = recordLose+"패";
              $rankStop.innerHTML = recordStop+"중단";
              $rankWinning.innerHTML = "승률: "+recordWinning.toFixed(2)+"%";

              $normalWin.innerHTML = "-승";
              $normalLose.innerHTML = "-패";
              $normalStop.innerHTML = "-중단";
              $normalWinning.innerHTML = "승률: -%";

              if(recordWin === 0){
                $rankWinning.innerHTML = "승률 0%"
              }
            }
            else if(searchData.records[0].gameTypeId == "normal"){
              
              $rankWin.innerHTML = "-승";
              $rankLose.innerHTML = "-패";
              $rankStop.innerHTML = "-중단";
              $rankWinning.innerHTML = "승률: -%";

              $normalWin.innerHTML = recordWin+"승";
              $normalLose.innerHTML = recordLose+"패";
              $normalStop.innerHTML = recordStop+"중단";
              $normalWinning.innerHTML = "승률: "+recordWinning.toFixed(2)+"%";

              if(recordWin === 0){
                $normalWinning.innerHTML = "승률 0%"
              }
            }
          }

          // 일반,랭크 둘 다 존재
          if(searchData.records.length === 2){
            recordWin = searchData.records[i].winCount;
            recordLose = searchData.records[i].loseCount;
            recordStop = searchData.records[i].stopCount;
            recordWinning= (recordWin/(recordWin+recordLose))*100;

            if(i === 0 && searchData.records[i].gameTypeId == "rating"){
              $rankWin.innerHTML = recordWin+"승";
              $rankLose.innerHTML = recordLose+"패";
              $rankStop.innerHTML = recordStop+"중단";
              $rankWinning.innerHTML = "승률: "+recordWinning.toFixed(2)+"%";

              if(recordWin === 0){
                $rankWinning.innerHTML = "승률 0%"
              }
            }
            else if(i === 1 && searchData.records[i].gameTypeId == "normal"){
              $normalWin.innerHTML = recordWin+"승";
              $normalLose.innerHTML = recordLose+"패";
              $normalStop.innerHTML = recordStop+"중단";
              $normalWinning.innerHTML = "승률: "+recordWinning.toFixed(2)+"%";
              if(recordWin === 0){
                $normalWinning.innerHTML = "승률 0%"
              }
            }
          }
        }
      }

      nowRP = searchData.ratingPoint;
      if(nowRP === null){
        nowRP = "-"
      }
      $nowRP.innerHTML = "현재 RP: "+ nowRP;
      
      topRP = searchData.maxRatingPoint;
      if(topRP === null){
        topRP = "-"
      }
      $topRP.innerHTML = "최대 RP: "+ topRP;


      tier = searchData.tierName;
      $tierName.innerHTML = tier;
      // 언랭
      if(searchData.tierTest === false){
        tier = "Unrank";
        $tierName.innerHTML = tier;
        $rankTierImg.src = "../img/unrank.png";
        $normalTierImg.src = "../img/unrank.png";
      }else{
        // 티어이름 자르기
        if(tier !== "ACE"){
          tier = tier.slice(0,(tier.length-4))
        }
        switch(tier){
          case "ACE":
            $rankTierImg.src = "../img/ace.png";
            $normalTierImg.src = "../img/ace.png";
            break;

          case "JOKER":
            $rankTierImg.src = "../img/joker.png";
            $normalTierImg.src = "../img/joker.png";
            break;

          case "GOLD":
              $rankTierImg.src = "../img/gold.png";
              $normalTierImg.src = "../img/gold.png";
              break;

          case "SILVER":
            $rankTierImg.src = "../img/silver.png";
            $normalTierImg.src = "../img/silver.png";
            break;

          case "BRONZE":
            $rankTierImg.src = "../img/bronze.png";
            $normalTierImg.src = "../img/bronze.png";
            break;
          };
      };

      if(gameTypeId === "rating"){
        if(searchData.matches.rows.length === 0){
          const $matchRecord = document.querySelector(".match_record")
          
          const $matchNone = document.createElement("div");
          $matchNone.className = "match_none";
          $matchNone.textContent = "최근 공식전 기록이 없습니다."
          $matchRecord.appendChild($matchNone);
        }
        for(let i = 0; i<searchData.matches.rows.length; i++){

          matchDate = searchData.matches.rows[i].date;
          matchDate = matchDate.slice(0,(matchDate.length-6))
          matchTime = searchData.matches.rows[i].date;
          matchTime = matchTime.slice(11)
          matchId = searchData.matches.rows[i].matchId;
          matchMap = searchData.matches.rows[i].map.name;
          matchCharacter = searchData.matches.rows[i].playInfo.characterName;
          matchCharacterId = searchData.matches.rows[i].playInfo.characterId;
          matchAttackPoint = searchData.matches.rows[i].playInfo.attackPoint;
          matchBattlePoint = searchData.matches.rows[i].playInfo.battlePoint;
          matchDamagePoint = searchData.matches.rows[i].playInfo.damagePoint;
          matchKill = searchData.matches.rows[i].playInfo.killCount;
          matchAssist = searchData.matches.rows[i].playInfo.assistCount;
          matchDead = searchData.matches.rows[i].playInfo.deathCount;
          matchHeal = searchData.matches.rows[i].playInfo.healAmount;
          matchLevel = searchData.matches.rows[i].playInfo.level;
          matchResult = searchData.matches.rows[i].playInfo.result;
          if(matchResult === "win"){
            matchResult = "승리"
          }else{
            matchResult = "패배"
          }
          gameTypeId = "공식전"

          matchWinning = (matchKill+matchAssist)/matchDead;
          matchWinning = matchWinning.toFixed(1)
          if(matchDead === 0){
            matchWinning = "Perfect"
          }

          totalMatch = totalMatch+searchData.matches.rows.length;
          totalKill = totalKill + matchKill;
          totalDeadth = totalDeadth+matchDead;
          totalAssist = totalAssist+matchAssist;
  
          // 매치 추가
          matchInfo(matchResult,matchDate,matchTime,gameTypeId,matchCharacterId,matchCharacter,matchLevel,matchMap, matchKill,matchDead,matchAssist,matchWinning,matchAttackPoint,matchDamagePoint,matchHeal,matchBattlePoint)
        }
        
      }else if(gameTypeId === "normal"){
        if(searchData.matches.rows.length === 0){
          const $matchRecord = document.querySelector(".match_record")
          
          const $matchNone = document.createElement("div");
          $matchNone.className = "match_none";
          $matchNone.textContent = "최근 일반전 기록이 없습니다."
          $matchRecord.appendChild($matchNone);
        }
        
        for(let i = 0; i<searchData.matches.rows.length; i++){

          matchDate = searchData.matches.rows[i].date;
          matchDate = matchDate.slice(0,(matchDate.length-6))
          matchTime = searchData.matches.rows[i].date;
          matchTime = matchTime.slice(11)
          matchId = searchData.matches.rows[i].matchId;
          matchMap = searchData.matches.rows[i].map.name;
          matchCharacter = searchData.matches.rows[i].playInfo.characterName;
          matchCharacterId = searchData.matches.rows[i].playInfo.characterId;
          matchAttackPoint = searchData.matches.rows[i].playInfo.attackPoint;
          matchBattlePoint = searchData.matches.rows[i].playInfo.battlePoint;
          matchDamagePoint = searchData.matches.rows[i].playInfo.damagePoint;
          matchKill = searchData.matches.rows[i].playInfo.killCount;
          matchAssist = searchData.matches.rows[i].playInfo.assistCount;
          matchDead = searchData.matches.rows[i].playInfo.deathCount;
          matchHeal = searchData.matches.rows[i].playInfo.healAmount;
          matchLevel = searchData.matches.rows[i].playInfo.level;
          matchResult = searchData.matches.rows[i].playInfo.result;
          if(matchResult === "win"){
            matchResult = "승리"
          }else{
            matchResult = "패배"
          }
          gameTypeId = "일반전"

          matchWinning = (matchKill+matchAssist)/matchDead;
          matchWinning = matchWinning.toFixed(1)
          if(matchDead === 0){
            matchWinning = "Perfect"
          }
  
          // 매치 추가
          matchInfo(matchResult,matchDate,matchTime,gameTypeId,matchCharacterId,matchCharacter,matchLevel,matchMap, matchKill,matchDead,matchAssist,matchWinning,matchAttackPoint,matchDamagePoint,matchHeal,matchBattlePoint)
        }
      }
      
      averageKill = (totalKill/totalMatch)*searchData.matches.rows.length
      averageDeadth = (totalDeadth/totalMatch)*searchData.matches.rows.length
      averageAssist = (totalAssist/totalMatch)*searchData.matches.rows.length
      averageKDA = (averageKill+averageAssist)/averageDeadth;
      
      if(searchData.matches.rows.length === 0){
        averageKDA = 0;
        averageKill = 0;
        averageDeadth = 0;
        averageAssist = 0;
      }


      $kill.innerHTML = (averageKill).toFixed(1);
      $deadth.innerHTML = (averageDeadth).toFixed(1);
      $assist.innerHTML = (averageAssist).toFixed(1);
      $KDA.innerHTML = (averageKDA).toFixed(1);

    }catch(error){
      console.error("ERROR:",error);
    }
}
searchPlayer(playerNickname,"match");
  
  
  
