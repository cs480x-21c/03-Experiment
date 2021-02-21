/**
 * Creates a pie chart and returns the true percent.
 */
function generatePieChart() {

    let width = 640;
    let height = 480;

    let size = (480 / 2) - 30;

    let svg = d3.select('#svg')
        .style('width', width)
        .style('height', height)

    function randomDatum() {
        return Math.floor(Math.random() * 101);
    }

    svg.selectAll('*').remove();

    let data = {
      a:  {
        num: randomDatum(),
        marked: false
      },
      b:  {
        num: randomDatum(),
        marked: false
      },
      c:  {
        num: randomDatum(),
        marked: false
      },
      d:  {
        num: randomDatum(),
        marked: false
      },
      e:  {
        num: randomDatum(),
        marked: false
      }
    };

    let attrs = ['a','b','c','d','e']

    let firstMarked = Math.floor(Math.random() * attrs.length);
    let secondMarked = Math.floor(Math.random() * attrs.length);

    while(secondMarked == firstMarked) {
      secondMarked = Math.floor(Math.random() * attrs.length);
    }

    firstMarked = attrs[firstMarked];
    secondMarked = attrs[secondMarked];

    data[firstMarked].marked = true;
    data[secondMarked].marked = true;

    let larger = Math.max(data[firstMarked].num, data[secondMarked].num);
    let smaller = Math.min(data[firstMarked].num, data[secondMarked].num);

    let truePercent = (smaller/larger) * 100;
    console.log(truePercent);

    let pie = d3.pie()
    .value(function(d) { return d.value.num; })
    let processedData = pie(d3.entries(data))

    let group = svg.append('g')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let arcCreator = d3.arc()
      .innerRadius(0)
      .outerRadius(size)

    group.selectAll('slices')
    .data(processedData)
    .enter()
    .append('path')
    .attr('d', arcCreator)
    
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', '2px');

    group.selectAll('slices')
    .data(processedData)
    .enter()
    .filter(function (d) {
      return d.data.value.marked;
    })
    .append('circle')
    .attr('r', '5px')
    .attr('fill', 'black')
    .attr('transform', function(d) { return `translate(${arcCreator.centroid(d)})`})

}

function generateBarChart() {

    var margin = {top: 30, right: 30, bottom: 30, left: 30}, width = 500, height = 500

    // set up the svg
    var svg = d3.select("#svg")
    .style("width", width)
    .style("height", height)


    // setting up the random data
    var data = []
    for(i=0; i<5 ;i++){
        data.push(Math.floor(Math.random()*101))
    }
    console.log(data)

    //selecting the two random bars
    var bar1 = Math.floor(Math.random()*5)
    var bar2 = Math.floor(Math.random()*5)

    while (bar2 == bar1){
        bar2 = Math.floor(Math.random()*4)
    }

    var barMax = Math.max(data[bar1],data[bar2])
    var barMin = Math.min(data[bar1],data[bar2])
    console.log(barMax,barMin)

    var truePercent = (barMin / barMax) * 100;

    // setting up the axes
    var x = d3.scaleLinear()
        .domain([0, 6])        
        .range([margin.left, width - margin.right]);      

    svg
    .append("g")
    .attr("transform", "translate(0,"+ (height - margin.bottom) +")")     
    .call(d3.axisBottom().scale(x).ticks(0));

    var y = d3.scaleLinear()
    .domain([0, 100])        
    .range([height - margin.bottom , margin.top]);      

    svg
    .append("g")
    .attr("transform", "translate("+ margin.left+","+ 0 +")")     
    .call(d3.axisLeft().scale(y).ticks(0));

    // setting up the bars
    svg.selectAll("bar-charts")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",function(d,i){
        return x(i+1) - 15
    })
    .attr("y",function(d){
        return y(d)
    })
    .attr("width",30)
    .attr("height",function(d){
        return height - margin.bottom - y(d)
    })
    .attr("fill", "white")
    .attr("stroke","black")

    //setting up the bar markers
    svg.append("circle")
    .attr("cx", x(bar1+1))
    .attr("cy",450)
    .attr("r",5)
    .attr("fill","black")

    svg.append("circle")
    .attr("cx", x(bar2+1))
    .attr("cy",450)
    .attr("r",5)
    .attr("fill","black")

    return truePercent;

}

function generateCircleChart() {

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 460 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        innerRadius = 100,
        outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border
    
    // append the svg object to the body of the page
    var svg = d3.select("#svg")
        .style("width", width + margin.left + margin.right)
        .style("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + ( height/2+100 )+ ")"); // Add 100 on Y translation, cause upper bars are longer

    var xArray=[]
    var numberOfGraphs = 5
    for(var i=0; i<numberOfGraphs;i++){
        xArray[i]={i:""+i+"", height: Math.round(Math.random()*10000+10) }
    }  
    console.log(xArray)
        // X scale
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing ?
        .domain(xArray.map(function(d){return(d.i)})); // The domain of the X axis is the list of states.
    
        // Y scale
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 10000]); // Domain of Y is from 0 to the max seen in the data
    
    // Add bars
    svg.append("g")
        .selectAll("path")
        .data(xArray)
        .enter()
        .append("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d) {return (y((d.height)))})
            .startAngle(function(d) { return(x(d.i)); })
            .endAngle(function(d) { return( x(d.i)+ x.bandwidth()) })
            .padAngle(0.01)
            .padRadius(innerRadius))
    
    return svg

}