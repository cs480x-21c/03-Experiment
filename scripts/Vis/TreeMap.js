
class TreeMap extends Chart
{
    // example: https://www.d3-graph-gallery.com/graph/treemap_json.html

    constructor(svg, width, height)
    {
        super(svg, width, height);
        this.type = "TreeMap";
    }

    newRandom()
    {
        this.data = {children: []};

        pushRandomValues(this.data.children, 10, 1, 100);
    }

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

        // TODO: how to make the chart work?

        this.answer = 0;
    }

    check(answer)
    {

    }
}