function drawStackedChart() {
    d3.selectAll("svg > *").remove();

    var data = [];
    var numDataPoints = 0;
    var maxDataPoints = 9;
    while (numDataPoints < maxDataPoints) {
        var newNumber = Math.random();
        if (newNumber > 0.1) {
            data.push(newNumber);
            numDataPoints++;
        }
    }

    var prev_width = [0,
        data[0],
        data[0] + data[1],
        data[0] + data[1] + data[2],
        data[0] + data[1] + data[2] + data[3],
        data[0] + data[1] + data[2] + data[3] + data[4],
        data[0] + data[1] + data[2] + data[3] + data[4] + data[5],
        data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6],
        data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6] + data[7]
    ];

    var barWidth = 60;
    var padding = 5;
    var barx = SVGWidth / 2 - barWidth / 2

    // Add the stacked bar chart to svg
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', barWidth)
        .attr('x', barx)
        .attr('fill', 'white')
        .style('stroke', 'black')
        .style('stroke-width', 3)
        .attr('y', function (d, i) {
            return prev_width[i] * 75 + padding;
        })
        .attr('height', function (d) {
            return d * 75;
        });


    // Get index of bars that the two dots are next to
    var twoDots = [];
    while (twoDots.length < 2) {
        var dotIndex = Math.floor(Math.random() * maxDataPoints);
        if (twoDots.length == 1 && twoDots[0] != dotIndex) {
            twoDots[1] = dotIndex;
        } else if (twoDots.length == 0) {
            twoDots[0] = dotIndex;
        }
    }

    var temp1 = twoDots[0];
    var temp2 = twoDots[1];

    // Make sure twoDots[0] is always the smaller value of the two
    twoDots[0] = Math.min(temp1, temp2);
    twoDots[1] = Math.max(temp1, temp2);

    // Info of bars that the two dots are next to (dot 0 will always be the smaller bar)
    bar0cell = prev_width[twoDots[0]] * 75 + padding;
    bar0nextCell = prev_width[twoDots[0] + 1] * 75 + padding;
    bar0y = bar0nextCell - (bar0nextCell - bar0cell) / 2;

    bar1cell = prev_width[twoDots[1]] * 75 + padding;
    var bar1nextCell;

    // Find space in between the bars to find the center
    if (twoDots[1] == 8) {
        bar1nextCell = bar1cell + data[8] * 75;
    } else {
        bar1nextCell = prev_width[twoDots[1] + 1] * 75 + padding;
    }

    bar1y = bar1nextCell - (bar1nextCell - bar1cell) / 2;

    // Draw dots
    svg.append('circle')
        .attr("cx", barx - 10)
        .attr("cy", bar0y)
        .attr("r", 5)
        .style("fill", "black");
    svg.append('circle')
        .attr("cx", barx - 10)
        .attr("cy", bar1y)
        .attr("r", 5)
        .style("fill", "black");

    console.log("Dot 0 index: " + twoDots[0]);


    var smallerStack = Math.min(data[twoDots[0]], data[twoDots[1]]);
    var largerStack = Math.max(data[twoDots[0]], data[twoDots[1]]);

    smallerStack = smallerStack.toFixed(4);
    largerStack = largerStack.toFixed(4);

    // Find ratio of bar heights
    var ratio = Math.round((smallerStack / largerStack) * 100000) / 100000;

    // Queue the stacked bar chart data for pushing to csv content
    tempData = ["Stacked", smallerStack, largerStack, ratio];

}