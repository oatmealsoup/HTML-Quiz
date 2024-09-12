const quizData = [
  {
    question: 'What genus contains the species that the Iroquois named suicide root?',
    options: ['Aconitum', 'Digitalis', 'Toxicodendron', 'Cicuta'],
    answer: 'Cicuta'
  },
  {
    question: 'Did any Indigenous tribes in Canada use multiple hallucinogens simultaneously in ceremony?',
    options: ['Yes', 'Reportedly', 'No', 'Chemical analysis is required to validate reports'],
    answer: 'Chemical analysis is required to validate reports'
  },
  {
    question: 'Who made the distinction between degrees of infinity?',
    options: ['Pythagoras', 'Aristotle', 'Albert Einstein', 'Georg Cantor'],
    answer: 'Georg Cantor'
  },
  {
    question: 'Who was the first person known to rigorously prove the area of the circle and the surface area and volume of the sphere?',
    options: ['Euclid', 'Pythagoras', 'Aristotle', 'Archimedes'],
    answer: 'Archimedes'
  },
  {
    question: 'What common name is considered to describe the largest organism discovered in terms of surface area?',
    options: ['Aspen tree', 'Honey Mushroom', 'Blue Whale', 'Green algae'],
    answer: 'Honey Mushroom'
  },
  {
    question: 'What was the first programmable general-purpose electronic computer?',
    options: ['The bombe', 'Atanasoff–Berry computer', 'ENIAC', 'The Difference Engine'],
    answer: 'ENIAC'
  },
  {
    question: 'Where is the largest variety of species thought to be found?',
    options: ['Land', 'Sea', 'The Zoo', 'Invalid answer'],
    answer: 'Land'
  },
  {
    question: 'What is the current estimate for the human to bacterial cell ratio in the human body?',
    options: ['1:10', '1:1.3', '1:1', '32.3:1'],
    answer: '1:1.3'
  },
  {
    question: 'How many nuclear weapons has the United States lost?',
    options: ['none', 'two', 'five', 'several'],
    answer: 'several'
  },
  {
    question: 'What plant genus sold at big box stores in Canada contains the most potent psychoactive chemical by weight?',
    options: [
      'Ipomea',
      'Fittonia',
      'Datura',
      'Chemical analysis required'
    ],
    answer: 'Chemical analysis required'
  }
]

const quizContainer = document.getElementById('quiz')
const resultContainer = document.getElementById('result')
const submitButton = document.getElementById('submit')
const retryButton = document.getElementById('retry')
const showAnswerButton = document.getElementById('showAnswer')

let currentQuestion = 0
let score = 0
let incorrectAnswers = []

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

function displayQuestion () {
  const questionData = quizData[currentQuestion]

  const questionElement = document.createElement('div')
  questionElement.className = 'question'
  questionElement.innerHTML = questionData.question

  const optionsElement = document.createElement('div')
  optionsElement.className = 'options'

  const shuffledOptions = [...questionData.options]
  shuffleArray(shuffledOptions)

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label')
    option.className = 'option'

    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'quiz'
    radio.value = shuffledOptions[i]

    const optionText = document.createTextNode(shuffledOptions[i])

    option.appendChild(radio)
    option.appendChild(optionText)
    optionsElement.appendChild(option)
  }

  quizContainer.innerHTML = ''
  quizContainer.appendChild(questionElement)
  quizContainer.appendChild(optionsElement)
}

function checkAnswer () {
  const selectedOption = document.querySelector('input[name="quiz"]:checked')
  if (selectedOption) {
    const answer = selectedOption.value
    if (answer === quizData[currentQuestion].answer) {
      score++
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer
      })
    }
    currentQuestion++
    selectedOption.checked = false
    if (currentQuestion < quizData.length) {
      displayQuestion()
    } else {
      displayResult()
    }
  }
}

function displayResult () {
  quizContainer.style.display = 'none'
  submitButton.style.display = 'none'
  retryButton.style.display = 'inline-block'
  showAnswerButton.style.display = 'inline-block'
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`
}

function retryQuiz () {
  currentQuestion = 0
  score = 0
  incorrectAnswers = []
  quizContainer.style.display = 'block'
  submitButton.style.display = 'inline-block'
  retryButton.style.display = 'none'
  showAnswerButton.style.display = 'none'
  resultContainer.innerHTML = ''
  displayQuestion()
}

function showAnswer () {
  quizContainer.style.display = 'none'
  submitButton.style.display = 'none'
  retryButton.style.display = 'inline-block'
  showAnswerButton.style.display = 'none'

  let incorrectAnswersHtml = ''
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `
}

submitButton.addEventListener('click', checkAnswer)
retryButton.addEventListener('click', retryQuiz)
showAnswerButton.addEventListener('click', showAnswer)

displayQuestion()
