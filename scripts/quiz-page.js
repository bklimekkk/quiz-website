let quizNameLabel = document.querySelector('.js-quiz-name');
let questionLabel = document.querySelector('.js-question');
let answerSection = document.querySelector('.js-answer-section');
let resultSection = document.querySelector('.js-result-section');
let nextButton = document.querySelector('.js-next-button');
let finishQuizSection = document.querySelector('.js-finish-quiz-section');
let quizSection = document.querySelector('.js-quiz-section');
let scoreSection = document.querySelector('.js-score');

const quizName = getQueryParameter('quizName');
let quiz = {};
let questionNumber = 0;
let score = 0;

// Function retrieves quiz name from the header parameters.
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function checkUserAnswer(questionNumber) {
    let answerHTML = '';

    // checking if question has options to choose from to check if it's abcd question.
    if(quiz.questions[questionNumber].answers) {

        // Adding select HTML tag to include all options inside (with option HTML tags).
        answerHTML += `<select class="abcd-answer js-answer">
        `
        quiz.questions[questionNumber].answers.forEach(element => {
            answerHTML += `<option>${element}</option>`
        });
        answerHTML += `</select>
        `;
    } else {
       answerHTML += '<input type="text" placeholder="Enter answer" class="input-answer js-answer" />';
    }
    answerHTML += '<button class="answer-check js-answer-check">Confirm</button>'
    answerSection.innerHTML = answerHTML;

    let answerCheckButton = document.querySelector('.js-answer-check');

    answerCheckButton.addEventListener('click', () => {

        // retrieving value of answer, no matter if it's input or option tag.
        let answer = document.querySelector('.js-answer').value;
        let correctAnswer = quiz.questions[questionNumber].correctAnswer;
        answerSection.innerHTML = '';
        if(answer === correctAnswer) {
            resultSection.classList.remove('incorrect-color');
            resultSection.classList.add('correct-color');
            resultSection.innerHTML = `Asnwer ${answer} is correct`;
            score++;
        } else {
            resultSection.classList.remove('correct-color');
            resultSection.classList.add('incorrect-color');
            resultSection.innerHTML = `Answer ${answer} is incorrect`;
        }

        if(quiz.questions.length === questionNumber + 1) {
            nextButton.innerHTML = 'Finish quiz';
        } else {
            nextButton.innerHTML = 'Next';
        }

        nextButton.classList.remove('no-display');
    });
}

function askQuestion() {
    questionLabel.innerHTML = `Question: ${quiz.questions[questionNumber].question}`;
    checkUserAnswer(questionNumber);
}

function getFirstQuestion() {
    let quizNameString = decodeURIComponent(quizName);
    quizNameLabel.innerHTML = quizNameString

    // Finding the right quiz.
    quiz = quizzes.find((element) => element.name === quizNameString);
    askQuestion(questionNumber)
}
 
if(quizName) {
    getFirstQuestion()
}

nextButton.addEventListener('click', () => {
    let numberOfQuestions = quiz.questions.length;
    if(numberOfQuestions === questionNumber + 1) {

        // Finishing the quiz.
        quizSection.classList.add('no-display');
        scoreSection.innerHTML = `Your result is: ${score}/${numberOfQuestions}`;
        finishQuizSection.classList.remove('no-display');
    } else {
    questionNumber++;
    resultSection.innerHTML = '';
    askQuestion(); 
    }
    nextButton.classList.add('no-display');
});