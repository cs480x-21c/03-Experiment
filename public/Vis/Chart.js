
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

}