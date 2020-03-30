var startQuiz = document.querySelector("#startQuiz");
// creating a var for the start quiz button, which jquery located from the html file

var quizBtn = document.querySelectorAll(".quizBtn");
//store quiz button into a var

var currentIndex = 0;
//set index/ amount of questions to be answered to 0


//creating variable for score, setting it at 0
var score = 0;


// grabbing start quiz var which is attached to a button, and adding a click event to it
//creating a function  to start quiz for after you click button,
startQuiz.addEventListener("click", function(event){
    //stoping BOX 1, starting timer, and transitions into BOX 2 for questions
    event.stopPropagation();
    startTimer();
    //telling the console which index user is at
    console.log("Current Index at startQuiz click" + currentIndex);
    document.querySelector("#box1").style.display = "none"; 
    document.querySelector("#box2").style.display = "block";
    showQuestions();
});

//function for questions to be shown
function showQuestions() {
    //creating a var to hold object quizQuestions, and its array of questions
    var question = quizQuestions[currentIndex];
    //selecting title, and question choices then setting them to index of answers in questions array
    document.querySelector("#title").innerHTML = question.title;
    document.querySelector("#A").innerHTML = question.choices[0];
    document.querySelector("#B").innerHTML = question.choices[1];
    document.querySelector("#C").innerHTML = question.choices[2];
    document.querySelector("#D").innerHTML = question.choices[3];
}
var quizQuestions = [
    {
        title: "Which building block of the web is used to create dynamic web applications, that take in user input? ",
        choices: ["Javascript", "CSS", "'Python", "HTML"],
        answer: "Javascript"
    },
    {
        title: "What does API stand dor? ",
        choices: ["A Program Interruption", "Application Project Inspector", "Application Programming Interface", "\nAmerican Programming Insituition"],
        answer: "Application Programming Interface"
    },
    {
        title: " Which is used to link Javascript in its tags located in html? ",
        choices: ["src =", "href =", "link =", "alt ="],
        answer: "src ="
    },
    {
        title: "Select the correct name for the definition given: an object-oriented representation of HTML. ",
        choices: ["Terminal", "Console", "Window", "DOM"],
        answer: "DOM"
    },
    {
        title: "What are variables?",
        choices: ["nouns of programming", "random words", "functionClass", "prints things to console"],
        answer: "nouns of programming"
    },
    {
        title: "In a document, what is the body node to head node. ",
        choices: ["siblings", "parent", "child", "none"],
        answer: "siblings"
    },
    {
        title: "What value passes back from one function to another? ",
        choices: ["return", "class", "functionClass", "for"],
        answer: "return"
    },
    {
        title: "What do you call a variable that holds collections?",
        choices: ["arrays", "booleans", "functions", "loops"],
        answer: "arrays"
    },
  ];

  var userName = document.querySelector("#userName");
var endMsg = document.querySelector("#endMsg");
var yourScore = document.querySelector("#userScore");
//varibles to store user input information in BOX 4

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
//creating  var for highscore storage
var submitBtn = document.querySelector("#submitNameScore");

var secondsLeft = 61;

//set a function for quiz timer
function startTimer () {
  var interval = setInterval(function() {
    secondsLeft--;
    document.querySelector("#counterDisplay").innerHTML = secondsLeft;
    console.log(secondsLeft);
    
    //conditional for if time runs out
    if (secondsLeft === 0) {
      clearInterval(interval);
      //Haulting questions BOXs
      document.querySelector("#box2").setAttribute("style", "display: none");
     //Show BOX 3, because time is out
      document.querySelector("#box3").setAttribute("style", "display: block");
    
    //conditional for when all questions have been completed
    } else if (currentIndex === 8) {
      clearInterval(interval); 
      document.querySelector("#box2").setAttribute("style", "display: none");
      //show BOX 4, for user to submit intitals and see score.
      document.querySelector("#box4").setAttribute("style", "display: block");

      score = ((score)*(2));
      //if user doesn't answer any correct...
      if (isNaN(score)) {
        yourScore.innerHTML = "Your score is: 0";
      } else {
        endMsg.innerHTML = "IT'S OVER! YOU DID IT!(: YYYAAYYY";
        yourScore.innerHTML = "Your score is: " + score;
      }
    }
  }, 1000) 
}

// for the "array" of answers...
for (var i = 0; i < quizBtn.length; i++) {
     //function is meant to grab onto the user input value 
     //out of the question answers button is clicked
    quizBtn[i].addEventListener("click", function userAnswer(event) {
        event.stopPropagation();

        //selecting  element id, and using innerHTML to display message
         // "" , ""  ... time penalty given for incorrect answer
        if(event.currentTarget.innerText === quizQuestions[currentIndex].answer){
            score++;
            console.log(score);
            document.querySelector("#checkAnswers").innerHTML="Yup! That's RIGHT!!";
        } else {
            document.querySelector("#checkAnswers").innerHTML="EHHH. That's WRONG!!";
            secondsLeft = secondsLeft - 15;
        }
        console.log("Current Index before ++" + currentIndex);
        currentIndex++;
        
        if (currentIndex < 8) {
        //go back to the questions
        showQuestions();
        }
    });
}

// create event for the user name submit button
submitBtn.addEventListener("click", function(event) {
    //pausing the funtions from before, logging the score into console
    event.stopPropagation();
    console.log("Submit Button click- printscore: " + score); 
  
    
    var initials = userName.value;
    console.log("initials" + initials);
  
    var finalScore = {
      initials, 
      score
    };
    console.log("finalScore" + finalScore);
    highscores.push(finalScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    console.log(initials, score);
  });