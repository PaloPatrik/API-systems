let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerInterval;
let timeRemaining = 20;

const startQuiz = async () => {
    const numQuestions = document.getElementById("numQuestions").value;
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const type = document.getElementById("type").value;

    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;

    try {
        const data = await fetchQuestions(url);
        const questions = data.results;
        showQuestion(questions);
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
    }

    document.getElementById("menu").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    startTimer();
};

const fetchQuestions = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const showQuestion = (questions) => {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById("question").textContent = question.question;
        const answersContainer = document.getElementById("answers");
        answersContainer.innerHTML = "";
        const answers = question.incorrect_answers;
        answers.push(question.correct_answer);
        answers.sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(answer, question.correct_answer, questions));
            answersContainer.appendChild(button);
        });
    }
};

const checkAnswer = (answer, correctAnswer, questions) => {
    if (answer === correctAnswer) {
        correctAnswers++;
        document.getElementById("scoreValue").textContent = correctAnswers;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions);
    } else {
        alert(`Peli päättyi! Oikeat vastaukset: ${correctAnswers}`);
        document.getElementById("menu").style.display = "block";
        document.getElementById("quiz").style.display = "none";
        resetQuiz();
    }
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            timeRemaining = 20; 
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions);
            }
        }
    }, 1000);
};

const resetQuiz = () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    timeRemaining = 20;
    clearInterval(timerInterval);
};

document.getElementById("startBtn").addEventListener("click", startQuiz);
