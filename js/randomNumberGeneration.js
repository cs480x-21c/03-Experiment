function getRandomInt(min, max){  //range includes min, does not include max
	var newMax = max - min;  //adjust top of generation to account for min
	var trueRand = Math.floor(Math.random()*Math.floor(newMax));  //generate random btwn 0 and newMax
	var adjRand = trueRand + min;  //adjust to account for min
	return adjRand
}


function barRandomGen(){
	var numBars = 5;   //control for number of bars
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

function pieRandomGen(){
	var numSlices = 5;    //control for number of pie slices
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
			
			var ROOMFACTOR = 6   //change this to change how much space to leave for future pie slices
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