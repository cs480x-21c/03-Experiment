const fs = require('fs');
const Papa = require('papaparse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let sdf;
let errorPec = [];

function createCSV(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();
    let minutes = today.getMinutes();

    today = mm + dd  + yyyy + minutes + Math.floor(Math.random() * 1000);

    let todayString = today.toString();
    const csvWriter = createCsvWriter({
        path: 'csvdata/' + todayString + '.csv',
        header: [
            {id: 'ParticipantID', title: 'ParticipantID'},
            {id: 'TrialNum', title: 'TrialNum'},
            {id: 'Vis', title: 'Vis'},
            {id: 'TruePercent', title: 'TruePercent'},
            {id: 'ReportedPercent', title: 'ReportedPercent'},
        ]
    });


    //replace data with csv dump
    let data = [ { "ParticipantID": "Test92", "TrialNum": 0, "Vis": "barchart_vert", "TruePercent": "2", "ReportedPercent": "2" }, { "ParticipantID": "Test92", "TrialNum": 1, "Vis": "barchart_vert", "TruePercent": "2.130434782608696", "ReportedPercent": "2" }, { "ParticipantID": "Test92", "TrialNum": 2, "Vis": "barchart_vert", "TruePercent": "2.0416666666666665", "ReportedPercent": "2" }, { "ParticipantID": "Test92", "TrialNum": 3, "Vis": "barchart_vert", "TruePercent": "1.5", "ReportedPercent": "1.4" }, { "ParticipantID": "Test92", "TrialNum": 4, "Vis": "barchart_vert", "TruePercent": "1.4838709677419355", "ReportedPercent": "1.3" }, { "ParticipantID": "Test92", "TrialNum": 5, "Vis": "barchart_vert", "TruePercent": "6.142857142857143", "ReportedPercent": "6" }, { "ParticipantID": "Test92", "TrialNum": 6, "Vis": "barchart_vert", "TruePercent": "2", "ReportedPercent": "2" }, { "ParticipantID": "Test92", "TrialNum": 7, "Vis": "barchart_vert", "TruePercent": "3.5", "ReportedPercent": "3" }, { "ParticipantID": "Test92", "TrialNum": 8, "Vis": "barchart_vert", "TruePercent": "2.933333333333333", "ReportedPercent": "3" }, { "ParticipantID": "Test92", "TrialNum": 9, "Vis": "barchart_vert", "TruePercent": "4.857142857142857", "ReportedPercent": "4" }, { "ParticipantID": "Test92", "TrialNum": 10, "Vis": "barchart_hor", "TruePercent": "5.5", "ReportedPercent": "5" }, { "ParticipantID": "Test92", "TrialNum": 11, "Vis": "barchart_hor", "TruePercent": "1.1282051282051282", "ReportedPercent": "1.1" }, { "ParticipantID": "Test92", "TrialNum": 12, "Vis": "barchart_hor", "TruePercent": "2.2777777777777777", "ReportedPercent": "1.8" }, { "ParticipantID": "Test92", "TrialNum": 13, "Vis": "barchart_hor", "TruePercent": "2.15", "ReportedPercent": "2.1" }, { "ParticipantID": "Test92", "TrialNum": 14, "Vis": "barchart_hor", "TruePercent": "1.2758620689655173", "ReportedPercent": "1.4" }, { "ParticipantID": "Test92", "TrialNum": 15, "Vis": "barchart_hor", "TruePercent": "3.2857142857142856", "ReportedPercent": "2.6" }, { "ParticipantID": "Test92", "TrialNum": 16, "Vis": "barchart_hor", "TruePercent": "1.625", "ReportedPercent": "1.8" }, { "ParticipantID": "Test92", "TrialNum": 17, "Vis": "barchart_hor", "TruePercent": "1.4193548387096775", "ReportedPercent": "1.6" }, { "ParticipantID": "Test92", "TrialNum": 18, "Vis": "barchart_hor", "TruePercent": "1", "ReportedPercent": "1" }, { "ParticipantID": "Test92", "TrialNum": 19, "Vis": "barchart_hor", "TruePercent": "1.0625", "ReportedPercent": "1.2" }, { "ParticipantID": "Test92", "TrialNum": 0, "Vis": "angles", "TruePercent": "347", "ReportedPercent": "350" }, { "ParticipantID": "Test92", "TrialNum": 1, "Vis": "angles", "TruePercent": "131", "ReportedPercent": "120" }, { "ParticipantID": "Test92", "TrialNum": 2, "Vis": "angles", "TruePercent": "260", "ReportedPercent": "260" }, { "ParticipantID": "Test92", "TrialNum": 3, "Vis": "angles", "TruePercent": "358", "ReportedPercent": "350" }, { "ParticipantID": "Test92", "TrialNum": 4, "Vis": "angles", "TruePercent": "320", "ReportedPercent": "340" }, { "ParticipantID": "Test92", "TrialNum": 5, "Vis": "angles", "TruePercent": "51", "ReportedPercent": "45" }, { "ParticipantID": "Test92", "TrialNum": 6, "Vis": "angles", "TruePercent": "353", "ReportedPercent": "345" }, { "ParticipantID": "Test92", "TrialNum": 7, "Vis": "angles", "TruePercent": "171", "ReportedPercent": "170" }, { "ParticipantID": "Test92", "TrialNum": 8, "Vis": "angles", "TruePercent": "5", "ReportedPercent": "10" }, { "ParticipantID": "Test92", "TrialNum": 9, "Vis": "angles", "TruePercent": "208", "ReportedPercent": "200" }, { "ParticipantID": "Test92", "TrialNum": 10, "Vis": "angles", "TruePercent": "66", "ReportedPercent": "70" }, { "ParticipantID": "Test92", "TrialNum": 11, "Vis": "angles", "TruePercent": "85", "ReportedPercent": "85" }, { "ParticipantID": "Test92", "TrialNum": 12, "Vis": "angles", "TruePercent": "110", "ReportedPercent": "120" }, { "ParticipantID": "Test92", "TrialNum": 13, "Vis": "angles", "TruePercent": "26", "ReportedPercent": "30" }, { "ParticipantID": "Test92", "TrialNum": 14, "Vis": "angles", "TruePercent": "283", "ReportedPercent": "290" }, { "ParticipantID": "Test92", "TrialNum": 15, "Vis": "angles", "TruePercent": "215", "ReportedPercent": "220" }, { "ParticipantID": "Test92", "TrialNum": 16, "Vis": "angles", "TruePercent": "57", "ReportedPercent": "65" }, { "ParticipantID": "Test92", "TrialNum": 17, "Vis": "angles", "TruePercent": "319", "ReportedPercent": "320" }, { "ParticipantID": "Test92", "TrialNum": 18, "Vis": "angles", "TruePercent": "318", "ReportedPercent": "320" }, { "ParticipantID": "Test92", "TrialNum": 19, "Vis": "angles", "TruePercent": "127", "ReportedPercent": "120" }, { "ParticipantID": "Test92", "TrialNum": 0, "Vis": "volume", "TruePercent": "512", "ReportedPercent": "216" }, { "ParticipantID": "Test92", "TrialNum": 1, "Vis": "volume", "TruePercent": "343", "ReportedPercent": "125" }, { "ParticipantID": "Test92", "TrialNum": 2, "Vis": "volume", "TruePercent": "343", "ReportedPercent": "125" }, { "ParticipantID": "Test92", "TrialNum": 3, "Vis": "volume", "TruePercent": "125", "ReportedPercent": "27" }, { "ParticipantID": "Test92", "TrialNum": 4, "Vis": "volume", "TruePercent": "64", "ReportedPercent": "27" }, { "ParticipantID": "Test92", "TrialNum": 5, "Vis": "volume", "TruePercent": "343", "ReportedPercent": "216" }, { "ParticipantID": "Test92", "TrialNum": 6, "Vis": "volume", "TruePercent": "216", "ReportedPercent": "226" }, { "ParticipantID": "Test92", "TrialNum": 7, "Vis": "volume", "TruePercent": "27", "ReportedPercent": "8" }, { "ParticipantID": "Test92", "TrialNum": 8, "Vis": "volume", "TruePercent": "27", "ReportedPercent": "8" }, { "ParticipantID": "Test92", "TrialNum": 9, "Vis": "volume", "TruePercent": "343", "ReportedPercent": "216" }, { "ParticipantID": "Test92", "TrialNum": 10, "Vis": "volume", "TruePercent": "216", "ReportedPercent": "125" }, { "ParticipantID": "Test92", "TrialNum": 11, "Vis": "volume", "TruePercent": "216", "ReportedPercent": "125" }, { "ParticipantID": "Test92", "TrialNum": 12, "Vis": "volume", "TruePercent": "512", "ReportedPercent": "343" }, { "ParticipantID": "Test92", "TrialNum": 13, "Vis": "volume", "TruePercent": "64", "ReportedPercent": "125" }, { "ParticipantID": "Test92", "TrialNum": 14, "Vis": "volume", "TruePercent": "343", "ReportedPercent": "64" }, { "ParticipantID": "Test92", "TrialNum": 15, "Vis": "volume", "TruePercent": "512", "ReportedPercent": "216" }, { "ParticipantID": "Test92", "TrialNum": 16, "Vis": "volume", "TruePercent": "343", "ReportedPercent": "216" }, { "ParticipantID": "Test92", "TrialNum": 17, "Vis": "volume", "TruePercent": "216", "ReportedPercent": "27" }, { "ParticipantID": "Test92", "TrialNum": 18, "Vis": "volume", "TruePercent": "125", "ReportedPercent": "27" }, { "ParticipantID": "Test92", "TrialNum": 19, "Vis": "volume", "TruePercent": "125", "ReportedPercent": "27" } ]
    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));
}

