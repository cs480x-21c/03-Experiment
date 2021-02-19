function getRandomInt(min, max){  //range includes min, does not include max
	var newMax = max - min;  //adjust top of generation to account for min
	var trueRand = Math.floor(Math.random()*Math.floor(newMax));  //generate random btwn 0 and newMax
	var adjRand = trueRand + min;  //adjust to account for min
	return adjRand
}

function barRandomGen(){
	var randomNumbers = [];  //array for random numbers
	
	for(var i = 0; i < 5; i++){
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
	
	//at this point we have array of five random numbers, non-duplicates, between 3 and 100
	//need to designate two spots to compare
	
	
	
	var firstNum = getRandomInt(1, 6);   //get random number between 1 and 5
	
	var secondNum = 0;
	var findSecond = true; //need to find the second number
	while (findSecond){
		var newRand = getRandomInt(1, 6);  //generate second number
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
	var randomNumbers = [];  //array for random numbers
	
	for(var i = 0; i < 4; i++){
		var findNum = true;  //loop control for finding non-duplicate numbers
		
		var newRand = 0;   //new random number to be placed in array
		
		while(findNum){   //while we need to find non-duplicate numbers
		
			//range to generate within is more complex here
			
			var numsRemaining = 4-i;  //number of numbers we'll need to generate after this one
			
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
	for (var i = 0; i < 4; i++){
		firstFourSum = firstFourSum + randomNumbers[i];
	}
	
	randomNumbers[4] = 100-firstFourSum;
	
	//at this point we have array of five random numbers adding to 100, non-duplicates, between 3 and 100
	//need to designate two spots to compare
	
	
	
	var firstNum = getRandomInt(1, 6);   //get random number between 1 and 5
	
	var secondNum = 0;
	var findSecond = true; //need to find the second number
	while (findSecond){
		var newRand = getRandomInt(1, 6);  //generate second number
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