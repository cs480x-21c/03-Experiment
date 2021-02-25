

class ResultsController
{
    makeNewResult()
    {
        // Default

        this.result = {children: []};
        this.entry = {resultIndex: 0, trialIndex: 0, chartType: "",
            correctAnswer: 0, participantAnswer:0};

        this.trialIndex = 0;

//         try
//         {
//             // Gets the next possible result index, used to name the result file
//             let options =
//                 {
//                     method: 'POST',
//                     headers: {"Content-type": "application/json; charset=UTF-8"},
//                 };

//             const promise = fetch('/resultIndex', options);
//             promise.then(response =>
//             {
//                 if(!response.ok)
//                 {
//                     console.error(response)
//                 }
//                 else
//                 {
//                     return response.json();
//                 }
//             }).then(result =>
//             {
//                 // Changes the file name to match the new result
//                 this.resultIndex = result;
//                 this.result.fileName = "result" + this.resultIndex + ".json";
//             })
//         }
//         catch (e)
//         {
//             console.log(e);
//         }
    }


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

    saveResult()
    {
        // We cannot save files on the server file system from pure js
        // Sends the information to the Node.js running on the server

        try {
            let options =
                {
                    method: 'POST',
                    headers: { "Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify(this.result)
                }

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
