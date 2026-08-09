const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Rome', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Venus', correct: false },
    ],
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
    ],
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    answers: [
      { text: 'William Shakespeare', correct: true },
      { text: 'Charles Dickens', correct: false },
      { text: 'Jane Austen', correct: false },
      { text: 'Mark Twain', correct: false },
    ],
  }
];

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  questionContainer.classList.remove('hide');

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(e) {
  const target = e.target;
  const correct = target.dataset.correct;

  if (correct) {
    correctAnswersCount++;
  }

  setStatusClass(document.body, correct);

  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.removeEventListener('click', selectAnswer);
  });

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');

    showResults();

    currentQuestionIndex = 0;
    correctAnswersCount = 0;
  }
}

function showResults() {
  questionElement.innerText = `You answered ${correctAnswersCount} out of ${questions.length} questions correctly.`;

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);

  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
