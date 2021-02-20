function getRandomArray(n) {
	let arr = [];
	for (let i = 0; i < n; i++) { 
		arr.push(Math.random());
	}
	return arr;
}

function getColor(a) {
    if (Boolean(a)) { return 'teal'; }
    return 'purple';
}

function generateBarChart(minplots = 5, maxplots = 5) {

    // Using same code as N'yoma, we could just put this in a function and all use it
    let plotcount = Math.floor(Math.random() * 6) + minplots;
	let firstInd = Math.floor(Math.random() * plotcount);
	let targets = [firstInd, firstInd];
	while (targets[0] == targets[1]) {
		targets[1] = Math.floor(Math.random() * plotcount);
	}
    data = getRandomArray(plotcount);

    colors = [];
    for (var i = 0; i < plotcount; i++) {
        data[i] = Math.floor(data[i] * 100) + 10;
        if(i == targets[0] || i == targets[1]) {
            colors.push(getColor(false));
        } else {
            colors.push(getColor(true));
        }
    }

    d3.select("body").selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("background-color", function(d, i) { return colors[i]})
    .style("height", function(d) {
        return d*2 + "px";
    });

    selectedData = [data[targets[0]], data[targets[1]]];
    return selectedData;
}

generateBarChart();