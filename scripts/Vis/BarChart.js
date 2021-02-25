
class BarChart extends Chart
{

    constructor(svg, width, height)
    {
        super(svg, width, height);
<<<<<<< HEAD:Vis/BarChart.js
        this.name = "BarChart";
        this.features = ["A","B","C","D","E","F","G"];
        this.data = [];
        this.pointsOfIntrest = [];
=======
        this.type = "BarChart";
>>>>>>> e8a59fffd22468a8534583c7154efe159eaa5e3d:scripts/Vis/BarChart.js
    }

    newRandom()
    {
        // random integers 10-90
        for(var i = 0; i < this.features.length; i++)
        {
            this.data[i] = Math.floor(10 + Math.random() * 80);
        }

<<<<<<< HEAD:Vis/BarChart.js
        // select points of intrest
        let point1 = Math.floor(Math.random() * (this.features.length - 1))
        let point2 = point1 + Math.floor(1 + Math.random() * (this.features.length - 2))
        if(point2 > this.features.length - 1) point2 -= this.features.length;
        this.pointsOfIntrest = [point1, point2]
=======


>>>>>>> e8a59fffd22468a8534583c7154efe159eaa5e3d:scripts/Vis/BarChart.js
    }

    make()
    {

<<<<<<< HEAD:Vis/BarChart.js
        this.svg.attr("transform", "translate(" + 25 + ", " + 5 + ")")

        // x axis
        var x = d3.scaleBand()
            .domain(this.features)
            .range([0, this.width])
            .padding(0.2);
        this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x)
            .tickValues([]))

        // y axis
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([this.height, 0]);
        this.svg.append("g")
            .call(d3.axisLeft(y)
            .tickValues([100]));

        // Bars
        for(var i = 0; i < this.features.length; i++)
        {
            this.svg.append("rect")
                .attr("x", x(this.features[i]))
                .attr("y", y(this.data[i]))
                .attr("height", this.height - y(this.data[i]))
                .attr("width", x.bandwidth())
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2.5)
                .attr("opacity", 0.8);
            
            if(i === this.pointsOfIntrest[0] || i === this.pointsOfIntrest[1])
            {
                this.svg.append("circle")
                    .attr("cx", x(this.features[i]) + x.bandwidth() / 2)
                    .attr("cy", this.height + 6)
                    .attr("r", 8)
                    .attr("fill", "black");
            }
        }
=======

        this.answer = 0;
>>>>>>> e8a59fffd22468a8534583c7154efe159eaa5e3d:scripts/Vis/BarChart.js
    }

    check(answer)
    {

    }
}