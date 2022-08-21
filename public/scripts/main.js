let chart;
var numTrials = 60;
var currentTrial = 1;
var username = "ID_" + getTime();
var visList = [];

function main() {
    
}

function startSurvey() {
    if (numTrials % 3 != 0) {
        alert("Number of trials must be a multiple of 3");
        return;
    }

    for (var i = 0; i < numTrials / 3; i++) {
        visList.push("bar");
    }

    for (var i = 0; i < numTrials / 3; i++) {
        visList.push("pie");
    }

    for (var i = 0; i < numTrials / 3; i++) {
        visList.push("treemap");
    }

    shuffle(visList);
}

function shuffle(list) {
    for (let i = list.length-1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
}

function makeChart() {
    let margin = {top: 20, right: 20, bottom: 20, left: 20};
    //let width = Math.min(640, Math.floor(document.getElementById("canvas").width) - margin.left - margin.right);
    let width = 640;
    //let height = Math.min(480, Math.floor((width/4)*3) - margin.top - margin.bottom);
    let height = 480;

    let svg = d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let params = {width: width, height: height, margin: margin};

    switch (visList[currentTrial - 1]) {
        case "bar":
            chart = new BarChart(svg, params);
            break;
        case "pie":
            chart = new PieChart(svg, params);
            break;
        case "treemap":
            chart = new TreeMap(svg, params);
            break;
    }

    chart.draw();
}

function nextButton() {
    let guess = document.getElementById("answer").valueAsNumber;
    let actual = chart.percentage;
    let error = Math.log2(Math.abs(guess - actual) + (1/8));
    console.log("guess: " + guess + " actual: " + actual + " error: " + error);

    postResults(guess, actual, error, visList[currentTrial - 1]);

    document.getElementById("answer").value = "";
    chart.clear();

    if (currentTrial >= numTrials) {
        //window.location.href="/done";
        return;
    } else {
        currentTrial++;
        document.getElementById("trial-tracker").innerHTML = currentTrial + " / " + numTrials;

        makeChart();
    }
}

function postResults(guess, actual, error, vis) {
    data = {
        id: username,
        trial: currentTrial,
        vis: vis,
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