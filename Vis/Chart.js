
class Chart
{

    constructor(svg, width, height)
    {
        this.svg = svg;
        this.width = width;
        this.height = height;
    }

    remove()
    {
        this.svg.selectAll('*').remove();

        //d3.select(gSVGId).select(typeString + '#' + id).remove();
    }

}