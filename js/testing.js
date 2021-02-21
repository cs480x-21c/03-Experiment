function getTest(plotGenerator, message) { //TODO: Keep track of trial count
	let v = plotGenerator();

	let q = document.createElement('p');
	q.innerHTML = message;
	document.body.appendChild(q);

	let input = document.createElement("input"); 
	input.type = 'number';
	input.min = '0.01';
	input.max = '0.99';
	input.step = '0.01';
	document.body.appendChild(input);

	let submitButton = document.createElement('button');
	submitButton.innerHTML = 'Submit';
	submitButton.onclick = () => submit();
	document.body.appendChild(submitButton);

	let errorP = document.createElement("p");
	errorP.style = 'color:red';
	errorP.innerHTML = "Invalid input. Answer must be a decimal between 0 and 1";

	function submit() {
		val = input.value;
		if (val <= 0 || val >= 1) {
			document.body.appendChild(errorP);
			input.value = '';
		} else {
			errorP.remove()
			console.log(input.value); // TODO: store this to DB
			console.log(v); // TODO: store this to DB
			document.getElementById('boxplot').innerHTML = '';
			input.value = '';
			v = generateBoxPlots();
		}
	}
}
