console.log("Connected!")
const questions = [
    {
      question: "Who is Arsenal's all-time leading goal scorer?",
      options: ["Thierry Henry", "Dennis Bergkamp", "Ian Wright", "Robin van Persie"],
      answer: "Thierry Henry"
    },
    {
      question: "In which year did Arsenal last win the Premier League title?",
      options: ["2003-04", "2007-08", "2010-11", "2015-16"],
      answer: "2003-04"
    },
    {
      question: "What is the name of Arsenal's home stadium?",
      options: ["Emirates Stadium", "Old Trafford", "Anfield", "Stamford Bridge"],
      answer: "Emirates Stadium"
    }
  ];

  let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionListElement = document.getElementById('option-list');
    const feedbackElement = document.getElementById('feedback');
  
    questionElement.textContent = currentQuestion.question;
    optionListElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const optionItem = document.createElement('li');
      optionItem.textContent = option;
      optionItem.onclick = () => checkAnswer(option);
      optionListElement.appendChild(optionItem);
    });
  
    feedbackElement.textContent = '';
  }
  
/**
 * method to check if answer is valid
 * @param {*} answer 
 */
function checkAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  const feedbackElement = document.getElementById('feedback');

  if (answer === currentQuestion.answer) {
    score++;
    feedbackElement.textContent = 'Correct!';
  } else {
    feedbackElement.textContent = 'Incorrect!';
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    const nextButton = document.getElementById('next-button');
    nextButton.textContent = 'Finish';
    nextButton.onclick = finishQuiz;
  }

  updateScore();
}
  
  function updateScore() {
    const scoreValueElement = document.getElementById('score-value');
    scoreValueElement.textContent = score;
  }
  
  function finishQuiz() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<h2>Quiz Completed!</h2>
                                   <p>Your final score is ${score} out of ${questions.length}.</p>`;
  }
  
  loadQuestion();