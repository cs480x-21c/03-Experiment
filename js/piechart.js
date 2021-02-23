function getRandomArray(n) {
	let arr = {};
	for (let i = 0; i < n; i++) {
		arr["" + i + ""] = Math.max(Math.random(), 0.05);
	}
	return arr;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getTwo(n) {
	let arr = [];
	arr.push(getRandomInt(n));
	let second = getRandomInt(n);
	while (second == arr[0]) {
		second = getRandomInt(n);
	}
	arr.push(second);
	return arr;
}

function generatePieChart(minplots = 5, maxplots = 5) {
	let plotcount = getRandomInt(5) + minplots;
	let firstInd = Math.floor(Math.random() * plotcount);
	let targets = [firstInd, firstInd];
	while (targets[0] == targets[1]) {
		targets[1] = Math.floor(Math.random() * plotcount);
	}
	let data = getRandomArray(plotcount);
	// console.log(data);
	let color_map = ["#000000", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7", "#FFFFFF"];
	let colors = color_map.slice(0, plotcount);
	let random = getTwo(plotcount);
	let small = 0;
	let large = 0;

	let smallIndex;
	if (data[random[0]] > data[random[1]]) {
		large = data[random[0]]
		small = data[random[1]]	
		smallIndex = 1;
	} else {
		large = data[random[1]]
		small = data[random[0]]
		smallIndex = 0;
	}
	let width = 450
	let height = 500
	let margin = 40
	var radius = Math.min(width, height) / 2 - margin


	var svg = d3.select("#plot")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var lab = d3.select("#plot")
		.append("lab")


	// Compute the position of each group on the pie:
	var pie = d3.pie()
		.value(function (d) {
			return d.value;
		})
		.sort(function(a, b){return d3.ascending(a.key, b.key);})

	var data_ready = pie(d3.entries(data));

	var color = d3.scaleOrdinal()
		.domain(data)
		.range(colors)

	svg.selectAll('whatever') // lol
		.data(data_ready)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.innerRadius(0)
			.outerRadius(radius)
		)
		.attr('fill', function (d) {
			return (color(d.data.key))
		})
		.attr("stroke", "black")
		.style("stroke-width", "1.5px")
		.style("opacity", 1)


	svg.append("g")
   	.attr("transform", "translate(" + (width / 2 - 335) + "," + 220 + ")")
   	.append("text")
   	.text("Slice one:")
   	.attr("font-weight", "bold")

   	svg.append("g")
   	.attr("transform", "translate(" + (width / 2 - 215) + "," + 220 + ")")
   	.append("text")
   	.text("Slice two:")
   	.attr("font-weight", "bold")

   	svg.append('circle')
   	 .attr('cx', -23)
  .attr('cy', 215)
  .attr('r', 15)
  .attr('stroke', 'black')
  .attr('fill', colors[random[smallIndex]]);
   	svg.append('circle')
   	 .attr('cx', 96)
  .attr('cy', 215)
  .attr('r', 15)
  .attr('stroke', 'black')
  .attr('fill', colors[random[1-smallIndex]]);
		return {
		max: large,
		min: small
	};

}
