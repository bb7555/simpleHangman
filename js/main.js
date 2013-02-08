//Game Objects

var game = new Object();

////
//	This creates our hangman object and its methods
/////

var hangman = new Object();
hangman.counter = 0;
hangman.miss = function()
{
	hangman.counter++;
	
	//move the avatar along in death progression
		pixelSpritePosition = -1*Math.abs(400*hangman.counter);
		$("#gallows").css('background-position','0px '+pixelSpritePosition+'px');
	
	//game over	
	if(hangman.counter === 5)
	{
		alert('game over! try again!');
		location.reload();
	}
}

/////
//	This creates our word object and its methods
/////

var word = new Object();

//you may add more words to the array, or fill from external data-source
word.dictionary = ['cat', 'dog', 'mouse', 'deer', 'puppy', 'poodle', 'zebra'];

word.letterHolder = [];
word.letterUsed = [];
word.letterUsedBool = false;


//method to test is current guess has already been attmpted as well as add used letters to our test array
word.letterUsedTest = function(currentLetter)
{
	if(word.letterUsed.length===0)
	{
		word.letterUsed.push(currentLetter);
	}else{
	
		for(var i=0; i < word.letterUsed.length;i++)
		{
			if(word.letterUsed[i] === currentLetter)
			{
				word.letterUsedBool = true;
			}
		}
		
		 word.letterUsed.push(currentLetter);
	}
	
	return word.letterUsedBool;
	
}

word.setUp = function()
{
	//pick the word
	wordIndex=Math.floor((Math.random()*word.dictionary.length));
	
	
	
	//split the word up into letters in an array
	word.letterHolder = word.dictionary[wordIndex].split("");
	
	for(var i=0; i<word.letterHolder.length; i++)
	{
		
		
		$("#wordArea").append('<input readonly type="password" value="'+word.letterHolder[i]+'" />');
	}
	
	return word.letterHolder;
	
}

word.solved = function()
{
	//test if the word is solved yet or not and the game is a win for the player
	
	if ( $("input[type='password']").length === 0 ) {
		
		//game win game over
		
		alert('you solved it! great job! Try again');
		location.reload();
	}
}


//instantiate all our game objects and event listeners
game.init = function()
{
	
	//pick the word, set up the DOM, and return our word as letters in an array
	word.setUp();
	
	
	//event listener
	$("#guess").click(function(){
		currentLetter = $("#guessBox").val();
		$("#guessBox").val('');
		
		word.letterUsedTest(currentLetter);
		
		//error exception handling
		if(currentLetter=='')
		{
			alert('you did not enter a letter. try again');
		}else if(word.letterUsedBool === true){
			word.letterUsedBool = false;
			alert('you have already used that letter. try again');
		}else{
			
			findLetter = false;
			
			
			//iterate over each letter in th word
			for(var i=0; i<word.letterHolder.length; i++)
			{
				//iterate thru each letter in th DOM
				$("input[type='password']").each(function(){
					
					
					if($(this).val()===currentLetter)
					{
						$(this).attr('type','text');
						findLetter = true;	
					}
					
					
				});
			}//end word/letter iteration
			
			
			//add the letter to the letters guessed box to help the player
					$("#lettersGuessed").append(currentLetter);
					
					//determine if the player gets a miss or test if word is solved
					if(findLetter===false)
					{
						hangman.miss();
					}else{
						word.solved();
					}
			
			
		}//end exception handling conditional
	});
}

//load the game when document loads
$(document).ready(function(){
	game.init();
});