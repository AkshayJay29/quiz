// code inspired from Quiz on Coagulation in Water Treatment by dhakal79
const startButton = document.getElementById("btn-quiz-rule");
const questionBox = document.getElementById("question-box");
const instructionBox = document.getElementById("box");
const startQuiz = document.getElementById("start-quiz");
const TIMEOUT_SECONDS = 180;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;

// adding addEventfunction (when the quiz rule button clicked)

startButton.addEventListener("click", function() {
    instructionBox.setAttribute("class", "quiz_rule");
});

//  adding addEventfunction ( targeting the start quiz button inside instruction box  )
//instructionBox.classList.add("hide");
startQuiz.addEventListener("click", function() {
    instructionBox.classList.remove("quiz_rule");
    questionBox.setAttribute("class", "question-baskets");
    instructionBox.classList.add("hide");
    timeSecond = TIMEOUT_SECONDS;
});

// targeting timer in the questions
const timeH = document.querySelector('h3');
let timeSecond = TIMEOUT_SECONDS;

timeH.innerHTML = timeSecond;

setInterval(() => {
    timeSecond--;
    timeH.innerHTML = `${timeSecond} sec time remaining`;
    if (timeSecond <= 0) {
        //clearInterval(countDown);
        quizFinalResult();

    }
}, 1000);

// Array of Questions and Answers.

let questions = [{
        number: 1,
        question: "Who is Arsenal's all-time leading goal scorer?",
        answers: ["Thierry Henry", "Dennis Bergkamp", "Ian Wright", "Robin van Persie"],
        rightAnswer: "Thierry Henry",
    
    },
    {
        number: 2,
        question: "In which year did Arsenal last win the Premier League title?",
        answers: ["2003-04", "2007-08", "2010-11", "2015-16"],
        rightAnswer: "2003-04",
    },
    {
        number: 3,
        question: "What is the name of Arsenal's home stadium?",
        answers: ["Emirates Stadium", "Old Trafford", "Anfield", "Stamford Bridge"],
        rightAnswer: "Emirates Stadium",
    },
    {
        number: 4,
        question: "Who is Arsenal's longest-serving manager?",
        answers: ["Arsène Wenger", "Herbert Chapman", "George Graham", "Unai Emery"],
        rightAnswer: "Arsène Wenger",
    },
    {
        number: 5,
        question: "Which player holds the record for the most appearances for Arsenal?",
        answers: ["David O'Leary", "Tony Adams", "Lee Dixon", "Patrick Vieira"],
        rightAnswer: "David O'Leary",
    },
    {
        number: 6,
        question: "Which player scored the fastest goal in Arsenal's history?",
        answers: ["Theo Walcott", "Dennis Bergkamp", "Alexis Sánchez", "Mesut Özil"],
        rightAnswer: "Theo Walcott",
    },
    {
        number: 7,
        question: "What is the nickname of Arsenal Football Club?",
        answers: ["The Gunners", "The Blues", "The Reds", "The Citizens"],
        rightAnswer: "The Gunners",
    },
    {
        number: 8,
        question: "Who scored the winning goal for Arsenal in the 1971 FA Cup final against Liverpool?",
        answers: ["Charlie George", "Ray Kennedy", "Eddie Kelly", "John Radford"],
        rightAnswer: "Charlie George",

    },
    {
        number: 9,
        question: "Which Arsenal player famously scored a hat-trick in the 1979 FA Cup final against Manchester United?",
        answers: ["Alan Sunderland", "Liam Brady", "Frank Stapleton", "Terry Neill"],
        rightAnswer: "Alan Sunderland",

    },
    {
        number: 10,
        question: "Who is known as 'The Invincible' in Arsenal's history?",
        answers: ["Patrick Vieira", "Thierry Henry", "Dennis Bergkamp", "Tony Adams"],
        rightAnswer: "Patrick Vieira",
    },
    
];


// function to getting all the questions and answer options from array .

const question = document.getElementById("question");
var answer = document.getElementById("answer");
//const choiceAnswer = document.getElementsByClassName("answer-option");
const nextButton = document.getElementById("next-question");

function getQuestionContent(questions, questionNumber) {
    const pTag = document.createElement("p");
    pTag.innerHTML = questions[questionNumber].number + ")" + " " + questions[questionNumber].question;
    return pTag.innerHTML;
}

function getAnswerContent(questions, questionNumber) {
    const lastAns = questions[questionNumber].answers[3] ? `<div class="answer-option" > ${questions[questionNumber].answers[3]}</div>` : "";
    let answerChoice = `<div class="answer-option">${questions[questionNumber].answers[0]} </div>` +
        `<div class="answer-option"> ${questions[questionNumber].answers[1]}</div>` +
        `<div class="answer-option"> ${questions[questionNumber].answers[2]}</div>` +
        lastAns;
    return answerChoice;
}

