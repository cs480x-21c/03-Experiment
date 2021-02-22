function getRandomInt(min, max){  //range includes min, does not include max
	var newMax = max - min;  //adjust top of generation to account for min
	var trueRand = Math.floor(Math.random()*Math.floor(newMax));  //generate random btwn 0 and newMax
	var adjRand = trueRand + min;  //adjust to account for min
	return adjRand
}

//Return array is in the format of: [[random numbers], [designated bars for comparison]]
function barRandomGen(){
	var numBars = 10;   //control for number of bars
	var randomNumbers = [];  //array for random numbers

	for(var i = 0; i < numBars; i++){
		var findNum = true;  //loop control for finding non-duplicate numbers

		var newRand = 0;   //new random number to be placed in array

		while(findNum){   //while we need to find non-duplicate numbers

			var newRand = getRandomInt(3, 100);   //get a new random number

			var needNewNum = false;   //do we need a new number?
			for (var j = 0; j < randomNumbers.length; j++){  //check to see if it's a duplicate
				if(newRand == randomNumbers[j]) {needNewNum = true}  //if there's a duplicate
			}

			if(needNewNum){    //if we need a new number, make sure findNum is true and we repeat the loop
				findNum = true;
			}else{
				findNum = false;  //if not, exit loop and enter number into array
				randomNumbers[i] = newRand;
			}
		}
	}

	//at this point we have array of numBars random numbers, non-duplicates, between 3 and 100
	//need to designate two spots to compare



	var firstNum = getRandomInt(0, numBars);   //get random number between 0 and number of bars

	var secondNum = 0;
	var findSecond = true; //need to find the second number
	while (findSecond){
		var newRand = getRandomInt(0, numBars);  //generate second number
		if(newRand == firstNum){   //check for duplicate
			findSecond = true;
		}else{
			findSecond = false;
			secondNum = newRand;
		}
	}

	var designatedBars = [firstNum, secondNum];

	var result = [randomNumbers, designatedBars];
	return result;
}

//Return array is in the format of: [[random numbers], [designated pie slices for comparison]]
function pieRandomGen(){
	var numSlices = 10;    //control for number of pie slices
	var randomNumbers = [];  //array for random numbers

	for(var i = 0; i < (numSlices-1); i++){
		var findNum = true;  //loop control for finding non-duplicate numbers

		var newRand = 0;   //new random number to be placed in array

		while(findNum){   //while we need to find non-duplicate numbers

			//range to generate within is more complex here

			var numsRemaining = (numSlices-1)-i;  //number of numbers we'll need to generate after this one

			var sumTillNow = 0;
			for (var j = 0; j < randomNumbers.length; j++){  //keeping track of how much space we've used so far
				sumTillNow = sumTillNow + randomNumbers[j];
			}

			var ROOMFACTOR = 8   //change this to change how much space to leave for future pie slices
			var max = 100-sumTillNow-(ROOMFACTOR*numsRemaining);

			var newRand = getRandomInt(3, max);   //get a new random number

			var needNewNum = false;   //do we need a new number?
			for (var j = 0; j < randomNumbers.length; j++){  //check to see if it's a duplicate
				if(newRand == randomNumbers[j]) {needNewNum = true}  //if there's a duplicate
			}

			if(needNewNum){    //if we need a new number, make sure findNum is true and we repeat the loop
				findNum = true;
			}else{
				findNum = false;  //if not, exit loop and enter number into array
				randomNumbers[i] = newRand;
			}
		}
	}

	var firstFourSum = 0;
	for (var i = 0; i < (numSlices-1); i++){   //get the sum of the first 4 values chosen
		firstFourSum = firstFourSum + randomNumbers[i];
	}

	randomNumbers[numSlices-1] = 100-firstFourSum;   //have the last number be the difference to 100

	//Shuffle Numbers from
    //https://stackoverflow.com/a/12646864
    //DO WE NEED THIS
    for (let i = randomNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomNumbers[i], randomNumbers[j]] = [randomNumbers[j], randomNumbers[i]];
    }
	
	
	//at this point we have array of numSlices random numbers adding to 100, non-duplicates, between 3 and 100
	//need to designate two spots to compare



	var firstNum = getRandomInt(0, numSlices);   //get random number between 0 and number of bars

	var secondNum = 0;
	var findSecond = true; //need to find the second number
	while (findSecond){
		var newRand = getRandomInt(0, numSlices);  //generate second number
		if(newRand == firstNum){   //check for duplicate
			findSecond = true;
		}else{
			findSecond = false;
			secondNum = newRand;
		}
	}

	var designatedBars = [firstNum, secondNum];

	var result = [randomNumbers, designatedBars];
	return result;
}

