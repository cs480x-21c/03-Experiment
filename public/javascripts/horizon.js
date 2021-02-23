// import "https://unpkg.com/d3-horizon-chart"
// http://kmandov.github.io/d3-horizon-chart/
function makeChart(svgID, width, height, xRange, yRange, fileName, chartNum) {

    const margin = {top: 20, right: 10, bottom: 0, left: 10};
    const w = width - margin.left - margin.right,
        h = 50 - margin.top - margin.bottom;

    const g = d3.select(svgID)
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let numSets = (Math.floor(chartNum / 10) + 1) * 2;
    let colNums = [], mark = [];
    if (chartNum < 10) {
        colNums = [2 * chartNum, 2 * chartNum + 1];
        mark = [...colNums]
    }
    else if (chartNum < 20) {
        let i = chartNum - 10;
        colNums = [20 + 4 * i, 21 + 4 * i, 22 + 4 * i, 23 + 4 * i];
        mark = [20 + 4 * i, 21 + 4 * i + chartNum % 3]
    }
    else {
        let i = chartNum - 20;
        colNums = [60 + 6 * i, 61 + 6 * i, 62 + 6 * i, 63 + 6 * i, 64 + 6 * i, 65 + 6 * i];
        mark = [60 + 6 * i, 61 + 6 * i + chartNum % 5]
    }

    // Add X axis
    let x = d3.scaleLinear()
        .domain([1, xRange])
        .range([0, w]);

    let xAxis = d3.axisBottom(x)
    xAxis.tickValues([1, 5, 10, 15, xRange])

    g.append("g")
        //.attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    d3.csv(fileName, function (data) {
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
            .extent([0,yRange])
            .colors(['#313695', '#4575b4', '#74add1', '#abd9e9',
                '#fee090', '#fdae61', '#f46d43', '#d73027']);

        var horizons = d3.select('body').selectAll('.horizon')
            .data(series)
            .enter().append('div')
            .attr('class', 'horizon')
            .each(function(d, i) {
                var j = i+1;
                horizonChart.title('Horizon chart ' + j)
                    .call(this, d);
            });
    });
}
