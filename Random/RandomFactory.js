

function pushRandomValues(array, quantity, min, max)
{
    for (let i = 0; i < quantity; i++)
    {
        array.push({value: d3.randomInt(min, max)()});
    }
}