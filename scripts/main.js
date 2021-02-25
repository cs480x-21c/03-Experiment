
let gVisArray = [];
let gVisIndex = 0;
let gTrialIndex = 0;
// const TRIALS = 20;
const TRIALS = 2;

let firstTrial = true;

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
    gResults.makeNewResult();

    // First test (the form leads to new tests)
    makeNewChart();
}

function makeNewChart()
{
    if (gVisIndex === gVisArray.length)
    {
        gVisIndex = 0;

        if (gTrialIndex === TRIALS)
        {
            // TODO: end test somehow

            console.log("SUCC");

            // Saves the result
            gResults.saveResult();
        }
        else
        {
            gTrialIndex++;
        }
    }
    else
    {
        let vis = gVisArray[gVisIndex];

        // first trial will not have an input
        if (firstTrial)
        {
            // Fetch answer and enter the result
            let answer = document.getElementById("answer").valueAsNumber;
            gResults.enterResult(vis.type, vis.answer, answer);

            firstTrial = false;
        }

        // remove current vis
        vis.remove();

        // TODO:

        // TODO: prevent accidental navigation

        // TODO: clear answer box

        // make the new vis with random values and make
        vis.newRandom();
        vis.make();

        gVisIndex++;
    }
}
