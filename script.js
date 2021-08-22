//Main container fade in
$("#welcome-container").fadeIn(2000);

//Setting variables for elements on the html page
var startButton = document.getElementById("btnStartQuiz");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var questionSelection = document.getElementById("question");
var scoreCard = document.getElementById('score');
var option1 = document.getElementById("op1");
var option2 = document.getElementById("op2");
var option3 = document.getElementById("op3");
var option4 = document.getElementById("op4");
var overlayText = document.getElementById("overlay-text");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials-input");
var initialSubmit = document.getElementById("btn-initials");
var initialLabel = document.getElementById("initial-label");
var scoreList = document.getElementById("score-list");
var restartButton = document.getElementById("btn-restart");

//Empty array for users who take the quiz
var quizPlayers = [];

// Empty object to push into array when filled with name and score
var quizObj = {}

// Initialize score list
init();

// Setting seconds and interval variables that we will use for our timer
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

// Function created to format minutes
function getFormattedMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;
  
    var minutesLeft = Math.floor(secondsLeft / 60);
  
    var formattedMinutes;
  
    if (minutesLeft < 10) {
      formattedMinutes = "0" + minutesLeft;
    } else {
      formattedMinutes = minutesLeft;
    }  
    return formattedMinutes;
  }

  //Function created to format seconds
function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
  }

//Function created to format setting the timer
function setTime() {
    //Set timer to 60 seconds
    var minutes = 0.5;
  
    clearInterval(interval);
    totalSeconds = minutes * 120;
  }

//Function created to display the timer as it counts down
function renderTime() {
minutesDisplay.textContent = getFormattedMinutes();
secondsDisplay.textContent = getFormattedSeconds();

//If time runs out do the following
if (secondsElapsed >= totalSeconds) {
    stopTimer();
    $("#quiz-container").fadeOut(500);
    overlayText.textContent = "TIME EXPIRED !";
    overlayText.style.color = "gold";
    $("#overlay").fadeIn(1000);
    $("#overlay").fadeOut(2000);
    $("#high-score-container").fadeIn(2000);
}
}

//Start timer function
function startTimer() {
    setTime();
  
    interval = setInterval(function () {
      secondsElapsed++;
      renderTime();
    }, 1000);
  }
  
  //Stop timer function
  function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
  }

  //Function to subtract 10 seconds each time user answers incorrectly
function subtractTime() {
    secondsElapsed+=10;
  }

  //Setting questions Object variable 
