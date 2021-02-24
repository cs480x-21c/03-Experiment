

class ResultsController
{
    makeNewResult()
    {
        this.resultIndex = 0; // needs to be changed for the new file

        this.result = {children:[]};
        this.entry = {trialIndex: 0, chartType: "",
            correctAnswer: 0, participantAnswer:0};

        this.trialIndex = 0;
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
        //



    }







}
