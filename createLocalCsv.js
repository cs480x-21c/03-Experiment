var admin = require("firebase-admin");
const { mainModule } = require("process");

var serviceAccount = require("./credentials.json");

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'report.csv',
    header: [
        { id: 'trialNumber', title: 'TrailNumber' },
        { id: 'expected', title: 'Expected' },
        { id: 'error', title: 'Error' },
        { id: 'reportedPercent', title: 'ReportedPercent' },
        { id: 'vis', title: 'Visualization' },
    ]
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = new admin.firestore();

let reportData = [];



async function main() {
    let collections = await firestore.listCollections();

    for (let collection of collections) {
        let documents = await collection.listDocuments();

        for (let document of documents) {
            let snapDoc = await document.get();
            if (snapDoc.exists) {
                let data = snapDoc.data();
                reportData.push(...data.output);
            }
        }
    }

    csvWriter
        .writeRecords(reportData)
        .then(() => console.log('The CSV file was written successfully'));
}

main();