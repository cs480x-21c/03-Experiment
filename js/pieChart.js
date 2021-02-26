function drawPieChart() {

    d3.selectAll("svg > *").remove();


    // Random Dataset Method 2 (JavaScript Random Number Generation)
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

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 3;

    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })
        .sort(null);
    var data_ready = pie(d3.entries(data));

    console.log(data_ready);

    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    svg
        .selectAll('pie')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator
        )
        .attr("transform", "translate(" + SVGWidth / 2 + "," + SVGHeight / 2 + ")")
        .attr('fill', 'white')
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


    var twoDots = [];
    while (twoDots.length < 2) {
        var dotIndex = Math.floor(Math.random() * maxDataPoints);
        if (twoDots.length == 1 && twoDots[0] != dotIndex) {
            twoDots[1] = dotIndex;
        } else if (twoDots.length == 0) {
            twoDots[0] = dotIndex;
        }
    }

    /*
    x = cx + r * cos(a)
    y = cy + r * sin(a)
    */

    // Add pi/2 to the angles since a unit circle starts at East while the pie chart start drawing at North
    var dot0startAngle = data_ready[twoDots[0]].startAngle + Math.PI / 2;
    var dot0endAngle = data_ready[twoDots[0]].endAngle + Math.PI / 2;
    var dot1startAngle = data_ready[twoDots[1]].startAngle + Math.PI / 2;
    var dot1endAngle = data_ready[twoDots[1]].endAngle + Math.PI / 2;

    var dot0x = -((radius + 20) * (Math.cos(dot0endAngle - (dot0endAngle - dot0startAngle) / 2)));
    var dot0y = -((radius + 20) * (Math.sin(dot0endAngle - (dot0endAngle - dot0startAngle) / 2)));
    var dot1x = -((radius + 20) * (Math.cos(dot1endAngle - (dot1endAngle - dot1startAngle) / 2)));
    var dot1y = -((radius + 20) * (Math.sin(dot1endAngle - (dot1endAngle - dot1startAngle) / 2)));

    console.log("cos: " + Math.cos(dot0endAngle));
    console.log("sin: " + Math.sin(dot0endAngle));

    // ADD circles to pie slices
    svg.append("circle")
        .attr("r", 5)
        .attr("cx", dot0x)
        .attr("cy", dot0y)
        .attr("transform", "translate(" + SVGWidth / 2 + "," + SVGHeight / 2 + ")")
        .attr('fill', 'black')
        .attr("stroke", "black")
        .style("stroke-width", "2px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", dot1x)
        .attr("cy", dot1y)
        .attr("transform", "translate(" + SVGWidth / 2 + "," + SVGHeight / 2 + ")")
        .attr('fill', 'black')
        .attr("stroke", "black")
        .style("stroke-width", "2px");


    var dot0angle = dot0endAngle - dot0startAngle;
    var dot1angle = dot1endAngle - dot1startAngle;

    var dot0area = Math.pow(radius, 2) * (dot0angle / 2);
    var dot1area = Math.pow(radius, 2) * (dot1angle / 2);

    var smallArea = Math.min(dot0area, dot1area);
    var largeArea = Math.max(dot0area, dot1area);

    smallArea = smallArea.toFixed(4);
    largeArea = largeArea.toFixed(4)


    var ratio = Math.round((smallArea / largeArea) * 100000) / 100000;

    tempData = ["Pie", smallArea, largeArea, ratio];


}