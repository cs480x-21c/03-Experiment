
let gVisArray = [];
let gVisIndex = 0;
let gTrialIndex = 0;
const TRIALS = 20;

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

    // Create new results file for this trial

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
        }
        else
        {
            gTrialIndex++;
        }
    }
    else
    {
        console.log("S");

        // TODO: gets the answer and submits it
        //  vis is made, unless this is the first time
        let vis = gVisArray[gVisIndex];

        vis.remove();

        // make the new vis with random values and make
        vis.newRandom();
        vis.make();

        gVisIndex++;
    }
}
