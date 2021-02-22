let questions = []
let questionsCompleted = 0;

for (let i=0;i<60;i++){
    questions.push(i);
}
// 0-29: lines
// 30-59: horizon


function displayQuestion(){
    document.getElementById("mainContainer").innerHTML = '<%- include("../partials/question.ejs"); -%>'
    chartsContainer = document.getElementById("chartsContainer")

    // select a random premade dataset
    let question = questions.splice(Math.round((questions.length-1)*Math.random()),1);
    chartsContainer.innerHTML = question.toString();
    
    // TODO: generate viz from question index
}

function recordInput(){
    inputs = document.getElementsByTagName("inputs");
    console.log(inputs)
    

    questionsCompleted++;

    if (questionsCompeted == 60){
        // stop, congrats, you're done!
    } else {
        displayQuestion()
    }
}
