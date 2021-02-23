let questions = []
let currentQuestion = 0;
let questionsCompleted = 0;
let answers = [];

let totalQuestions = 60;
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
    //chartContainer.innerHTML = currentQuestion;
    if (currentQuestion < 30){
        // line chart
        chartNum = currentQuestion;
        lineChart("chart","/trialValuesCopy.csv", chartNum);
    } else {
        // horizon chart
        chartNum = currentQuestion - 30;
        makeChart("chart", 500, 500, 20, 100, "/trialValuesCopy.csv", chartNum)
    }

    // TODO: generate viz from question index

    document.getElementById('viz-form').reset();

    console.log("q length"+questions.length)
    if (questions.length == 0){
        document.getElementById('next-button').innerText = "Submit"
    }
}

document.getElementById("start-button").addEventListener("click", function () {
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
        currentAnswers = [currentQuestion, greater, percent];
        answers.push(currentAnswers);
    }

    // TODO record to database

    questionsCompleted++;
    console.log(questionsCompleted)
    currentAnsStr = currentAnswers.join(', ')
    // like 5 for testing purposes
    if (questionsCompleted == totalQuestions) {
        // stop, congrats, you're done!
        // answersString = answers.flat().join(', ')
        currentAnsStr += '\n'
            
    } else {
        displayQuestion()
    }
    let req = {
        data: currentAnsStr
    };
    console.log(currentAnsStr)
    $.post('saveResults',req,function(res){
        console.log("Response recorded.")
    });
}

document.getElementById("next-button").addEventListener("click", recordInput)

document.getElementById("next-button").addEventListener("mouseup", function () { this.blur() })

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
