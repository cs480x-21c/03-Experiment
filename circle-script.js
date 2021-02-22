    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 460 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        innerRadius = 100,
        outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border
    
    // append the svg object to the body of the page
    var svg = d3.select("#circle-bar")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + ( height/2+100 )+ ")"); // Add 100 on Y translation, cause upper bars are longer

    var participant = 0
    var trialNumber = 0
    var vis = 0 
    var truePercent = 0
    var reportedPercent = 0 

    function loadGraph(){

      var xArray=[]
      var numberOfGraphs = 5
      for(var i=0; i<numberOfGraphs;i++){
        xArray[i]={i:""+i+"", height: Math.round(Math.random()*10000+100) }
      }  

      //selecting the two random bars
      var bar1 = Math.floor(Math.random()*5)
      var bar2 = Math.floor(Math.random()*5)

      while (bar2 == bar1){
        bar2 = Math.floor(Math.random()*5)
      }
      console.log(bar1,bar2)

      var barMax = Math.max(xArray[bar1].height,xArray[bar2].height)
      var barMin = Math.min(xArray[bar1].height,xArray[bar2].height)
      var actualDifference = (barMin/barMax)*100
      console.log(barMax + "   "+ barMin+ "  "+ actualDifference)
      truePercent = actualDifference

      console.log(xArray)
        // X scale
      var x = d3.scaleBand()
          .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
          .align(0)                
          .domain(xArray.map(function(d){return(d.i)})); // The domain of the X axis is the list of states.
    
        // Y scale
      var y = d3.scaleRadial()
          .range([innerRadius, outerRadius])   // Domain will be define later.
          .domain([0, 10000]); // Domain of Y is from 0 to the max seen in the data
    
        svg.append("g")
        .selectAll("path")
        .data(xArray)
        .enter()
        .append("path")
        .attr("fill", "#ffffff")
        .attr("stroke", "black")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d) {return (y((d.height)))})
            .startAngle(function(d) { return(x(d.i)); })
            .endAngle(function(d) { return( x(d.i)+ x.bandwidth()) })
            .padAngle(0.01)
            .padRadius(innerRadius))
            //setting up the bar marker  
      var bars = [bar1, bar2]
      for (var i=0; i<2;i++){ 
        currentBar = bars[i]
      svg.append("g")
      .selectAll("g")
      .data(xArray)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(currentBar) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(currentBar) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.i)+10) + ",0)"; })
      .append("circle")
        .attr("fill","black")
        .attr("r",5)
        .attr("transform", function(d) { return (x(currentBar) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")
    }
  }


    const submit= function(e){
      e.preventDefault()

      var body = JSON.stringify({id: participant, trial: trialNumber, vis: vis, truePercent: truePercent, reportedPercent: reportedPercent})

      fetch('/submit',{
        method:'POST',
        body: body
      })
      .then( response=> response.json())
      .then(json=>{
          console.log(json)
      })
      svg.selectAll("*").remove()
      loadGraph()
      return false;  
    };

window.onload= function(){
  loadGraph()
  const button = document.querySelector( 'button' )
  button.onclick = submit
}
