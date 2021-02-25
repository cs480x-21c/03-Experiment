

function pushRandomValues(array, quantity, min, max)
{

}

function makePointsOfInterest(min, max)
{
    let random = d3.randomInt(min, max);
    let point1 = random();
    let point2 = random();

    while (point2 === point1)
    {
        point2 = random();
    }

    return [point1, point2];
}