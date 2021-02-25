
class Chart
{

    constructor(svg, width, height)
    {
        this.svg = svg;
        this.width = width;
        this.height = height;

        this.answer = 0;
    }

    remove()
    {
        // removes everything
        this.svg.selectAll('*').remove();
    }

}