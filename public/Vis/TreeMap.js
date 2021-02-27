/**
 * TreeMap.js
 *
 * date created: 2/20/2021
 * Author: Benjamin M'Sadoques and Nicolas Fish
 *
 * Provides the Tree map
 */

// example: https://www.d3-graph-gallery.com/graph/treemap_json.html

class TreeMap extends Chart
{
    /**
     * Sets the key variables used for tree maps
     * data is an object that contains
     * @param svg d3svg
     * @param width of the chart
     * @param height of the chart
     */
    constructor(svg, width, height)
    {
        super(svg, width, height);
        this.data = {children: []};
        this.type = "TreeMap";
    }

    /**
     * Generates a new random set of data
     *  calls the super method to generate points of interest
     */
    newRandom()
    {
        super.newRandom();

        this.data = {children: []};

        // random integers 10-90
        let random = d3.randomInt(10, 91);
        for (let i = 0; i < this.features.length; i++)
        {
            this.data.children.push({value: random()});
        }
    }

    /**
     * makes the tree map
     */
    make()
    {
        // Here the size of each leave is given in the 'value' field in input data
        var root = d3.hierarchy(this.data).sum(function(d){return d.value})

        // Then d3.treemap computes the position of each element of the hierarchy
        d3.treemap()
            .size([this.width, this.height])
            .padding(5)
            (root)

        // use this information to add rectangles:
        this.svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("fill", "white");

        // Get the leaves that are our points of interest
        let circles = [root.leaves()[this.pointsOfInterest[0]], root.leaves()[this.pointsOfInterest[1]]];

        // Mark those leaves with our standard circles
        this.svg.selectAll("circle")
            .data(circles)
            .enter()
            .append("circle")
            .attr('cx', function (d) { return d.x0 + (d.x1 - d.x0) - 15; })
            .attr('cy', function (d) { return d.y0 + (d.y1 - d.y0) - 15; })
            .attr('r', 10)
            .style("fill", "black");

        let v1 = this.data.children[this.pointsOfInterest[0]].value;
        let v2 = this.data.children[this.pointsOfInterest[1]].value;
        this.calculateAnswer(v1, v2);
    }
}