class Chart {
    constructor(svg, params) {
        this.svg = svg;
        this.params = params;

        this.width = params.width || 800;
        this.height = params.height || 600;
        this.margin = params.margin || {top: 20, right: 20, bottom: 20, left: 20};
        this.data = params.data || this.generateData();
        this.marked = params.marked || this.selectMarks();

        this.percentage = this.calculatePercentage();
    }

    draw() {
        this.clear();

    }

    clear() {
        this.svg.selectAll("*").remove();
    }

    generateData() {
        let lower = 4; // greater than 3
        let upper = 39; // less than 39
        let diff = 0.1;

        let d = [];

        while (d.length < 5) {
            let r = Math.random();
            let x = lower + r * (upper - lower);
            let duplicate = false;
            for (var i = 0; i < d.length; i++) {
                if (Math.abs(d[i] - x) < diff) {
                    console.log("x: " + x + " d[i]: " + d[i]);
                    duplicate = true;
                    break;
                }
            }
            if (!duplicate) {
                d.push(x);
            }
        }

        let sum = d.reduce((a, b) => a + b, 0);
        let d_scaled = d.map(x => x / sum * 100);

        return d_scaled;
    }

    selectMarks() {
        let a = Math.floor(Math.random() * this.data.length);
        let b = a;

        while (b == a) {
            b = Math.floor(Math.random() * this.data.length);
            // TODO: adjacent marks
        }

        if (this.data[a] > this.data[b]) {
            return [a, b];
        } else {
            return [b, a];
        }
    }

    calculatePercentage() {
        let a = this.marked[0];
        let b = this.marked[1];
        let percentage = Math.round(100 * (this.data[b]/this.data[a]));
        console.debug("percentage: " + percentage);
        return percentage;
    }
}