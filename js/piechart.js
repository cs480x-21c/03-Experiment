function getRandomArray(n) {
	let arr = [];
	for (let i = 0; i < n; i++) { 
		arr.push(Math.random());
	}
	return arr;
}

function getRandomColors(n) {
	function getRandomArray(arr) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled;
}
	let arr = [];
	for (let i = 0; i < n; i++) { 
		if(i < 2){
			arr.push("#000000");
		}
		else{
			arr.push("#ffffff");
		}
	}
	return getRandomArray(arr);
}

function generatePieChart(minplots = 5, maxplots = 5){
	let plotcount = Math.floor(Math.random() * 6) + minplots;
	let firstInd = Math.floor(Math.random() * plotcount);
	let targets = [firstInd, firstInd];
	while (targets[0] == targets[1]) {
		targets[1] = Math.floor(Math.random() * plotcount);
	}
    data = getRandomArray(plotcount);
    colors = getRandomColors(plotcount);

    small = 0;
    large = 0;
    for (let i = 0; i < plotcount; i++) { 
		if(colors[i].localeCompare("#000000")==0){
			console.log(data[i]);
			if(small == 0){
				small = data[i];
			}
			else{
				if(data[i] > small){
					large = data[i];
				}
				else{
					large = small;
					small = data[i];
				}
			}
		}
	}
	console.log(small/large);
    let width = 450
    	height = 450
    	margin = 40
    var radius = Math.min(width, height) / 2 - margin


    // append the svg object to the div called 'my_dataviz'
var svg = d3.select("#piechart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))



var color = d3.scaleOrdinal()
  .domain(data)
  .range(colors)

svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)



}

generatePieChart();