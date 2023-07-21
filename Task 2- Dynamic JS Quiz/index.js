const quizDB = [
    {
        question: "JavaScript is the programming language of the _____.",
        ans1: "Desktop",
        ans2: "Mobile",
        ans3: "Web",
        ans4: "Server",
        ans: "ans3"
    },
    {
        question: "Which type of JavaScript language is _____?",
        ans1: "Object-oriented",
        ans2: "Object-based",
        ans3: "Functional programming",
        ans4: "All of the above",
        ans: "ans2"
    },
    {
        question: " Which of the following statement(s) is true about the JavaScript?",
        ans1: "It is a scripting language used to make the website interactive",
        ans2: "It is an advanced version of Java for Desktop and Mobile application development",
        ans3: "It is a markup language of Java to develop the webpages",
        ans4: "All of the above",
        ans: "ans1"
    },
    {
        question: "In which HTML element, we put the JavaScript code?",
        ans1: "javascript...javascript",
        ans2: "js...js",
        ans3: "script...script",
        ans4: "css...css",
        ans: "ans3"
    },
    {
        question: "Which JavaScript method is used to access an HTML element by id?",
        ans1: "getElementById()",
        ans2: "getElement(id)",
        ans3: "getElementById(id)",
        ans4: "elementById(id)",
        ans: "ans3"
    },
    {
        question: "Which property is used to define the HTML content to an HTML element with a specific id?",
        ans1: "innerText",
        ans2: "innerContent",
        ans3: "elementText",
        ans4: "innerHTML",
        ans: "ans4"
    },
    {
        question: "Which JavaScript method is used to write into an alert box?",
        ans1: "window.alertHTML()",
        ans2: "window.alert()",
        ans3: "window.alertBox()",
        ans4: "window.alertContent()",
        ans: "ans2"
    },
    {
        question: " What is the main difference between var and let keywords in JavaScript?",
        ans1: "var defines a variable while let defines a constant",
        ans2: "var defined function scoped variable while let define block scoped variable",
        ans3: "The value of a variable declared with var can be changed while the value of a variable declared with let cannot be changed",
        ans4: "All of the above",
        ans: "ans2"
    },
    {
        question: " JavaScript objects are written with _____.",
        ans1: "round brackets ()",
        ans2: "curly brackets {}",
        ans3: `double quotes ""`,
        ans4: "square brackets []",
        ans: "ans2"
    },
    {
        question: " Which is/are the valid JavaScript method(s) to extract string parts?",
        ans1: "slice(start, end)",
        ans2: "substring(start, end)",
        ans3: "substr(start, length)",
        ans4: "All of the above",
        ans: "ans4"
    }
]

const main = document.querySelector(".main");

const loginForm = document.getElementById("loginForm");
const intro = document.querySelector(".intro");

const queArea = document.querySelector(".que_Area");
const queNo = document.querySelector(".queNo");
const que = document.querySelector(".que");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const confetti = document.querySelector(".confetti-container ");

const scoreSheet = document.querySelector(".scoreSheet");
const circular = document.querySelector(".circular");
const score = document.querySelector(".score");
const scoreText = document.querySelector(".score-text");
const review = document.querySelector(".review");
const again = document.querySelector(".again");

const solution = document.querySelector(".solution");



// Global variables
let username = "";
let questionCount = 0;
let userResponse = [];
let displayedIndex = [];

// Generate random index for a new question
const getRandomQuestionIndex = () => {
    let index = Math.floor(Math.random() * quizDB.length);
    while (displayedIndex.includes(index)) {
        index = Math.floor(Math.random() * quizDB.length);
    }
    return index;
};

// Get the selected answer from the options
const getSelectedAnswer = () => {
    let answer = "";
    const answers = document.querySelectorAll(".ans");
    answers.forEach((choice) => {
        if (choice.checked) {
            answer = choice.id;
        }
    });
    return answer;
};

// Deselect all answer options
const deselectAllOptions = () => {
    const answers = document.querySelectorAll(".ans");
    answers.forEach((curr) => {
        curr.checked = false;
    });
};

// Mark the previously selected answer
const markSelectedAnswer = () => {
    const answers = document.querySelectorAll(".ans");
    answers.forEach((curr) => {
        if (curr.id === userResponse[questionCount]) {
            curr.checked = true;
        }
    });
};

// Load next question
const loadNextQuestion = () => {
    const userChoice = getSelectedAnswer();
    userResponse[questionCount] = userChoice;
    if (questionCount < 5) {
        questionCount++;
        queNo.innerText = questionCount + ") ";
        deselectAllOptions();
        if (displayedIndex[questionCount] === undefined) {
            loadQuestion();
        } else {
            loadPreviousQuestion();
            markSelectedAnswer();
        }
    } else {
        result();
    }
};