function prepareQuestion(event) {
    nextButton.setAttribute("disabled", true);
    question.innerHTML = getQuestionContent(questions, event);
    answer.innerHTML = getAnswerContent(questions, event);
    answer.addEventListener("click", function(event) {
        chooseAnswer(event);
    });
}

prepareQuestion(0);
let currentQuestion = 0;
let totalScoreAchieved = 0;


// next button function to click to go to next question.

nextButton.setAttribute("disabled", true);
nextButton.addEventListener("click", function() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        prepareQuestion(currentQuestion);

    } else {
        questionBox.classList.add("hide");
        quizFinalResult();
    }

});



// Once answer option is selected other options are disable to select again.
function disableAllAnswers(answers) {
    let totalAnswersCount = answers.children.length;
    for (let i = 0; i < totalAnswersCount; i++) {
        answers.children[i].classList.add("disable");
    }
}
// select answer option if the answer is correct do x and if the answer is incorrect.
function chooseAnswer(selectedAnswer) {
    if (selectedAnswer.target.className !== 'answer-option') {
        return;
    }

    const rightAnswer = selectedAnswer.target;
    let givenAnswer = rightAnswer.innerText;
    let goodAnswer = questions[currentQuestion].rightAnswer;
    nextButton.removeAttribute("disabled");
    if (givenAnswer === goodAnswer) {
        totalScoreAchieved += 1;
        correctAnswerCount += 1;

        // change color to green and red when answer is correct and incorrect, respectively.
        rightAnswer.classList.add("color1");
        increamentScore(correctAnswerCount);
    } else {
        rightAnswer.classList.add("color2");
        wrongAnswerCount += 1;
        increamentWrongAnswer(wrongAnswerCount);

    }
    disableAllAnswers(answer);
}

// increament score for correct answers

function increamentScore(correctAnswerCount) {
    document.getElementById("right-answer").innerText = correctAnswerCount;

}

// increament score for wrong answers
function increamentWrongAnswer(wrongAnswerCount) {
    document.getElementById("wrong-answer").innerText = wrongAnswerCount;

}

// Final result box.

const restartQuiz = document.getElementById("try");

function getTimeOutMessage(totalScoreAchieved, totalQuestionCount) {
    return `<span class="highlight-message"> 
    Aw Man... Your time is up! <br> You did not answer all questions!! <br> Try again!!<br> Your Score is <br> <span> ${totalScoreAchieved} </span> out of <span> ${totalQuestionCount}</span> !</span>`;
}

function getSuccessfulMessage(totalScoreAchieved, totalQuestionCount) {
    return `<span class="highlight-message -1"> 
    Great Job! You are an Arsenal Fanatic!<br> Your Score is <br> <span> ${totalScoreAchieved} </span> out of <span> ${totalQuestionCount}</span> !</span>`;
}

function getNotbadMessage(totalScoreAchieved, totalQuestionCount) {
    return `<span class="highlight-message -2"> 
    Not too shabby!<br> Your Score is <br> <span> ${totalScoreAchieved} </span> out of <span> ${totalQuestionCount}</span> !</span>`;
}

function getFailureMessage(totalScoreAchieved, totalQuestionCount) {
    return `<span class="highlight-message -2"> 
    Awful ! You have had a nightmare...<br> Your Score is <br> <span> ${totalScoreAchieved} </span> out of <span> ${totalQuestionCount}</span> !</span>`;
}

function quizFinalResult() {
    questionBox.classList.remove("question-containers");
    questionBox.setAttribute("class", "hide");
    restartQuiz.setAttribute("class", "try-quiz-again");
    let finalScore = document.getElementById("score");
    if (timeSecond === 0 && currentQuestion < questions.length - 1) {
        finalScore.innerHTML = getTimeOutMessage(totalScoreAchieved, questions.length);
        timeSecond = TIMEOUT_SECONDS;
    } else if (totalScoreAchieved > 13) {
        finalScore.innerHTML = getSuccessfulMessage(totalScoreAchieved, questions.length);


    } else if (totalScoreAchieved >= 7) {
        finalScore.innerHTML = getNotbadMessage(totalScoreAchieved, questions.length);

    } else {
        finalScore.innerHTML = getFailureMessage(totalScoreAchieved, questions.length);

    }

}

// try quiz again button that directs to start of quiz page page
const restartButton = document.getElementById("try-again");
restartButton.addEventListener("click", function() {
    correctAnswerCount = 0;
    wrongAnswerCount =0;
    restartQuiz.classList.remove("try-quiz");
    restartQuiz.setAttribute("class", "hide");
    questionBox.setAttribute("class", "question-baskets");
    currentQuestion = 0;
    timeSecond = TIMEOUT_SECONDS;
    prepareQuestion(currentQuestion);
    document.getElementById("right-answer").innerText = totalScoreAchieved = 0;
    document.getElementById("wrong-answer").innerText = totalScoreAchieved = 0;
});