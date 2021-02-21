const trialsPerTest = 3

let trial = 0
let q = document.getElementById('message');
let input = document.getElementById('INPUT'); 
let submitButton = document.getElementById('SUBMIT');
let errorP = document.getElementById('error');
let actual = null;

let tests = [
	[() => generateBoxPlots(), 'What percentage of size is the smaller highlighted boxplot of the larger highlighted boxplot?'],
	[() => generateBarChart(), 'What percentage of size is the smaller highlighted bar of the larger highlighter bar?']
]

let testver = 0;

function nextTrial(test, message) {
	document.getElementById('plot').innerHTML = ''; // clear plots in case one is already there
	actual = test();
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
		console.log(actual); // TODO: store this to DB
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
			q.innerHTML = 'Test completed'
		} else {
			nextTrial(tests[testver][0], tests[testver][1]) //next trial
		}
	}
}


nextTrial(tests[testver][0], tests[testver][1]);
