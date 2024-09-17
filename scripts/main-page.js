let noQuizzesSection = document.querySelector('.js-no-quizzes-section');
let quizzesSection = document.querySelector('.js-quizzes-section');

function renderQuizzes() {
    let quizzesHTML = '';

    quizzes.forEach((element, index) => {
        quizzesHTML += `
        <div class="quiz-button js-quiz-button">
        <button class="quiz-delete-button js-quiz-delete-button" data-index="${index}">Delete</button>
        <a href="quiz-page.html?quizName=${encodeURIComponent(element.name)}" class="quiz-page-link">${element.name}</a>
        </div>
        `
    });
    
    quizzesSection.innerHTML = quizzesHTML;

    if(quizzes.length === 0) {
        noQuizzesSection.classList.remove('no-display');
    } else {
        noQuizzesSection.classList.add('no-display');
    }
}

renderQuizzes();

// Handling deleting quiz from the list by extracting the quiz to delete from parent.
quizzesSection.addEventListener('click', (event) => {
    if(event.target.matches('.quiz-delete-button')) {
        let quizIndex = event.target.getAttribute('data-index');
        quizzes.splice(quizIndex, 1);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        renderQuizzes();
    }
});