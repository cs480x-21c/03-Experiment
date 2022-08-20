class BarChart extends Chart {
    constructor(svg, params) {
        super(svg, params);
    }

    draw() {
        super.draw()
        this.createAxis();

        this.svg.selectAll(".bar")
            .data(this.data)
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", d => this.x(d))
                .attr("y", d => this.y(d))
                .attr("width", this.x.bandwidth())
                .attr("height", d => this.height - this.y(d))
                .attr("stroke", "black")
                .attr("fill", "none");

        this.drawMarks();
    }

    createAxis() {
        this.x = d3.scaleBand() // TODO: use scaleband?
            .domain(this.data)
            .range([0, this.width])
            .padding(0.2);
        this.svg.append("g")
            .call(d3.axisBottom(this.x).tickSize(0).tickValues([]))
            .attr("transform", "translate(0," + this.height + ")");

        this.y = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d)])
            .range([this.height, 0]);
        this.svg.append("g")
            .call(d3.axisLeft(this.y).tickSize(0).ticks(0));
    }

    drawMarks() {
        this.svg.selectAll(".mark")
            .data(this.marked)
            .enter()
            .append("circle")
                .attr("class", "mark")
                .attr("cx", d => this.x(this.data[d]) + this.x.bandwidth() / 2)
                .attr("cy", d => this.y(this.data[d]) + (this.height - this.y(this.data[d])) / 2)
                .attr("r", 3)
                .attr("stroke", "black")
                .attr("stroke-width", 1);
    }
}