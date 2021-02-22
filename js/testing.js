const trialsPerTest = 3

let trial = 0
let q = document.getElementById('message');
let input = document.getElementById('INPUT'); 
let submitButton = document.getElementById('SUBMIT');
let errorP = document.getElementById('error');
let actual = null;
let form = document.getElementById('fs-frm');

let tests = [
	[() => generatePieChart(), 'What percentage of size is the smaller slice of the larger slice?', 'Piechart'],
	[() => generateBoxPlots(), 'What percentage of size is the smaller highlighted boxplot of the larger highlighted boxplot?', 'Boxplot'],
	[() => generateBarChart(), 'What percentage of size is the smaller highlighted bar of the larger highlighter bar?', 'Barchart']
]

let values = [];

let testver = 0;


function stringify(arr) {
	let str = '';
	arr.forEach(row => {
		row.forEach(val => { str += val + "," });
		str += '\n';
	});
	return str;
}


function nextTrial(test, message) {
	document.getElementById('plot').innerHTML = ''; // clear plots in case one is already there
	actual = test();
	q.innerHTML = '('+(testver*trialsPerTest+trial+1)+'/'+trialsPerTest*tests.length+'): '+message;
}

function submit() {
	if (input.value <= 0 || input.value >= 1) {
		errorP.innerHTML = "Invalid input. Answer must be a decimal between 0 and 1";
		input.value = '';
	} else {
		errorP.innerHTML = '';
		values.push([tests[testver][2], input.value, actual.max, actual.min]);
		document.getElementById('plot').innerHTML = '';
		input.value = '';
		
		if (++trial >= trialsPerTest) { //increment trial count, if above trials per test, increment test count
			trial = 0;
			testver++;
		}
		if (testver >= tests.length) { //if testcount above available tests, finish survey
			input.remove();
			submitButton.remove();
			errorP.remove();
			q.innerHTML = 'Test Completed. Click \"Finish Survey\" to submit.';
			form.style = 'display:inline';
			document.getElementById('testdata').innerHTML = stringify(values);
		} else {
			nextTrial(tests[testver][0], tests[testver][1]) //next trial
		}
	}
}


nextTrial(tests[testver][0], tests[testver][1]);
