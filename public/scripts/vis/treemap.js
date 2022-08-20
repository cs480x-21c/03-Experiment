class TreeMap extends Chart {
    constructor(svg, params) {
        super(svg, params);
    }

    draw() {
        super.draw();

        this.root = d3.hierarchy({"children": this.data}).sum(d => d);

        d3.treemap()
            .size([this.width, this.height])
            .padding(6)
            (this.root);

        this.svg.selectAll(".rect")
            .data(this.root.leaves())
            .enter()
            .append("rect")
                .attr("class", "rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("stroke", "black")
                .attr("fill", "none");

        this.drawMarks();
    }

    drawMarks() {
        this.svg.selectAll(".mark")
            .data(this.marked)
            .enter()
            .append("circle")
                .attr("class", "mark")
                .attr("cx", d => this.root.leaves()[d].x0 + (this.root.leaves()[d].x1 - this.root.leaves()[d].x0) / 2)
                .attr("cy", d => this.root.leaves()[d].y0 + (this.root.leaves()[d].y1 - this.root.leaves()[d].y0) / 2)
                .attr("r", 3)
                .attr("stroke", "black")
                .attr("stroke-width", 1);
    }
}