console.log(d3); // test if d3 is loaded

//window.onload=drawBarChart();
window.onload = startPage();

const csvRows = [["Type", "Smaller", "Larger", "Actual Ratio", "Guess Ratio"]];

var tempData;

var numSubmits = 0;

// This is the number of total questions, this number divided by 3 gives the number of each chart type that will display
var maxSubmits = 60;

// SVG dimensions
var SVGWidth = 500;
var SVGHeight = 600;

// Create a div for the SVG to be placed into
var svgdiv = document.createElement("div");
svgdiv.classList.add("svgdiv");

// Hide the svg div initially so that it doesn't make the start screen take up twice the view height
svgdiv.style.display = 'none';
document.body.appendChild(svgdiv);
svgdiv.id = "svgdiv";
var svg = d3.select("#svgdiv")
    .append("svg")
    .attr("width", SVGWidth)
    .attr("height", SVGHeight);

// Array of instructions to determine which chart should be displayed next
// 0: bar chart, 1: pie chart, 2: stacked bar chart
const randArray = [];
var randArrayLength = maxSubmits;

// Initialize the array of instructions to be 1/3 0, 1/3 1, and 1/3 2
for (var i = 0; i < randArrayLength; i++) {
    if (i < randArrayLength / 3) {
        randArray[i] = 0;
    } else if (i < ((randArrayLength / 3) * 2)) {
        randArray[i] = 1;
    } else {
        randArray[i] = 2;
    }
}

// Helper function to randomize the array of instructions
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

// Shuffles the array of instructions
shuffleArray(randArray);

// Function to load the proper chart next based on instructions
function drawNextChart(num) {
    if (num == 0) {
        drawBarChart();
    } else if (num == 1) {
        drawPieChart();
    } else if (num == 2) {
        drawStackedChart();
    }
}