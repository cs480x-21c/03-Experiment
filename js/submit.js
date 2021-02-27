function textBoxSubmit() {
    var div = document.createElement("div");

    div.style.height = "100px";

    document.body.appendChild(div);

    // Text box
    var textInput = document.createElement("input");
    textInput.setAttribute("placeholder", "Enter Percent E.g. 50");
    textInput.setAttribute("type", "text");
    div.appendChild(textInput);

    // Put a % icon next to the text box
    var percentIcon = document.createElement("Percent");
    var percentIconText = document.createTextNode("%");
    percentIcon.id = "percentIcon";
    percentIcon.style.fontFamily = "arial";
    percentIcon.appendChild(percentIconText);
    div.appendChild(percentIcon);

    // Allow text box to submit when enter key is pressed
    textInput.addEventListener("keydown", function(e){
        if(e.keyCode == 13) checkSubmit();
    });

    // Submit button
    var submit = document.createElement("Button");
    submit.classList.add("submitButton");
    var submitText = document.createTextNode("Submit");

    // Function for when a request is submitted
    submit.appendChild(submitText);
    div.appendChild(submit);
    submit.onclick = function(){
        checkSubmit();
    };

    function checkSubmit(){
        if (textInput.value <= 100 && textInput.value > 0 && textInput.value != '') {
            numSubmits++;
            var text = textInput.value;
            textInput.value = '';
            text = text / 100;
            console.log(text);
            //userInput = text;

            // Update the csv
            tempData.push(text);
            csvRows.push(tempData);

            // Make sure the user hasn't completed all the questions, if they have then download the csv
            if (numSubmits < maxSubmits) {
                drawNextChart(randArray[numSubmits]);
            } else downloadCSV();

        } else {
            alert("Please type a number between 0 and 100 (Inclusive for 100)");
        }
    }
}