// Load previous question
const loadPreviousQuestion = () => {
    if (questionCount == 1) {
        prev.style.display = 'none';
    }
    else {
        prev.style.display = 'inline-block';
    }
    const i = displayedIndex[questionCount];
    que.innerText = quizDB[i].question;
    option1.innerText = quizDB[i].ans1;
    option2.innerText = quizDB[i].ans2;
    option3.innerText = quizDB[i].ans3;
    option4.innerText = quizDB[i].ans4;
    queNo.innerText = questionCount + ") ";
};

// Event listener for login form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    username = document.getElementById("name").value;
    console.log(username);
    intro.style.display = "none";
    queArea.style.display = "flex";
    questionCount++;
    queNo.innerText = questionCount + ") ";
    loadQuestion();
});

// Event listener for next button
next.addEventListener("click", loadNextQuestion);

// Event listener for previous button
prev.addEventListener("click", () => {
    questionCount--;
    loadPreviousQuestion();
    markSelectedAnswer();
});

// Load question into the DOM
const loadQuestion = () => {
    if (questionCount == 1) {
        prev.style.display = 'none';
    }
    else {
        prev.style.display = 'inline-block';
    }
    const index = getRandomQuestionIndex();
    que.innerText = quizDB[index].question;
    option1.innerText = quizDB[index].ans1;
    option2.innerText = quizDB[index].ans2;
    option3.innerText = quizDB[index].ans3;
    option4.innerText = quizDB[index].ans4;
    queNo.innerText = questionCount + ") ";
    displayedIndex[questionCount] = index;
};


const result = () => {
    main.style.display = "none";
    scoreSheet.style.display = "flex";
    let fscore = evaluate();
    let endScore = (fscore / questionCount) * 100;
    let startScore = 0;
    let speed = 20;

    let progress = setInterval(() => {
        if (startScore == endScore) {
            clearInterval(progress);
            startScore -= 1

        }
        startScore++;
        score.innerText = `${startScore}%`;
        circular.style.background = `conic-gradient(rgb(200, 14, 206) ${startScore * 3.6}deg , grey 0deg)`;
    }, speed)

    confetti.style.display = "block";
    scoreText.innerText = `Your Score is ${fscore} out of ${questionCount}`;

}

const evaluate = () => {
    let score = 0;
    for (i = 1; i < displayedIndex.length; i++) {
        let idx = displayedIndex[i];
        if (quizDB[idx].ans === userResponse[i]) {
            score++;
        }
        console.log(i + quizDB[idx].ans, " ", userResponse[i]);
    }


    return score;
}

review.addEventListener('click', () => {
    review.style.display = 'none';
    displaySolution();
    solution.style.display = 'block';
    confetti.style.display = "none";
});


const displaySolution = () => {
    let solutionHTML = `<h2 id="review">REVIEW</h2>`; // Variable to store the generated HTML

    for (let i = 1; i < displayedIndex.length; i++) {
        let idx = displayedIndex[i];
        let actualQue = quizDB[idx];

        let correctAnswer = actualQue.ans;
        let tempAnswer = userResponse[i];

        // Generate the HTML for each question and answer options
        solutionHTML += `<div class="final">
            <div class="finalQuestion">
                <p class="reviewQue"> ${i}) ${actualQue.question}</p>
            </div>
            <div class="opt" style="background-color: ${defineColor(correctAnswer, 'ans1', tempAnswer)};">
                <p>a)${actualQue.ans1}</p>
            </div>
            <div class="opt" style="background-color: ${defineColor(correctAnswer, 'ans2', tempAnswer)};">
                <p>b)${actualQue.ans2}</p>
            </div>
            <div class="opt" style="background-color: ${defineColor(correctAnswer, 'ans3', tempAnswer)};">
                <p>c)${actualQue.ans3}</p>
            </div>
            <div class="opt" style="background-color: ${defineColor(correctAnswer, 'ans4', tempAnswer)};">
                <p>d)${actualQue.ans4}</p>
            </div>
        </div>`;
    }

    // Update the HTML content of the solution container
    solution.innerHTML = solutionHTML;
};


const defineColor = (correctAnswer, actualAnswer, tempAnswer) => {
    if (correctAnswer === actualAnswer || tempAnswer === actualAnswer) {
        if (correctAnswer === actualAnswer && tempAnswer === actualAnswer) {
            return 'rgb(86, 181, 86);';
        } else if (correctAnswer === actualAnswer) {
            return 'rgb(86, 181, 86);';
        } else {
            return 'rgba(214, 46, 46, 0.833)';
        }
    } else {
        return 'white';
    }
};


 // JavaScript code to generate random confetti colors
 function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Add confetti elements with random colors
document.addEventListener('DOMContentLoaded', function () {
    var confettiContainer = document.querySelector('.confetti-container');
    var confettiCount = 200; // Adjust the number of confetti elements

    for (var i = 0; i < confettiCount; i++) {
        var confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confettiContainer.appendChild(confetti);
    }
});
