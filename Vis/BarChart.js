
class BarChart extends Chart
{

    constructor(svg, width, height)
    {
        super(svg, width, height);
        this.name = "BarChart";
        this.features = ["A","B","C","D","E","F","G"];
        this.data = [];
        this.pointsOfIntrest = [];
    }

    newRandom()
    {
        // random integers 10-90
        for(var i = 0; i < this.features.length; i++)
        {
            this.data[i] = Math.floor(10 + Math.random() * 80);
        }

        // select points of intrest
        let point1 = Math.floor(Math.random() * (this.features.length - 1))
        let point2 = point1 + Math.floor(1 + Math.random() * (this.features.length - 2))
        if(point2 > this.features.length - 1) point2 -= this.features.length;
        this.pointsOfIntrest = [point1, point2]
    }

    make()
    {

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
    }

    check(answer)
    {

    }
}