var questionsObj = {
    questions: [
      { q: 'What HTML tag is used to enter a new line into HTML contents?', options: ['<br>', '<h1>', '<p>', '<hr>'], answer: 1},

      { q: 'The condition in an if / else statement is enclosed within ____.', options: ['quotes', 'double quotes', 'parentheses', 'curly brackets'], answer: 4},

      { q: 'Inside which HTML element do we put the JavaScript?', options: ['<scripting>', '<script>', '<js>', '<javascript>'], answer: 2},

      { q: 'How do you write "Hello World" in an alert box?', options: ['msg("Hello World")', 'alert("Hello World")', 'msgBox("Hello World")', 'alertBox("Hello World")'], answer: 2},
      
      { q: 'What is the correct way to write a JavaScript array?', options: ['var colors = ["red", "green", "blue"]', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 'var colors = "red", "green", "blue"', 'var colors = (1:"red", 2:"green", 3:"blue")'], answer: 1},

      { q: 'Where is the correct place to insert a JavaScript?', options: ['The <body> section', 'The <head> section', 'Both the <head> section and the <body> section', 'The <main> section'], answer: 3},

      { q: 'How do you create a function in JavaScript?', options: ['Function:myFunction()', 'Function myFunction()', 'Function = myFunction()', 'Function = myFunction{}'], answer: 2},

      { q: 'How to write an IF statement in JavaScript?', options: ['if i == 5 then', 'if (i == 5)', 'if i = 5', 'if i = 5 then'], answer: 2},      
      
      { q: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?', options: ['if i =! 5 then', 'if (i != 5)', 'if (i <> 5)', 'if i <> 5'], answer: 2},

      { q: 'How does a FOR loop start?', options: ['for i = 1 to 5', 'for (i = 0; i <= 5)', 'for (i <= 5; i++)', 'for (i = 0; i <= 5; i++)'], answer: 4},
    ],
    index: 0,
    
    //Function that loads each question and the possible answers
    load: function () {
      if (this.index <= this.questions.length -1) {
        questionSelection.textContent = this.index + 1 + ". " + this.questions[this.index].q;
        option1.textContent = this.questions[this.index].options[0];
        option2.textContent = this.questions[this.index].options[1];
        option3.textContent = this.questions[this.index].options[2];
        option4.textContent = this.questions[this.index].options[3];
        this.scoreCard();
      }
      else{
        //When the user is done answering all of the questions do the following
        stopTimer();
        $("#quiz-container").fadeOut(1000);
        $("#high-score-container").fadeIn(2000);  
      }
    },
    //Function that goes to the next question
    nextQuestion: function () {
      this.index++;
      this.load();
    },
    //Function that checks if the answer is correct or wrong
    checkAnswer:function(ele){
                   
      var id = ele.id.split('');
      
      if(id[id.length-1]==this.questions[this.index].answer){
        this.score++;
        this.scoreCard();
        overlayText.textContent = "CORRECT";
        overlayText.style.color = "green";
        $("#overlay").fadeIn(1000);
        $("#overlay").fadeOut(1000);
      }
      else{
        overlayText.textContent = "WRONG";
        overlayText.style.color = "red";
        $("#overlay").fadeIn(1000);
        $("#overlay").fadeOut(1000);
        subtractTime();
      }
  },
    score: 0,
    scoreCard: function () {
      scoreCard.textContent = (this.score / this.questions.length) * 100 ;
      finalScore.textContent = scoreCard.textContent;
    }
  }

  //Function that is used for each possible answer selection
function button(ele){
    questionsObj.checkAnswer(ele);
    questionsObj.nextQuestion();
  }

  //Start button that initiates the quiz
startButton.addEventListener("click", function () {
    //fade out the welcome container and fade in the quiz container
    $("#welcome-container").fadeOut(100);
    $("#quiz-container").fadeIn(2000);
    //Start the timer
    startTimer();
    window.onload = questionsObj.load();
  });

  function renderScoreList() {
    scoreList.innerHTML = "";    
  
    // Render a new p for each player score
    for (var i = 0; i < quizPlayers.length; i++) {
      var player = quizPlayers[i].name;
      var score = quizPlayers[i].score;
      var playerScoreDisplay = `${player} - Score: ${score}`
      
      var pTag = document.createElement("p");
      pTag.textContent = playerScoreDisplay;
      pTag.setAttribute("data-index", i);
  
      scoreList.appendChild(pTag);
    }
  }

  function init() {
    // Get stored  from localStorage
    // Parsing the JSON string to an object
    var storedPlayers = JSON.parse(localStorage.getItem("quizPlayers"));
        
    if (storedPlayers !== null) {
      quizPlayers = storedPlayers;
    }
  
    // Render playerlist to the DOM
    renderScoreList();
  }

  function storeQuizPlayers() {
    // Stringify and set "quiz players" key in localStorage
    localStorage.setItem("quizPlayers", JSON.stringify(quizPlayers));
  }

  //Submit initials after quiz is over
initialSubmit.addEventListener("click", function(event) {
    event.preventDefault();
  
    var inputText = initials.value.trim();
      
    if (inputText === "") {
      return;
    }
    
    // Setting values to the quizObj to push into the array
    quizObj.name = inputText;
    quizObj.score = finalScore.innerText;
  
    // Pushing quizObj into quizPlayers array that includes name and score
    quizPlayers.push(quizObj);
    initials.value = "";
  
    // Store updated todos in localStorage, re-render the list
    storeQuizPlayers();
    renderScoreList();
    initials.style.display = "none";
    initialSubmit.style.display = "none";
    initialLabel.style.display = "none";
    restartButton.style.display = "inline";
  });

  //Restarts the quiz
restartButton.addEventListener("click", function(){
    location.reload();
  });

