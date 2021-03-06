function drawBarChart() {

    // Clear svg
    d3.selectAll("svg > *").remove();

    var barWidth = 50;
    var barPadding = 5;

    // Random Dataset Method 2 (JavaScript Random Number Generation)
    var data2 = [];
    var numDataPoints = 0;
    var maxDataPoints = 8;
    while (numDataPoints < maxDataPoints) {
        var newNumber = Math.random();
        if (newNumber > 0.1) {
            data2.push(newNumber);
            numDataPoints++;
        }
    }

    var twoDots = [];
    while (twoDots.length < 2) {
        var dotIndex = Math.floor(Math.random() * maxDataPoints);
        if (twoDots.length == 1 && twoDots[0] != dotIndex) {
            twoDots[1] = dotIndex;
        } else if (twoDots.length == 0) {
            twoDots[0] = dotIndex;
        }
    }

    console.log("Two dots: " + twoDots);

    console.log(data2);

    // Bar Chart
    svg.selectAll("bar")
        .data(data2)
        .enter()
        .append("rect")
        .attr('class', 'bar')
        .style('height', function (d) {
            return d * 500 + 'px';
        })
        .style('width', barWidth - barPadding)
        .attr("y", function (d) {
            return SVGHeight - d * 500 - barPadding;
        })

        .attr("transform", function (d, i) {
            var translate = [barPadding + barWidth * i, 0];
            return "translate(" + translate + ")";
        })
        .style("stroke", "black")
        .style("stroke-width", 3)
        .style("fill", "none")
    ;

    svg.append('circle')
        .attr("cx", (twoDots[0] * (barWidth)) + barWidth / 2 + barPadding / 2)
        .attr("cy", SVGHeight - 15)
        .attr("r", 10)
        .style("fill", "black");
    svg.append('circle')
        .attr("cx", (twoDots[1] * (barWidth)) + barWidth / 2 + barPadding / 2)
        .attr("cy", SVGHeight - 15)
        .attr("r", 10)
        .style("fill", "black");

    var smallerBarHeight = Math.min(data2[twoDots[0]], data2[twoDots[1]]);

    var largerBarHeight = Math.max(data2[twoDots[0]], data2[twoDots[1]]);

    // Shrink bar heights to 4 decimal places
    smallerBarHeight = smallerBarHeight.toFixed(4);
    largerBarHeight = largerBarHeight.toFixed(4);

    var ratio = Math.round((smallerBarHeight / largerBarHeight) * 100000) / 100000;

    console.log("Large dot: " + largerBarHeight);
    console.log("Smaller dot: " + smallerBarHeight);
    console.log("Ratio: " + ratio);


    tempData = ["Bar", smallerBarHeight, largerBarHeight, ratio];


}