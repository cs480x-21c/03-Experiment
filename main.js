
let gVisArray = [];
let gVisIndex = 0;
let gTrialIndex = 0;
const TRIALS = 20;

function main()
{
    // Create vis to test
    gVisArray.push(new BarChart());
    gVisArray.push(new RadarChart());
    gVisArray.push(new TreeMap());

    // Create new results file for this trial

    // First test (the form leads to new tests)
    makeNewChart();
}

function makeNewChart()
{
    if (gVisIndex === gVisArray.length)
    {
        gVisIndex = 0;

        if (gTrialIndex === TRIALS)
        {
            // TODO: end test somehow
        }
        else
        {
            gTrialIndex++;
        }
    }
    else
    {
        // TODO: gets the answer and submits it
        //  vis is made, unless this is the first time


        let vis = gVisArray[gVisIndex];



        // make the new vis with random values and make
        vis.newRandom();
        vis.make();

        gVisIndex++;
    }
}
