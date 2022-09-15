const starQuiz = document.querySelector(".button button");
const RulesBox = document.querySelector(".RulesBox");
const exitQuiz = document.querySelector(".Buttons .ExitButton");
const ContinueButton = document.querySelector(".Buttons .ContinueButton");
const Questions = document.querySelector(".Questions");
const TimeCount = document.querySelector(".TimeCount .Seconds");
const time_lines = document.querySelector("header .time_lines");
const timeOff = document.querySelector(".QuestionsHeader .TimeLeft"); 

starQuiz.onclick = () => {
  RulesBox.classList.add("activeInfo");
};

exitQuiz.onclick = () => {
  RulesBox.classList.remove("activeInfo");
};
ContinueButton.onclick = () => {
  Questions.classList.add("activeInfo");
  showQuestion(0);
  startTimer(15);
  TimeLines(0);
};

const nextBtn = document.querySelector(".nextBtn");
const resultBox = document.querySelector(".resultBox");
const restart = document.querySelector(".buttons .restart1");
const quit = document.querySelector(".buttons .quit");


let counter;
let counterLine;
let TimeWidth = 0;
let que_count = 0;
let quizeLenght = 15;
let userScore = 0;

quit.onclick = ()=>{
  window.location.reload()
}

restart.onclick = ()=>{
  window.location.reload()
}
function ShowResult() {
  RulesBox.classList.remove("activeInfo");
  Questions.classList.remove("activeInfo");

  resultBox.classList.add("activeResult");
  const scoreText = document.querySelector(".scoreText");
  if (userScore > 3) {
    let scoreTag =
      "<span>Congratulations You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      question.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }else if(userScore > 1){
   let scoreTag = '<span>Carry on You Got <p>'+ userScore +'</p> out Of <p>'+question.length+'</p></span>';
    scoreText.innerHTML = scoreTag;
  }else{
    let scoreTag = '<span>I am Sorry You Got <p>'+ userScore +'</p> out Of <p>'+question.length+'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}
nextBtn.onclick = () => {
  if (que_count < question.length - 1) {
    que_count++;
    showQuestion(que_count);
    clearInterval(counter);
    startTimer(quizeLenght);

    // this is time Line
    clearInterval(counterLine);
    TimeLines(TimeWidth);
  } else {
    ShowResult();
  }
};

const question_hedear_text = document.querySelector(".text");
const optionsLsit = document.querySelector(".MyOptions");
const total_que = document.querySelector(".total_que");

function showQuestion(index) {
  let optionsTag =
    '<div class="options"><span>' +
    question[index].options[0] +
    "</span></div>" +
    '<div class="options"><span>' +
    question[index].options[1] +
    "</span></div>" +
    '<div class="options"><span>' +
    question[index].options[2] +
    "</span></div>" +
    '<div class="options"><span>' +
    question[index].options[3] +
    "</span></div>";
  let questionShowTag =
    "<span>" +
    question[index].number +
    "." +
    question[index].question +
    "</span>";
  let total_queTag =
    '<div class="total_que"><p></p>' +
    question[index].number +
    " of 5" +
    "</p></div>";

  question_hedear_text.innerHTML = questionShowTag;
  optionsLsit.innerHTML = optionsTag;
  total_que.innerHTML = total_queTag;

  const options = optionsLsit.querySelectorAll(".options");

  for (let i = 0; i < options.length; i++) {
    options[i].setAttribute("onclick", "optionsSelected(this)");
  }
  nextBtn.style.display = "none";
}

let tickIcon = `  <div class="tick icon"><i class="fas fa-check"></i></div>`;
let crossIcon = `  <div class="cross icon"><i class="fas fa-times"></i></div>`;

function optionsSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let ansUser = answer.textContent;
  let currectAns = question[que_count].answer;
  let alloptions = optionsLsit.children.length;
  if (ansUser === currectAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("wrong");
    for (let i = 0; i < alloptions; i++) {
      if (optionsLsit.children[i].textContent == currectAns) {
        optionsLsit.children[i].setAttribute("class", "options correct");
        optionsLsit.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
    answer.insertAdjacentHTML("beforeend", crossIcon);
  }
  for (let i = 0; i < alloptions; i++) {
    optionsLsit.children[i].classList.add("disabled");
  }

  nextBtn.style.display = "block";
}

function startTimer(times) {
  counter = setInterval(timer, 1000);

  function timer() {
    TimeCount.textContent = times;
    times--;
    if (times < 0) {
      clearInterval(counter);
      TimeCount.textContent = "00";
    } else if (times < 10) {
      TimeCount.textContent = "0" + times;
    }
  }
}
function TimeLines(time) {
  counterLine = setInterval(timer, 50);
  function timer() {
    time += 1;
    time_lines.style.width = time + "px";
    if (time > 319) {
      clearInterval(counterLine);
    }
  }
}
