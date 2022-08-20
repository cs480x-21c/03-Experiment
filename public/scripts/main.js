let chart;
var numTrials = 60;
var currentTrial = 1;
var username = "ID_" + getTime();

function main() {
    
}

function startSurvey() {
    username = document.getElementById("username").value;
    window.location.href = "/survey";
}

function makeChart() {
    let width = 640;
    let height = 480;
    let margin = {top: 20, right: 20, bottom: 20, left: 20};

    let svg = d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    chart = new PieChart(svg, {width: width, height: height, margin: margin});
    chart.draw();
}

function nextButton() {
    let guess = document.getElementById("answer").valueAsNumber;
    let actual = chart.percentage;
    let error = Math.log2(Math.abs(guess - actual) + (1/8));
    console.log("guess: " + guess + " actual: " + actual + " error: " + error);

    postResults(guess, actual, error);

    document.getElementById("answer").value = "";
    chart.clear();

    if (currentTrial >= numTrials) {
        window.location.href="/done";
    } else {
        currentTrial++;
        document.getElementById("trial-tracker").innerHTML = currentTrial + " / " + numTrials;

        makeChart();
    }
}

function postResults(guess, actual, error) {
    data = {
        id: username,
        trial: currentTrial,
        vis: "bar",
        guess: guess,
        actual: actual,
        error: error
    }

    console.log(data);
    fetch("/submit", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then (function(response) {
        console.debug(response);
    });
}