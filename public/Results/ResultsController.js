/**
 * ResultsController.js
 * date created: 2/21/2021
 * Author: Benjamin M'Sadoques
 *
 * Provides the results controller, used to control entering new results
 */

class ResultsController
{
    /**
     * Makes a new result, gets the result index from the server
     */
    constructor()
    {
        // Default result entries
        this.result = {children: []};
        this.entry = {resultIndex: 0, trialIndex: 0, chartType: "",
            correctAnswer: 0, participantAnswer:0};

        this.trialIndex = 0;
    }

    /**
     * Enters a new result
     * @param chartType
     * @param correctAnswer
     * @param participantAnswer
     */
    enterResult(chartType, correctAnswer, participantAnswer)
    {
        // Set the entry
        this.entry.trialIndex = this.trialIndex;
        this.entry.chartType = chartType;
        this.entry.correctAnswer = correctAnswer;
        this.entry.participantAnswer = participantAnswer;

        // Add the entry to the results
        this.result.children.push(Object.assign({},this.entry));


        this.trialIndex++;
    }

    /**
     * Sends the information to the Node.js running on the server
     * so it is saved as a new set of entries on the master csv
     * Result index is set in the server to lessen the chance of a race condition
     */
    saveResult()
    {
        try
        {
            // Result is passed as a JSON, but converted to csv on the server
            let options =
                {
                    method: 'POST',
                    headers: { "Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify(this.result)
                };

            // sends a request to /result, to send the result
            const promise = fetch('/result', options);
            promise.then(response =>
            {
                if(!response.ok)
                {
                    console.error(response)
                }
                else
                {
                    return response.json();
                }
            }).then(result =>
            {
                console.log(result);
            })
        }
        catch (e)
        {
            console.log(e);
        }
    }
}
