let nameConfirmButton = document.querySelector('.js-name-confirm-button');
let nameInput = document.querySelector('.js-quiz-name-input');
let quizNameSection = document.querySelector('.quiz-name-section');
let nameErrorMessage = document.querySelector('.js-name-error-message');
let quizNameLabel = document.querySelector('.js-quiz-name');
let quizSection = document.querySelector('.js-quiz-section');
let abcdButton = document.querySelector('.js-abcd-type-question-option');
let textButton = document.querySelector('.js-text-type-question-option');
let backToTypeChoiceButton = document.querySelector('.back-to-type-choice-button');
let questionSection = document.querySelector('.js-question-section');
let questionNumberLabel = document.querySelector('.js-question-number');
let enterQuestionInput = document.querySelector('.js-enter-question-input');
let nextQuestionButton = document.querySelector('.js-next-question');
let nextQuestionErrorMessage = document.querySelector('.js-next-question-error-message');
let finishButton = document.querySelector('.js-finish-button');
let afterQuizSection = document.querySelector('.js-after-quiz-section');
let thankYouText = document.querySelector('.js-thank-you-label');

// initialising crucial variables representing quiz creation lifecycle.
let optionsCounter = 2;
let questionNumber = 1;
let abcdQuestion = false;
let questions = [];

// Function responsible for showing all options for creating the question.
function resetQuestion() {
    abcdButton.classList.remove('no-display');
    textButton.classList.remove('no-display');
    backToTypeChoiceButton.classList.add('no-display');
    nextQuestionButton.classList.add('no-display');
    finishButton.classList.remove('no-display');
    enterQuestionInput.value = '';
    questionSection.innerHTML = '';
    hideNextQuestionErrorMessage();
}

// Functions responsible for showing and hiding error messages.
function displayNextQuestionErrorMessage(errorMessage) {
    nextQuestionErrorMessage.innerHTML = errorMessage;
    nextQuestionErrorMessage.classList.remove('no-display');
}

function hideNextQuestionErrorMessage() {
    nextQuestionErrorMessage.innerHTML = '';
    nextQuestionErrorMessage.classList.add('no-display');
}

function displayNameErrorMessage(errorMessage) {
    nameErrorMessage.innerHTML = errorMessage
    nameErrorMessage.classList.remove('no-display');
}

function hideNameErrorMessage() {
    nameErrorMessage.innerHTML = ''
    nameErrorMessage.classList.add('no-display');
}

// Function responsible for saving the question in questions list.
function saveQuestion() {
    let questionValue = enterQuestionInput.value;

    // Checking if user entered the question.
    if(questionValue.length === 0) {
        displayNextQuestionErrorMessage('All fields must be filled');
        return;
    }
    
    // Type of question will define how to save question's data.
    if(abcdQuestion) {
        let allAnswers = document.querySelectorAll('.abcd-answer');
        let allAnswersValues = Array.from(allAnswers).map(input => input.value);
        let correctAnswer = document.querySelector('.js-abcd-correct-answer').value;

        // Varriable checks if any of input boxes is empty.
        let answerFieldIsEmpty = false;
        let duplicateCheckArray = [];

        // Looping through all options to check if any is empty and checking for duplicates.
        allAnswers.forEach((element) => {
            if(element.value.length === 0) {
                answerFieldIsEmpty = true;
                return;
            } else if (!duplicateCheckArray.includes(element.value)) {
                duplicateCheckArray.push(element.value);
            }
        });

        // Field with correct answer can't be empty.
        if (correctAnswer.length === 0 || answerFieldIsEmpty) {
            displayNextQuestionErrorMessage('All fields must be filled');
            return;
        }

        // Checking if correct answer is contained in answer options.
        if(!allAnswersValues.includes(correctAnswer)) {
            displayNextQuestionErrorMessage('Correct answer must match one of available answer options');
            return;
        }

        // Checking if answer options duplicate.
        if(duplicateCheckArray.length < allAnswersValues.length) {
            displayNextQuestionErrorMessage('Answers must not duplicate');
            return;
        }
        
        // Saving the question with answers in the questions list. 
        questions.push({
            question: questionValue,
            answers: allAnswersValues,
            correctAnswer: correctAnswer
        });
    } else {
    let answerValue = document.querySelector('.text-answer-input').value;
     if(answerValue.length === 0) {
        displayNextQuestionErrorMessage('All fields must be filled');
        return;
     }
        nextQuestionErrorMessage.classList.add('no-display');
        questions.push({
            question: questionValue,
            correctAnswer: answerValue
        });
    } 

    nextQuestionErrorMessage.classList.add('no-display');

    questionNumber++;
    questionNumberLabel.innerHTML = `Question ${questionNumber}`;
    resetQuestion();
}

