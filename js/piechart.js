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
	let plotcount = Math.floor(Math.random() * 6) + minplots;
	let firstInd = Math.floor(Math.random() * plotcount);
	let targets = [firstInd, firstInd];
	while (targets[0] == targets[1]) {
		targets[1] = Math.floor(Math.random() * plotcount);
	}
	data = getRandomArray(plotcount);
	color_map = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
	color_names_map = ["blue", "orange", "green", "red", "purple", "brown", "pink", "grey", "yellow", "teal"];
	colors = color_map.slice(0, plotcount);
	color_names = color_names_map.slice(0, plotcount);
	random = getTwo(plotcount);
	// console.log(data);
	small = 0;
	large = 0;

	if (data[random[0]] > data[random[1]]) {
		large = data[random[0]]
		small = data[random[1]]	
	} else {
		large = data[random[1]]
		small = data[random[0]]
	}
	// console.log(color_names[random[0]]);
	// console.log(color_names[random[1]]);
	// console.log(small / large);
	let width = 450
	height = 500
	margin = 40
	var radius = Math.min(width, height) / 2 - margin


	// append the svg object to the div called 'my_dataviz'
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
		.style("stroke-width", "2px")
		.style("opacity", 0.7)

	var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height + ")");

	svg.append("g")
   	.attr("transform", "translate(" + (width / 2 - 350) + "," + 210 + ")")
   	.append("text")
   	.text("Target slices: " + color_names[random[0]] + " and " + color_names[random[1]])
   	.attr("font-weight", "bold")
		return {
		max: large,
		min: small
	};

}
