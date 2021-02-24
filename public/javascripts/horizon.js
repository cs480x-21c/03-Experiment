// import "https://unpkg.com/d3-horizon-chart"
// http://kmandov.github.io/d3-horizon-chart/


// Add the text to the label at the top of the page - debugging function
function addToLabel(text) {
    let label = document.getElementById("label")
    label.appendChild(document.createElement("br"))
    label.appendChild(document.createTextNode(text))
}

function makeChart(svgID, width, height, xRange, yRange, fileName, chartNum) {

    // Returns an array in the format: [columnNumbers, MarkColumnNumbers, NumDatasets, xTickVal]
    colsMarksNumSetsX = getColsMarksNumSets(chartNum)
    colNums = colsMarksNumSetsX[0];
    numSets = colsMarksNumSetsX[2];

    const margin = { top: 20, right: 10, bottom: 0, left: 10 };
    const w = width - margin.left - margin.right,
        h = 50 - margin.top - margin.bottom;

    const g = d3.select(svgID)
        .attr("width", 0)
        .attr("height", 0)

    const a = d3.select('#h-axis')
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    let x = d3.scaleLinear()
        .domain([1, xRange])
        .range([0, w]);

    d3.select('#chart-container').attr('height', 100*colsMarksNumSetsX[2])

    let xAxis = d3.axisBottom(x)
    xAxis.tickValues([1, colsMarksNumSetsX[3], xRange])

    a.append("g")
        .attr("transform", "translate(0," + 0 + ")")
        .call(xAxis);

    d3.csv(fileName).then(
        function (data) {
            let cols = data.columns;
            let yCols = colNums;
            var series = [];
            for (var i = 0; i < numSets; i++) {
                series.push(data.map(function (d) {
                    return parseFloat(d[cols[yCols[i]]])
                }))
            }

            var horizonChart = d3.horizonChart()
                .height(height / 6)
                .step(width / xRange)
                .extent([0, yRange])
                .colors(['#313695', '#4575b4', '#74add1', '#abd9e9',
                    '#fee090', '#fdae61', '#f46d43', '#d73027']);

            var horizons = d3.select('#chart-container').selectAll('.horizon')
                .data(series)
                .enter().append('div')
                .attr('class', 'horizon')
                .each(function (d, i) {
                    if (i === 0) {
                        horizonChart.title('Dataset A')
                            .call(this, d);
                    } else if (i === colsMarksNumSetsX[1][1] - colsMarksNumSetsX[1][0]) {
                        horizonChart.title('Dataset B')
                            .call(this, d);
                    }
                    else {
                        horizonChart.title('').call(this, d);
                    }
                });

            // mark only the two of interest (the first and then colsMarksNumSetsX[1][1] )
        })
}