function createCSVError(data){

    const csvWriter = createCsvWriter({
        path: 'csvdata/mastererrorcalculationsNONNORM.csv',
        header: [
            {id: 'Vis', title: 'Vis'},
            {id: 'ErrorScore', title: 'ErrorScore'},
            {id: 'TruePercent', title: 'TruePercent'},
            {id: 'Reported', title: 'Reported'},
        ]
    });


    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));
}




function getCSVDataCalcError(){
    const file = fs.createReadStream('csvdata/mastercsv.csv');

    function test(data){
        //console.log(data.length)
        for(let i = 0; i < data.length; i++){
            let truePercent = data[i].TruePercent;
            let reportedPercent = data[i].ReportedPercent;
            let visType = data[i].Vis;
            let ratio = Math.log2(Math.abs(reportedPercent - truePercent) + (1/8));
            let ratioNorm = Math.abs(reportedPercent - truePercent);
           // console.log(truePercent, reportedPercent);

            errorPec.push({"Vis": visType, "ErrorScore": ratioNorm,"TruePercent": truePercent, "Reported": reportedPercent});
        }

        //console.log(errorPec.length)
        createCSVError(errorPec);
    }

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            //console.log("Finished:", results.data);
            test(results.data);
        }
    });

}

getCSVDataCalcError()





