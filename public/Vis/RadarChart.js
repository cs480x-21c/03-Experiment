/**
 * RadarChart.js
 *
 * date created: 2/20/2021
 * Author: Nicolas Fish and Benjamin M'Sadoques
 *
 * Provides the Radar chart
 */

class RadarChart extends Chart
{
    /**
     * Sets the key variables used for radar charts
     * data is an object
     * @param svg d3svg
     * @param width of the chart
     * @param height of the chart
     */
    constructor(svg, width, height)
    {
        super(svg, width, height);
        this.data = {};
        this.type = "RadarChart";
    }

    /**
     * Generates a new random set of data
     *  calls the super method to generate points of interest
     */
    newRandom()
    {
        super.newRandom();

        this.data = {};

        // random integers 10-90
        this.features.forEach(p => this.data[p] = d3.randomInt(10, 91)());
    }

    /**
     * makes the Radar Chart on the svg
     */
    make()
    {
        // radius scale
        let radScale = d3.scaleLinear()
            .domain([0,100])
            .range([0,this.width/2 -50]);

        this.makeBackGroundCircle(radScale)

        // draw path
        let line = d3.line().x(d => d.x).y(d => d.y);

        let coordinates = [];
        for (let i = 0; i < this.features.length; i++)
        {
            let angle = (Math.PI / 2) + (2 * Math.PI * i / this.features.length);
            let value = this.data[this.features[i]];
            coordinates.push(this.angleToCoordinate(angle, value, radScale));
        }

        this.svg.append("path")
            .datum(coordinates)
            .attr("d", line)
            .attr("fill", "grey")

        //draw feature lines
        for (let i = 0; i < this.features.length; i++)
        {
            this.makeRadarSpike(i, radScale);
        }

        let radarArray = Object.keys(this.data).map(i => this.data[i]);
        let v1 = radarArray[this.pointsOfInterest[0]];
        let v2 = radarArray[this.pointsOfInterest[1]];
        this.calculateAnswer(v1, v2);
    }

    /**
     * Makes the background circle for the radar chart
     * @param radScale linear circle scale, used to control the pixel placement
     */
    makeBackGroundCircle(radScale)
    {
        // circle
        this.svg.append("circle")
            .attr("cx", this.width/2)
            .attr("cy", this.height/2)
            .attr("fill", "grey")
            .attr("opacity", 0.5)
            .attr("r", radScale(100));

        this.svg.append("text")
            .attr("x", this.width/2 + 10)
            .attr("y", this.height/2 - radScale(100))
            .text("100");
    }

    /**
     * Converts an angle to coordinates
     * @param angle to convert
     * @param value at that angle
     * @param radScale linear circle scale, used to control the pixel placement
     * @returns {{x: number, y: number}}
     */
    angleToCoordinate(angle, value, radScale)
    {
        let x = Math.cos(angle) * radScale(value);
        let y = Math.sin(angle) * radScale(value);
        return {"x": this.width/2 + x, "y": this.height/2 - y};
    }

    /**
     * Makes a single radar spike
     * @param i data index
     * @param radScale linear circle scale, used to control the pixel placement
     */
    makeRadarSpike(i, radScale)
    {
        let angle = (Math.PI / 2) + (2 * Math.PI * i / this.features.length);
        let featureLine = this.angleToCoordinate(angle, 100, radScale);
        this.svg.append("line")
            .attr("x1", this.width/2)
            .attr("y1", this.height/2)
            .attr("x2", featureLine.x)
            .attr("y2", featureLine.y)
            .attr("stroke","black");

        if((i === this.pointsOfInterest[0]) || (i === this.pointsOfInterest[1]))
        {
            let value = this.data[this.features[i]];
            let point = this.angleToCoordinate(angle, value, radScale);
            this.svg.append("circle")
                .attr("cx", point.x)
                .attr("cy", point.y)
                .attr("fill", "black")
                .attr("r", radScale(3));
        }
    }
}