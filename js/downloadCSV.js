function downloadCSV() {
    // Building the CSV from the Data two-dimensional array
    // Each column is separated by ";" and new line "\n" for next row
    var csvContent = '';
    csvRows.forEach(function (infoArray, index) {
        dataString = infoArray.join(';');
        csvContent += index < csvRows.length ? dataString + '\n' : dataString;
    });

    // The download function takes a CSV string, the filename and mimeType as parameters
    // Scroll/look down at the bottom of this snippet to see how download is called
    var download = function (content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
    }

    download(csvContent, 'dowload.csv', 'text/csv;encoding:utf-8');
}