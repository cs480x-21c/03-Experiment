function getRandomArray(n) {
	let arr = [];
	for (let i = 0; i < n; i++) { 
		arr.push(Math.random());
	}
	return arr;
}

const minplots = 5;
const maxplots = 10;

let plotcount = Math.floor(Math.random() * (maxplots+1-minplots)) + minplots;
let firstInd = Math.floor(Math.random() * plotcount);
let targets = [firstInd, firstInd];
while (targets[0] == targets[1]) {
	targets[1] = Math.floor(Math.random() * plotcount);
}

console.log(targets);


// set the dimensions and margins of the graph
let margin = {top: 10, right: 30, bottom: 30, left: 40};
let width = (75*plotcount) - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#boxplot")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// create data
let dataset = [];
for (let i = 0; i < plotcount; i++) {
	dataset.push(getRandomArray(5));
}

let c = 0

var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
	.key(() => c++)
	.rollup(function(d) {
		let sorted = d[0].sort(d3.ascending);
		let q1 = d3.quantile(sorted, .25);
		let median = d3.quantile(sorted, .5);
		let q3 = d3.quantile(sorted, .75);
		let min = sorted[0];
		let max = sorted[sorted.length-1];
		return({q1: q1, median: median, q3: q3, min: min, max: max})
	})
	.entries(dataset)

console.log(sumstat)


let y = d3.scaleLinear()
  .domain([0,1])
  .range([height, 0]);
svg.call(d3.axisLeft(y)); //TODO: get vertical axis line


let x = d3.scaleLinear()
	.domain([0,plotcount-1])
	.range([50, width]);
//svg.append("g") //TODO: Get bottom axis line
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))


// Show the main vertical line
svg.selectAll("vertLines")
	.data(sumstat)
	.enter()
	.append("line")
		.attr("x1", d => x(d.key) )
		.attr("x2", d => x(d.key) )
		.attr("y1", d => y(d.value.min) )
		.attr("y2", d => y(d.value.max) )
		.attr("stroke", "black")
		.style("width", 40)


// rectangle for the main box
var boxWidth = 50
svg.selectAll("boxes")
	.data(sumstat)
	.enter()
	.append("rect")
		.attr("x", d => x(d.key)-boxWidth/2 )
		.attr("y", d => y(d.value.q3) )
		.attr("height", d => y(d.value.q1)-y(d.value.q3) )
		.attr("width", boxWidth )
		.attr("stroke", "black")
		.style("fill", function(d) {
			return targets.includes(parseInt(d.key)) ? 'gray' : 'white' 
		} );


// Show the median
svg.selectAll("medianLines")
	.data(sumstat)
	.enter()
	.append("line")
   	.attr("x1", d => x(d.key)-boxWidth/2 )
   	.attr("x2", d => x(d.key)+boxWidth/2 )
   	.attr("y1", d => y(d.value.median) )
   	.attr("y2", d => y(d.value.median) )
   	.attr("stroke", "black")
   	.style("width", 80)

// Show the max
svg.selectAll("minLines")
	.data(sumstat)
	.enter()
	.append("line")
   	.attr("x1", d => x(d.key)-boxWidth/2 )
   	.attr("x2", d => x(d.key)+boxWidth/2 )
   	.attr("y1", d => y(d.value.max) )
   	.attr("y2", d => y(d.value.max) )
   	.attr("stroke", "black")
   	.style("width", 80)

// Show the min
svg.selectAll("medianLines")
	.data(sumstat)
	.enter()
	.append("line")
   	.attr("x1", d => x(d.key)-boxWidth/2 )
   	.attr("x2", d => x(d.key)+boxWidth/2 )
   	.attr("y1", d => y(d.value.min) )
   	.attr("y2", d => y(d.value.min) )
   	.attr("stroke", "black")
   	.style("width", 80)

/*
// a few features for the box
let center = 200;
let bwidth = 100;

// Show the main vertical line
svg.append("line")
	.attr("x1", center)
	.attr("x2", center)
	.attr("y1", y(min) )
	.attr("y2", y(max) )
	.attr("stroke", "black");

// Show the box
svg.append("rect")
	.attr("x", center - bwidth/2)
	.attr("y", y(q3) )
	.attr("height", (y(q1)-y(q3)) )
	.attr("width", bwidth )
	.attr("stroke", "black")
	.style("fill", "#69b3a2");

// show median, min and max horizontal lines
svg.selectAll("toto")
	.data([min, median, max])
	.enter()
	.append("line")
		.attr("x1", center-bwidth/2)
		.attr("x2", center+bwidth/2)
		.attr("y1", function(d) {  return(y(d))} )
		.attr("y2", function(d) {  return(y(d))} )
		.attr("stroke", "black");
*/
