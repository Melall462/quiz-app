import { questions } from "./questions.js";

const questionText = document.querySelector('.js-question');
const questionAnswer = document.querySelectorAll('.js-answer');
const nextButton = document.querySelector('.js-next-question');
const counter = document.querySelector('.js-counter');

let currentQuestionIndex = 0;
let score = 0;
let quizFinished = false;

function generateQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  questionAnswer.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index].text;
    button.disabled = false;
    button.classList.remove('correct', 'wrong');
  });

  updateCounter();
}

function updateCounter() {
  counter.textContent = `${currentQuestionIndex + 1} of ${questions.length}`;
}

function disableButtons() {
  questionAnswer.forEach(btn => btn.disabled = true);
}

function handleAnswerClick(index) {
  if (quizFinished) return;

  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.answers.findIndex(answer => answer.correct);

  if (index === correctIndex) {
    score++;
    questionAnswer[index].classList.add('correct');
  } else {
    questionAnswer[index].classList.add('wrong');
    questionAnswer[correctIndex].classList.add('correct');
  }

  disableButtons();
}

questionAnswer.forEach((button, index) => {
  button.addEventListener('click', () => handleAnswerClick(index));
});

nextButton.addEventListener('click', () => {
  if (quizFinished) {
    // Reset quiz
    currentQuestionIndex = 0;
    score = 0;
    quizFinished = false;
    nextButton.textContent = "Next";
    generateQuestion();
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    alert(`Quiz finished! Your score is ${score} out of ${questions.length}`);
    quizFinished = true;
    nextButton.textContent = "Restart";
    disableButtons();
  } else {
    generateQuestion();
  }
});

generateQuestion();
