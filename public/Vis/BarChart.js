/**
 * BarChart.js
 *
 * date created: 2/20/2021
 * Author: Nicolas Fish and Benjamin M'Sadoques
 *
 * Provides the Bar chart
 */

class BarChart extends Chart
{
    /**
     * Sets the key variables used for bar charts
     * data is an array
     * @param svg d3svg
     * @param width of the chart
     * @param height of the chart
     */
    constructor(svg, width, height)
    {
        super(svg, width, height);
        this.data = [];
        this.type = "BarChart";
    }

    /**
     * Generates a new random set of data
     *  calls the super method to generate points of interest
     */
    newRandom()
    {
        super.newRandom();

        this.data = [];

        // random integers 10-90
        let random = d3.randomInt(10, 91);
        for(let i = 0; i < this.features.length; i++)
        {
            this.data[i] = random();
        }
    }

    /**
     * makes the bar chart on the svg
     */
    make()
    {
        this.svg.attr("transform", "translate(" + 25 + ", " + 5 + ")")

        // x axis
        let x = d3.scaleBand()
            .domain(this.features)
            .range([0, this.width])
            .padding(0.2);
        this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x)
                .tickValues([]))

        // y axis
        let y = d3.scaleLinear()
            .domain([0, 100])
            .range([this.height, 0]);
        this.svg.append("g")
            .call(d3.axisLeft(y)
                .tickValues([100]));

        // Bars
        for(let i = 0; i < this.features.length; i++)
        {
            this.makeBar(x, y, i)
        }

        let v1 = this.data[this.pointsOfInterest[0]];
        let v2 = this.data[this.pointsOfInterest[1]];
        this.calculateAnswer(v1, v2);
    }

    /**
     * Makes a single bar
     * @param x x axis
     * @param y y axis
     * @param i data index
     */
    makeBar(x, y, i)
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

        if((i === this.pointsOfInterest[0]) || (i === this.pointsOfInterest[1]))
        {
            this.svg.append("circle")
                .attr("cx", x(this.features[i]) + x.bandwidth() / 2)
                .attr("cy", this.height - 15)
                .attr("r", 8)
                .attr("fill", "black");
        }
    }
}