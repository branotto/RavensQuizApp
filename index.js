'use strict';

let question = 0;
let score = 0;

//This function will display feedback on the user's correct answer
function displayFeedBackCorrect()
{
  $('.js-quiz-view').html(
    `<div class="row">
      <div class="col-12">
        <div class="correct_answer">
        <iframe src="https://giphy.com/embed/3o6Ztgb2DLyCHIgWYM" width=75% height=200px frameBorder="0" class="giphy-embed" title="Correct Answer" allowFullScreen></iframe>
        <p><a href="https://giphy.com/gifs/nfl-football-baltimore-ravens-3o6Ztgb2DLyCHIgWYM">via GIPHY</a></p>
        <h2>Way to Go! Thats correct!</h2>
        <form class="advance_question js-next-question">
          <button type="submit" class="next_question js-next-question">Next question</button>
        </form>
      </div>
    </div>
  </div>`);

  score++;
  updateScoreDisplay();
  advanceToNextQuestion();
}

//This function will display feedback on the user's incorrect answer
function displayFeedBackIncorrect()
{
  let correctAnswer = 
    `<div class="row">
      <div class="col-12">
        <div class="incorrect_answer">
          <iframe src="https://giphy.com/embed/3o751Y4UC131goQSv6" width=75% height=200px frameBorder="0" class="giphy-embed" title="Incorrect Answer" allowFullScreen></iframe>
          <p><a href="https://giphy.com/gifs/nfl-football-baltimore-ravens-3o751Y4UC131goQSv6">via GIPHY</a></p>
          <h2>Oh no! The correct answer is ${questionBank[question].correct_answer}
          </h2>
          <form class="advance_question js-next-question">
          <button type="submit" class="next_question js-next-question">Next Question</button>
          </form>
        </div>
      </div>
    </div>`;

  $('.js-quiz-view').html(correctAnswer);
  advanceToNextQuestion();
}

//This function will check the user's answer
function validateUserAnswer()
{
  $('.js-answer-form').submit(function(event)
  {
    //prevent default form submission
    event.preventDefault();
  
    //Get the user response  
    let userResponse = $('input[name="answer"]:checked').val();
   
    //validate the user response
    if(questionBank[question].correct_answer === userResponse)
    {
      displayFeedBackCorrect();
     
     } else
    {
      displayFeedBackIncorrect();
    }
    
  });
}

//Displays the new score when a response is correct.
function updateScoreDisplay()
{
  $('.js-current-score').html(`${score}`);
}

//Updates the question display
function updateQuestionDisplay()
{
  $('.js-question-count').html(`${question + 1}`);
}

//This function will display each question.
function displayQuestion()
{
  updateQuestionDisplay();
  
  let currentQuestion =
  `<div class="row">
    <div class="col-12">
      <form class="answer_form js-answer-form">
        <fieldset name="answer section">
          <legend>${questionBank[question].question}</legend>
            <label for="optionA" class="answer_one">
              <input type="radio" role="radiogroup" id="optionA" name="answer" value="${questionBank[question].answer_one}" required autofocus>
              <span>${questionBank[question].answer_one}</span>
            </label>
        
            <label for="optionB" class="answer_two">
              <input type="radio" role="radiogroup" id="optionB" name="answer" value="${questionBank[question].answer_two}" required>
              <span>${questionBank[question].answer_two}</span>
            </label>
        
            <label for="optionC" class="answer_three">
              <input type="radio" role="radiogroup" id="optionC" name="answer" value="${questionBank[question].answer_three}" required>
              <span>${questionBank[question].answer_three}</span>
            </label>
        
            <label for="optionD" class="answer_four">
              <input type="radio" role="radiogroup" id="optionD" name="answer" value="${questionBank[question].answer_four}" required>
              <span>${questionBank[question].answer_four}</span>
            </label>
        
            <button type="submit">Submit</button>
          </fieldset>
      </form>
    </div>
  </div>`;
  
  //render the current question.
  $('.js-quiz-view').html(currentQuestion);
  
  //listen for the submit event
  validateUserAnswer();
  
}

//This function will display the quiz displayResults
function displayResults()
{
  let quizResult = 
  `<div class="row">
    <div class="col-12">
      <div class="results">
        <img class="game_over" src="http://prod.static.ravens.clubs.nfl.com/assets/img/ravenstown/downloads/2015/Wallpapers_SuggsIntro_1024x768.jpg" alt="Raven Suggs Intro">
        <h2>The hay is in the barn!</h2>
        <h2>You answered ${score} questions correct!</h2>
        <button type="submit" class="restart_quiz js-restart-quiz-button">Restart Quiz!</button>
      </div>
    </div>
  </div>`;
        
  $('.js-quiz-view').html(quizResult);
  
  endQuizToRestart();
  
}

//This function will advance to the next question.
function advanceToNextQuestion()
{
  //increment the question counter.
  question++;
  
  //check to see if all questions have been answered
  $('.js-next-question').submit(function(events)
    {
      event.preventDefault();
      
      if(question === questionBank.length)
      {
        displayResults();
      } else 
      {
        displayQuestion();
      }
      
    });
}

//This function will start the quiz.
function startQuiz()
{
  $('.js-quiz-launch').submit(function(event)
  {
    //prevent default form submission
    event.preventDefault();
    
    //hide the start page section
    $('.js-starting-view').empty();
    
    //display question 1
    displayQuestion();
  });
  
}

//This function will end the quiz and allow the user to restart
function endQuizToRestart()
{
  $('.js-restart-quiz-button').click(function(event)
  {
    question = 0;
    score = 0;

    $('.js-starting-view').html(
      `<div class="row">
        <div class="col-12">
          <h1 class="quiz_start">Can you tackle this Baltimore Ravens Quiz?
          </h1>
          <form class="quiz_launch js-quiz-launch">
            <button type="submit">Ready! Go!</button>
          </form>
        </div>
      </div>`);

      $('.js-quiz-view').empty();

      updateScoreDisplay();
      updateQuestionDisplay();
      
      startQuiz();
  });

}

//Main call back function for the quiz.
//Will call all other functions on page load.
function handleQuiz()
{
  startQuiz();
  endQuizToRestart();
}

//Page Load call back function
$(handleQuiz);