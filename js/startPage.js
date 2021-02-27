function startPage() {

    var startbuttonDiv = document.createElement("div");
    var pDiv = document.createElement("div");
    var startDiv = document.createElement("div");

    // Start button div info
    startbuttonDiv.style.height = "200px";
    pDiv.style.height = "100px";
    //startDiv.style.height = "200px";
    startDiv.id = "startDiv";
    pDiv.id = "pDiv";
    startbuttonDiv.id = "startbuttonDiv";
    startDiv.appendChild(pDiv);
    startDiv.appendChild(startbuttonDiv);
    document.body.appendChild(startDiv);

    // Intro paragraph(s)
    var intro = document.createElement("P");
    intro.innerHTML = "In this experiment,<br> you are asked to judge<br> what is the percent of a smaller value to a larger value in several charts. <br> <br> We won't record any other information from you except your answers. <br> Click the \"Start\" button to begin";
    pDiv.appendChild(intro);

    // Start button info
    var start = document.createElement("button");
    var startText = document.createTextNode("Start");
    start.appendChild(startText);
    startbuttonDiv.appendChild(start);
    start.classList.add('startButton');
    start.classList.add('StartPage');
    start.onclick = function () {
        startDiv.style.display = "none";
        // Un-hide the svg div
        svgdiv.style.display = 'block';
        textBoxSubmit();
        drawNextChart(randArray[numSubmits]);
    }
}