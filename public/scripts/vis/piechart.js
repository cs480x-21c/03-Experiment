class PieChart extends Chart {
    constructor(svg, params) {
        super(svg, params);

        this.radius = params.radius || Math.min(this.width, this.height) / 2;
    }

    draw() {
        super.draw()

        this.svg.attr("transform", "translate(" + (this.margin.left + this.width / 2) + "," + (this.margin.top + this.height / 2) + ")")

        this.pie = d3.pie()
            .value(d => d)
            .sort(null);

        this.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);

        this.data_ready = this.pie(this.data);

        this.centroids = this.data_ready.map(d => this.arc.centroid(d)); // TODO: fix kinda clunky solution

        this.svg.selectAll(".slice")
            .data(this.pie(this.data))
            .enter()
            .append("path")
                .attr("class", "slice")
                .attr("d", this.arc)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1);

        this.drawMarks();
    }

    drawMarks() {
        this.svg.selectAll(".mark")
            .data(this.marked)
            .enter()
            .append("circle")
                .attr("class", "mark")
                .attr("r", 3)
                .attr("transform", d => "translate(" + this.centroids[d][0] + "," + this.centroids[d][1] + ")")
                .attr("stroke", "black")
                .attr("stroke-width", 1);
    }
}