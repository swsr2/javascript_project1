// 랜덤번호 맞추기
// 1. 랜덤번호 지정
// 2. 번호입력 그리고 확인버튼 누름
// 3. 업&다운&정답 알려주기 
// 4. reset 버튼 누르면 게임 리셋
// 5. 기회는 5번이고 기회가 없으면 게임오버(버튼 disable)
// 6. 1~100 범위밖에 숫자 입력시 알려준다.(기회는 깎지 않는다)
// 7. 같은 번호 입력시 알려준다.(기회는 살린다)
let computerNum = 0;
let chance = 5; 
let playButton = document.getElementById("play-button");
let inputNum = document.getElementById("num-area");
let result = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset)
inputNum.addEventListener("focus", focusInput);

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1; // 랜덤 번호 설정
    console.log("정답", computerNum);
}

function play() {
    let guessNum = parseInt(inputNum.value); // 사용자가 입력한 값을 가져와 숫자로 변환

    // 입력값이 1~100 사이의 숫자인지 확인
    if (guessNum > 100 || guessNum < 1 || isNaN(guessNum)) {
        result.textContent = "1~100 사이의 값을 입력하세요";
        return;
    }

    if (history.includes(guessNum)) {
        result.textContent = "똑같은 숫자를 입력하셨습니다.";
        return;
    }
    // 사용자의 남은 기회를 확인하고 숫자 비교
    if (chance > 1) {
        if (guessNum > computerNum) {
            result.textContent = "Down!!!";
        } else if (guessNum < computerNum) {
            result.textContent = "Up!!!";
        } else {
            result.textContent = "정답입니다!!!";
            playButton.disabled = true; // 정답을 맞췄을 때 버튼 비활성화
            return;
        }
        history.push(guessNum);
        console.log(history)
        chance--;
        result.textContent += ` 남은 기회: ${chance}`;
    } else {
        result.textContent = "Game Over";
        playButton.disabled = true; // 기회가 다했을 때 버튼 비활성화

        return;
    }   

}
function focusInput(){
    inputNum.value = "";
}

function reset() {
    pickRandomNum()
    result.textContent = "다시 도전!!!"
    chance = 5
    playButton.disabled = false;
    history = [];
}

pickRandomNum(); // 게임 시작 시 랜덤 번호 생성
