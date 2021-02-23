   
function lineChart(svgID, pathToCSV, chartNum) {
    let svg = d3.select(svgName)
    setup(svg, 500, 500)
    makeLineChart(svg, 410, 460, 20, 100, csvName, chartNum)
}

    // Set the dimensions and margins of the svg for the graph
    function setup(svg, w, h) {
        let margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

        svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    }

    // In the given svg, make a line chart of the given width and height.
    // The chart has axes with from 0 to xRange and yRange
    // and reads data from the given file for the given chart number in [0,29]
    function makeLineChart(svg, width, height, xRange, yRange, fileName, chartNum) {
    d3.csv(fileName).then(
        function (data) {
            let cols = data.columns
            let xVals = d3.range(1,21)    // X values for 20-point dataset
            let colsAndMarks = getColsMarksNumSets(chartNum)
            let yCols = colsAndMarks[0]
            let marks = colsAndMarks[1]
            let numDataSets = colsAndMarks[2]
            let xToMark = colsAndMarks[3]

            // Add X axis
            let x = d3.scaleLinear()
                .domain([0, xRange])
                .range([30, width]);

            let xAxis = d3.axisBottom(x)
            xAxis.tickValues([0, xToMark, xRange])

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, yRange])
                .range([height, 30]);

            let yAxis = d3.axisLeft(y)
            yAxis.tickValues([0, yRange/2, yRange])

            svg.append("g")
                .attr("transform", "translate(30,0)")
                .call(yAxis);

            color = ['#d95f02', '#1b9e77', '#7570b3', '#e7298a', '#66a61e', '#386cb0']

            // Add legend with appropriately-colored circles
            svg.append("circle").attr("cx",440).attr("cy",110).attr("r", 6).style("fill", color[marks[0] % numDataSets])
            svg.append("circle").attr("cx",440).attr("cy",130).attr("r", 6).style("fill", color[marks[1] % numDataSets])
            svg.append("text").attr("x", 450).attr("y", 110).text("Set A").style("font-size", "15px").attr("alignment-baseline","middle")
            svg.append("text").attr("x", 450).attr("y", 130).text("Set B").style("font-size", "15px").attr("alignment-baseline","middle")

            // Add lines to chart
            for (i = 0; i < numDataSets; i++) {
                let counter = -1
                svg.append('path')
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", color[i])
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line()
                        .x(function (d) {
                            counter += 1
                            return x(xVals[counter])
                        })
                        .y(function (d) {
                            return y(d[cols[yCols[i]]])
                        })
                    )
            }
        })
}

    // Expects a chart number in range [0,29] where:
    // 0-9 are 2-dataset charts; 10-19 are 4-dataset charts; 20-29 are 6-dataset charts
    // Returns an array in the format: [columnNumbers MarkColumnNumbers NumDatasets, xTickVal]
    // columnNumbers = array of indices of columns in [0,119] that contain the datasets for this chart
    // MarkColumnNumbers = array with the column indices in [0,119] of the two datasets to pay attention to
    // NumDatasets = the number of datasets in this chart
    // xTickVal = the x value to mark on the chart
    function getColsMarksNumSets(chartNum) {
    let numSets = (Math.floor(chartNum / 10) + 1) * 2
    let cols = [], mark = []
    if (chartNum < 10) {
    cols = [2 * chartNum, 2 * chartNum + 1]
    mark = [...cols]
}
    else if (chartNum < 20) {
    let i = chartNum - 10
    cols = [20 + 4 * i, 21 + 4 * i, 22 + 4 * i, 23 + 4 * i]
    mark = [20 + 4 * i, 21 + 4 * i + chartNum % 3]
}
    else {
    let i = chartNum - 20
    cols = [60 + 6 * i, 61 + 6 * i, 62 + 6 * i, 63 + 6 * i, 64 + 6 * i, 65 + 6 * i]
    mark = [60 + 6 * i, 61 + 6 * i + chartNum % 5]
}
    return [cols,mark, numSets, chartNum % 8 + 2]    // Choose a tick value not at the very edge of the graph
}

    // Add the text to the label at the top of the page - debugging function
    function addToLabel(text) {
    let label = document.getElementById("label")
    label.appendChild(document.createElement("br"))
    label.appendChild(document.createTextNode(text))
}
