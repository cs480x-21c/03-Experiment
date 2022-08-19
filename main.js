console.log(d3);

//datapath = "../cars_example.csv";
datapath = "https://raw.githubusercontent.com/cs480x-21c/02-DataVis-5Ways/main/cars-sample.csv"; // easy fix for CORS issue

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#scatterplot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function pointColor(manufacturer) {
    switch(manufacturer) {
        case "bmw":
            return "green";
        case "ford":
            return "blue";
        case "honda":
            return "red";
        case "mercedes":
            return "purple";
        case "toyota":
            return "orange";
        default:
            return "black";
    }
}

d3.csv(datapath).then(function(data) {
    data.MPG = parseFloat(data.MPG);
    data.Weight = parseInt(data.Weight);

    data = data.filter(function(d) {
        if (isNaN(d.MPG) || isNaN(d.Weight)) {
            return false;
        } else {
            return true;
        }
    });

    var x = d3.scaleLinear() // x axis
        .domain([1500, 5000]) // d3.max(data, function(d) { return d.Weight; })
        .range([0, width]);
    svg.append("g")
        .call(d3.axisBottom(x))
        .attr("transform", "translate(0," + height + ")");
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 5) + ")")
        .style("text-anchor", "middle")
        .text("Weight");

    var y = d3.scaleLinear() // y axis
        .domain([5, 50]) // d3.max(data, function(d) { return d.mpg; })
        .range([height, 0]);
    svg.append("g") 
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("MPG");

    var pointSize = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Weight; })])
        .range([2, 10]);

    svg.append("g") // points
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Weight); } )
            .attr("cy", function(d) { return y(d.MPG); } )
            .attr("r", function(d) { return pointSize(d.Weight); })
            .attr("fill", function(d) { return pointColor(d.Manufacturer); })
            .attr("opacity", 0.5);

    console.log(function(d) { return d.Weight; })
});

