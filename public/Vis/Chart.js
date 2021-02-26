/**
 * Chart.js
 *
 * date created: 2/20/2021
 * Author: Benjamin M'Sadoques and Nicolas Fish
 *
 * Provides the super class used to make all the chart
 */

class Chart
{
    /**
     * Sets the key variables used for all charts
     * @param svg d3svg
     * @param width of the chart
     * @param height of the chart
     */
    constructor(svg, width, height)
    {
        this.svg = svg;
        this.width = width;
        this.height = height;

        this.features = ["A","B","C","D","E","F","G"];
        this.pointsOfInterest = [];

        this.answer = 0;
    }

    /**
     * Generates a new random points of interest
     * The points of interest are used to select
     *  the data values to test the subject on
     */
    newRandom()
    {
        // select points of interest
        let random = d3.randomInt(0, this.features.length-1);
        let point1 = random();
        let point2 = random();

        while (point2 === point1)
        {
            point2 = random();
        }

        this.pointsOfInterest = [point1, point2];
    }

    /**
     * Removes the current chart
     */
    remove()
    {
        // removes everything
        this.svg.selectAll('*').remove();
    }

    /**
     * Calculates the answer based off the values of the points of interest
     * @param v1 value 1
     * @param v2 value 2
     */
    calculateAnswer(v1, v2)
    {
        let high = Math.max(v1, v2);
        let low = Math.min(v1, v2);

        this.answer = Math.floor(100 - ((100/high) * low));

        // TODO: remove later once we know answers are right
        console.log(v1);
        console.log(v2);
        console.log(this.answer);
    }
}