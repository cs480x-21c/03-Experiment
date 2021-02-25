
let gVisArray = [];
let gVisIndex = 0;
let gTrialIndex = 0;
// const TRIALS = 20;
const TRIALS = 2;

let notFirstTrial = false;

let gResults;

function main()
{
    const margin = {top: 10, right: 10, bottom: 10, left: 10};
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Svg is used to make all the chart types
    let svg = d3.select("#vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // idk if we need these
    var xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.left, width]);

    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.bottom, height]);

    // Create vis to test
    gVisArray.push(new BarChart(svg, width, height));
    gVisArray.push(new RadarChart(svg, width, height));
    gVisArray.push(new TreeMap(svg, width, height));

    // Create a new results instance for this trial
    gResults = new ResultsController();

    // First test (the form leads to new tests)
    makeNewChart();
}

function makeNewChart()
{
    if(notFirstTrial === true)
    {
        let answer = document.getElementById("answer").value;
        console.log(answer);
        if(answer === '')
        {
            document.getElementById("answer").style.backgroundColor = "red";
            return;
        }
    }

    // Check if the vis index needs to be reset
    if (gVisIndex === gVisArray.length)
    {
        gVisIndex = 0;

        if (gTrialIndex === TRIALS)
        {
            // TODO: end test somehow
            // Saves the result
            gResults.saveResult();
        }
        else
        {
            gTrialIndex++;
        }
    }

    // make the new vis with the current index
    let vis = gVisArray[gVisIndex];

    // first trial will not have an input
    if (notFirstTrial)
    {
        // Fetch answer and enter the result
        let answer = document.getElementById("answer").valueAsNumber;
        gResults.enterResult(vis.type, vis.answer, answer);
    }

    notFirstTrial = true;

    // remove current vis
    vis.remove();

    // make the new vis with random values and make
    vis.newRandom();
    vis.make();

    // Clear answer field
    document.getElementById("answer").value = '';

    gVisIndex++;
}

// new chart on enter
window.onkeypress = function(event) 
{
    if(event.key)
    {
        document.getElementById("answer").style.backgroundColor = "";
    }

    if (event.key === 'Enter') 
    {
        makeNewChart();
    }
 }
