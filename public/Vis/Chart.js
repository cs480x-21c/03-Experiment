
class Chart
{

    constructor(svg, width, height)
    {
        this.svg = svg;
        this.width = width;
        this.height = height;

        this.features = ["A","B","C","D","E","F","G"];
        this.pointsOfInterest = [];

        this.answer = 0;
    }

    newRandom()
    {
        // select points of interest
        this.pointsOfInterest = makePointsOfInterest(0, this.features.length-1);
    }

    remove()
    {
        // removes everything
        this.svg.selectAll('*').remove();
    }

    calculateAnswer(v1, v2)
    {
        let high = Math.max(v1, v2);
        let low = Math.min(v1, v2);

        this.answer = Math.floor(100 - ((100/high) * low));

        console.log(v1);
        console.log(v2);
        console.log(this.answer);
    }

}