//Return array is in the format of: [bar 1 size, [random numbers for bar 1], designated element in bar 1, bar 2 size, [random numbers for bar 2], designated element for bar 2]
function stackedBarRandomGen(){
	var numStacked1 = 5;   //number of stacked areas for bar 1
	var numStacked2 = 5;   //number of stacked areas for bar 2

	var barMin = 50;  //minimum size of bars

	var bar1 = getRandomInt(barMin, 100);  //get random number for length of the first bar

	var findNum = true;  //loop control for finding non-duplicate numbers

	var bar2 = 0;   //new random number to be placed in array

	while(findNum){   //while we need to find non-duplicate numbers

		var bar2 = getRandomInt(barMin, 100);   //get a new random number

		var needNewNum = false;   //do we need a new number?

		if(bar2 == bar1) {needNewNum = true}  //if there's a duplicate

		if(needNewNum){    //if we need a new number, make sure findNum is true and we repeat the loop
			findNum = true;
		}else{
			findNum = false;  //if not, exit loop
		}
	}

	//at this point we have non-duplicate lengths for the two bars

	//Generating sizes for areas of bar 1

	var bar1vals = [];  //array for storing values in bar 1

	for(var i = 0; i < (numStacked1-1); i++){
		var findNum = true;  //loop control for finding non-duplicate numbers

		var newRand = 0;   //new random number to be placed in array

		while(findNum){   //while we need to find non-duplicate numbers

			//range to generate within is more complex here

			var numsRemaining = (numStacked1-1)-i;  //number of numbers we'll need to generate after this one

			var sumTillNow = 0;
			for (var j = 0; j < bar1vals.length; j++){  //keeping track of how much space we've used so far
				sumTillNow = sumTillNow + bar1vals[j];
			}

			var ROOMFACTOR = 8   //change this to change how much space to leave for future pie slices
			var max = bar1-sumTillNow-(ROOMFACTOR*numsRemaining);

			var newRand = getRandomInt(3, max);   //get a new random number

			var needNewNum = false;   //do we need a new number?
			for (var j = 0; j < bar1vals.length; j++){  //check to see if it's a duplicate
				if(newRand == bar1vals[j]) {needNewNum = true}  //if there's a duplicate
			}

			if(needNewNum){    //if we need a new number, make sure findNum is true and we repeat the loop
				findNum = true;
			}else{
				findNum = false;  //if not, exit loop and enter number into array
				bar1vals[i] = newRand;
			}
		}
	}

	var firstFourSum = 0;
	for (var i = 0; i < (numStacked1-1); i++){   //get the sum of the first 4 values chosen
		firstFourSum = firstFourSum + bar1vals[i];
	}

	bar1vals[numStacked1-1] = bar1-firstFourSum;   //have the last number be the difference to bar1


	//Generating sizes for areas of bar 2

	var bar2vals = [];  //array for storing values in bar 2

	for(var i = 0; i < (numStacked1-1); i++){
		var findNum = true;  //loop control for finding non-duplicate numbers

		var newRand = 0;   //new random number to be placed in array

		while(findNum){   //while we need to find non-duplicate numbers

			//range to generate within is more complex here

			var numsRemaining = (numStacked1-1)-i;  //number of numbers we'll need to generate after this one

			var sumTillNow = 0;
			for (var j = 0; j < bar2vals.length; j++){  //keeping track of how much space we've used so far
				sumTillNow = sumTillNow + bar2vals[j];
			}

			var ROOMFACTOR = 8   //change this to change how much space to leave for future pie slices
			var max = bar2-sumTillNow-(ROOMFACTOR*numsRemaining);

			var newRand = getRandomInt(3, max);   //get a new random number

			var needNewNum = false;   //do we need a new number?
			for (var j = 0; j < bar2vals.length; j++){  //check to see if it's a duplicate
				if(newRand == bar2vals[j]) {needNewNum = true}  //if there's a duplicate
			}

			if(needNewNum){    //if we need a new number, make sure findNum is true and we repeat the loop
				findNum = true;
			}else{
				findNum = false;  //if not, exit loop and enter number into array
				bar2vals[i] = newRand;
			}
		}
	}

	var firstFourSum = 0;
	for (var i = 0; i < (numStacked1-1); i++){   //get the sum of the first 4 values chosen
		firstFourSum = firstFourSum + bar2vals[i];
	}

	bar2vals[numStacked1-1] = bar2-firstFourSum;   //have the last number be the difference to bar2

	//generate designations for which stacked bars to mark for comparison

	var firstNum = getRandomInt(0, numStacked1);   //get random number between 0 and number of stacks in bar 1
	var secondNum = getRandomInt(0, numStacked2);   //get random number between 0 and number of stacks in bar 1

	return [bar1, bar1vals, firstNum, bar2, bar2vals, secondNum];
}
