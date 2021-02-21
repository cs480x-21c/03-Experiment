const trialsPerTest = 3

let trial = 0
let q = document.getElementById('message');
let input = document.getElementById('INPUT'); 
let submitButton = document.getElementById('SUBMIT');
let errorP = document.getElementById('error');
let v = null;

let tests = [
	[() => generateBoxPlots(), 'What percentage of size is the smaller highlighted boxplot of the larger highlighted boxplot?'],
	[() => generateBarChart(), 'What percentage of size is the smaller highlighted bar of the larger highlighter bar?']
]

let testver = 0;

function nextTrial(test, message) { //TODO: Keep track of trial count
	document.getElementById('plot').innerHTML = ''; // clear plots in case one is already there
	v = test();
	q.innerHTML = message;
}

function submit() {
	let val = input.value;
	if (val <= 0 || val >= 1) {
		errorP.innerHTML = "Invalid input. Answer must be a decimal between 0 and 1";
		input.value = '';
	} else {
		errorP.innerHTML = '';
		console.log(input.value); // TODO: store this to DB
		console.log(v); // TODO: store this to DB
		document.getElementById('plot').innerHTML = '';
		input.value = '';
		if (++trial < trialsPerTest) { // still on current test
			nextTrial(tests[testver][0], tests[testver][1])
		} else { // move to next test
			trial = 0;
			if (testver < tests.length-1) {
				nextTrial(tests[++testver][0], tests[testver][1]);
			} else {
				input.remove();
				submitButton.remove();
				errorP.remove();
				q.innerHTML = 'Test completed'
			}
		}
	}
}


nextTrial(tests[testver][0], tests[testver][1]);
