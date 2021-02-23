let questions = []
let currentQuestion = 0;
let questionsCompleted = 0;
let answers = [];

let totalQuestions = 3;
// final: 60, testing: 3

for (let i = 0; i < totalQuestions; i++) {
    questions.push(i);
}
// 0-29: lines
// 30-59: horizon

function displayQuestion() {

    chartContainer = document.getElementById("chart-container");

    // select a random premade dataset
    let num = Math.round((questions.length - 1) * Math.random());
    let question = questions.splice(num, 1);

    currentQuestion = question[0]
    chartContainer.innerHTML = currentQuestion;

    // TODO: generate viz from question index

    document.getElementById('viz-form').reset();

    console.log("q length"+questions.length)
    if (questions.length == 0){
        document.getElementById('nextButton').innerText = "Submit"
    }
}

document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("intro").style.display = "none";
    document.getElementById("question").style.display = "block";
    displayQuestion();
})

// an attempt to resize the percent input
/*
$(window).on('resize', function () {
    var win = $(this);
    if (win.width() < 550) {
        console.log("make bigger")
        $('#number-wrapper').removeClass('col-xs-2');
        $('#number-wrapper').addClass('col-xs-3');

    } else {
        console.log("make small")
        $('#number-wrapper').removeClass('col-xs-3');
        $('#number-wrapper').addClass('col-xs-2');
    }
});
*/

function validateInput() {
    try {
        greater = document.querySelector('input[name="greater"]:checked').value

        percent = document.querySelector('input[type="number"]').value

        if (percent > 100) {
            console.log("too high")
            return false;
        }

        return [greater, percent]
    } catch (e) {
        console.log(e)
        if (e instanceof TypeError) {
            console.log("incomplete")
            return false;
        }
    }
}

function recordInput() {
    if (validateInput()==false){
        console.log("nope")
        return;
    } else {
        [greater, percent] = validateInput();
        answers.push([currentQuestion, greater, percent]);
    }

    // TODO record to database

    questionsCompleted++;
    console.log(questionsCompleted)

    // like 5 for testing purposes
    if (questionsCompleted == totalQuestions) {
        // stop, congrats, you're done!
        

        answersString = answers.flat().join(', ')
        console.log(answersString)

        $.post('saveResults',answersString,function(res){
            console.log("yay?")
          });
    } else {
        displayQuestion()
    }
}

document.getElementById("nextButton").addEventListener("click", recordInput)

document.getElementById("nextButton").addEventListener("mouseup", function () { this.blur() })

$(document).keypress(function (e) {
    if (e.which == 13) {
        console.log("enter")
        // Just add your validation code here.

    }
});

/*
let tableText = ""
for (let i=0; i<60; i++){
    tableText += "chart" + i + " integer, greater" + i + " text, percent" + i + " integer, ";
    console.log("um")
}
console.log(tableText);
*/