const getElementById = (id) => document.getElementById(id);
const quizBody = getElementById("quiz");
const resultsEl = getElementById("result");
const finalScoreEl = getElementById("finalScore");
const gameoverDiv = getElementById("gameover");
const questionsEl = getElementById("questions");
const quizTimer = getElementById("timer");
const startQuizButton = getElementById("startbtn");
const startQuizDiv = getElementById("startpage");
const highscoreContainer = getElementById("highscoreContainer");
const highscoreDiv = getElementById("high-scorePage");
const highscoreInputName = getElementById("initials");
const highscoreDisplayName = getElementById("highscore-initials");
const endGameBtns = getElementById("endGameBtns");
const submitScoreBtn = getElementById("submitScore");
const highscoreDisplayScore = getElementById("highscore-score");
const buttonA = getElementById("a");
const buttonB = getElementById("b");
const buttonC = getElementById("c");
const buttonD = getElementById("d");


const quizQuestions = [{
  question: "Which HTML tag is used to define an unordered list?",
  choiceA: "<ul>",
  choiceB: "<ol>",
  choiceC: "<li>",
  choiceD: "<p>",
  correctAnswer: "a"
},
{
  question: "Which property is used to change the color of text in CSS?",
  choiceA: "text-style",
  choiceB: "color",
  choiceC: "font-color",
  choiceD: "text-color",
  correctAnswer: "b"
},
{
  question: "What is the correct way to declare a variable in JavaScript?",
  choiceA: "var myVar;",
  choiceB: "myVar : var;",
  choiceC: "variable myVar;",
  choiceD: "var = myVar;",
  correctAnswer: "a"
},
{
  question: "Which HTML tag is used to create a hyperlink?",
  choiceA: "<link>",
  choiceB: "<hyperlink>",
  choiceC: "<a>",
  choiceD: "<anchor>",
  correctAnswer: "c"
},
{
  question: "What method is used to add an element to the end of an array in JavaScript?",
  choiceA: "push()",
  choiceB: "append()",
  choiceC: "add()",
  choiceD: "insert()",
  correctAnswer: "a"
}];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}


function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
      currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}
startQuizButton.addEventListener("click",startQuiz);