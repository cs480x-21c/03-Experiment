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
    d3.select('#chart').selectAll('*').remove();
    $('.horizon').remove();
    // select a random premade dataset
    let num = Math.round((questions.length - 1) * Math.random());
    let question = questions.splice(num, 1);

    currentQuestion = question[0]
    //chartContainer = document.getElementById("chart-container");
    //chartContainer.innerHTML = currentQuestion;
    if (currentQuestion < 30){
        // line chart
        chartNum = currentQuestion;
        lineChart("#chart", 500, 500, "csv/trialValuesSine.csv", chartNum);
    } else {
        // horizon chart
        chartNum = currentQuestion - 30;
        makeChart("#chart", 500, 500, 20, 100, "csv/trialValuesSine.csv", chartNum)
    }

    // TODO: generate viz from question index

    document.getElementById('viz-form').reset();

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
        greaterInput = document.querySelector('input[name="greater"]:checked')
        greater = greaterInput.value

        percentInput = document.querySelector('input[type="number"]')
        percent = percentInput.value

        if (isNaN(percent) || percent < 1 || percent > 100) {
            percentInput.classList.add(".is-invalid")
            return false;
        }

        document.querySelector('input[name="greater"]').classList.remove(".is-invalid")
        percentInput.classList.remove(".is-invalid")
        return [greater, percent]
    } catch (e) {
        if (e instanceof TypeError) {
            document.querySelector('input[name="greater"]').classList.add(".is-invalid")
            return false;
        }
    }
}

function recordInput() {
    if (validateInput()==false){
        console.log("Input invalid or incomplete.")
        return;
    } else {
        [greater, percent] = validateInput();
        currentAnswers = [currentQuestion, greater, percent];
        answers.push(currentAnswers);
    }

    // TODO record to database

    questionsCompleted++;
    //console.log(questionsCompleted)
    currentAnsStr = currentAnswers.join(', ')

    if (questionsCompleted ==1){
        currentAnsStr = '\n' + currentAnsStr +', '
        displayQuestion()
    } else if (questionsCompleted == totalQuestions) {
        // stop, congrats, you're done!
        // answersString = answers.flat().join(', ')
        currentAnsStr += '\n'
        document.getElementById("question").style.display = "none";
        document.getElementById("content-wrap").innerText="Thank you for your time!"
        
    } else {
        currentAnsStr += ', ';
        displayQuestion()
    }
    let req = {
        data: currentAnsStr
    };
    //console.log(currentAnsStr)
    $.post('saveResults',req,function(res){
        //console.log("Response recorded.")
    });
}

document.getElementById("next-button").addEventListener("click", recordInput)

document.getElementById("next-button").addEventListener("mouseup", function () { this.blur() })

$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    recordInput();
  });
});

$(document).keypress(function (e) {
    if (e.which == 13) {
        //console.log("enter")
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
