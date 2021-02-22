function generateBarChart(minplots = 5, maxplots = 10) {
	let plotcount = Math.floor(Math.random() * (maxplots+1-minplots)) + minplots;
	let firstInd = Math.floor(Math.random() * plotcount);
	let targets = [firstInd, firstInd];
	while (targets[0] == targets[1]) {
		targets[1] = Math.floor(Math.random() * plotcount);
	}

	// set the dimensions and margins of the graph
	let margin = {top: 25, right: 25, bottom: 25, left: 25};
	let width = (75*plotcount) - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	let svg = d3.select("#plot")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// create data
	let sumstat = getRandomArray(plotcount);

	let y = d3.scaleLinear()
	  .domain([-0.05,1])
	  .range([height, 0]);

	svg.call(d3.axisLeft(y).tickFormat("").tickSize(0)); 

	let x = d3.scaleLinear()
		.domain([0,plotcount-1])
		.range([0, width+25]); //this is a total hack lol
	svg.append("g") 
	   .attr("transform", "translate(0," + height + ")")
	   .call(d3.axisBottom(x).tickFormat("").tickSize(0))

	x = d3.scaleLinear()
		.domain([0,plotcount-1])
		.range([50, width]);

	var boxWidth = 50
	svg.selectAll("boxes")
		.data(sumstat)
		.enter()
		.append("rect")
			.attr("x", d => x(sumstat.indexOf(d))-boxWidth/2 )
			.attr("y", d => height-y(d) )
			.attr("height", d => y(d) )
			.attr("width", boxWidth )
			.attr("stroke", "black")
			.style("fill", 'white' );
		
	svg.selectAll('selectionDots')
		.data([sumstat[targets[0]], sumstat[targets[1]]])
		.enter()
		.append("circle")
			.attr("cx", d => x(sumstat.indexOf(d)) )
			.attr("cy", height-15 )
			.attr("r", 5 )
			.style("fill", 'black' );

	return {
		max: Math.max(sumstat[targets[0]], sumstat[targets[1]]), 
		min: Math.min(sumstat[targets[0]], sumstat[targets[1]])
	};
}