nameConfirmButton.addEventListener('click', () => {
   let quizName = nameInput.value;
   let nameRepeats = quizzes.map(element => element.name).includes(quizName);

   if (nameRepeats) {
       displayNameErrorMessage('This quiz name already exists');
       return;
   }

    if (quizName.length === 0) { 
       displayNameErrorMessage('You have to enter name of the quiz')
       return;
    } 
        hideNameErrorMessage()
        quizNameSection.classList.add('no-display');
        quizSection.classList.remove('no-display');
        quizNameLabel.innerHTML = `<p class="quiz-name-text js-quiz-name-text">${quizName}</p>
        <button class="change-quiz-name-button js-change-quiz-name-button">Change quiz name</button>
        `;

        document.querySelector('.js-change-quiz-name-button').addEventListener('click', () => {
            quizSection.classList.add('no-display');
            quizNameSection.classList.remove('no-display');
        });
        questionNumberLabel.innerHTML = `Question ${questionNumber}`; 
}); 

abcdButton.addEventListener('click', () => {
    abcdQuestion = true;

    // In abcd case the minimal number of options is 2;
    optionsCounter = 2; 
    abcdButton.classList.add('no-display');
    textButton.classList.add('no-display');
    backToTypeChoiceButton.classList.remove('no-display');
    nextQuestionButton.classList.remove('no-display');
    finishButton.classList.add('no-display');

    // adding HTML responsible for providing full abcd functionality.
    questionSection.innerHTML = `
    <p class="correct-answer-label">Correct answer: </p>
    <input type="text" placeholder="Enter correct answer" class="js-abcd-correct-answer"/>
    <br />
    <button class="js-add-option-button">Add option</button>
    <button class="js-remove-option-button">Remove option</button>
    <br />
    <input type="text" placeholder="1" class="abcd-answer"/>
     <input type="text" placeholder="2" class="abcd-answer"/>
   `;

   // Button is responsible for adding another option in abcd.
   document.querySelector('.js-add-option-button').addEventListener('click', () => {
        optionsCounter++;
        questionSection.insertAdjacentHTML('beforeend', `
            <input type="text" placeholder="${optionsCounter}" class="abcd-answer"/>
        `);
   });

    // Button is responsible for removing option in abcd.
   document.querySelector('.js-remove-option-button').addEventListener('click', () => {
        const allAnswers = document.querySelectorAll('.abcd-answer');
        if (allAnswers.length > 2) {
            allAnswers[allAnswers.length - 1].remove()
            optionsCounter--;
        }
   });
});

textButton.addEventListener('click', () => {
    abcdQuestion = false;
    abcdButton.classList.add('no-display');
    textButton.classList.add('no-display');
    backToTypeChoiceButton.classList.remove('no-display');
    nextQuestionButton.classList.remove('no-display');
    finishButton.classList.add('no-display');

    // Adding input for simple 'question-answer' question.
    questionSection.innerHTML = `
     <input type="text" placeholder="Enter answer" class="text-answer-input"/>
    `;
});

backToTypeChoiceButton.addEventListener('click', () => {
    resetQuestion();
});

nextQuestionButton.addEventListener('click', () => {
   saveQuestion();
});

finishButton.addEventListener('click', () => {
    if(questions.length > 0) {
         let quizName = document.querySelector('.js-quiz-name-text').innerHTML;
        quizzes.push({
            name: quizName,
            questions: questions
        });  
    } else {
        thankYouText.classList.add('no-display');
    }

    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    enterQuestionInput.value = '';
    quizSection.classList.add('no-display');
    afterQuizSection.classList.remove('no-display');
});