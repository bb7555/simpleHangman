//Game Objects

var game = new Object();

////
//	This creates our hangman object and its methods
/////

function Hangman()
{
	this.counter = 0;
	this.miss = function()
	{
		this.counter++;
		
		//move the avatar along in death progression
			pixelSpritePosition = -1*Math.abs(400*hangman.counter);
			$("#gallows").css('background-position','0px '+pixelSpritePosition+'px');
		
		//game over	
		if(this.counter === 5)
		{
			alert('game over! try again!');
			location.reload();
		}
	}
}

var hangman = new Hangman();

/////
//	This creates our word object and its methods
/////

function Word()
{
	//you may add more words to the array, or fill from external data-source
	this.dictionary = ['cat', 'dog', 'mouse', 'deer', 'puppy', 'poodle', 'zebra'];

	this.letterHolder = [];
	this.letterUsed = [];
	this.letterUsedBool = false;


	//method to test is current guess has already been attmpted as well as add used letters to our test array
	this.letterUsedTest = function(currentLetter)
	{
		if(this.letterUsed.length===0)
		{
			this.letterUsed.push(currentLetter);
		}else{
		
			for(var i=0; i < this.letterUsed.length;i++)
			{
				if(this.letterUsed[i] === currentLetter)
				{
					this.letterUsedBool = true;
				}
			}
			
			 this.letterUsed.push(currentLetter);
		}
		
		return this.letterUsedBool;
		
	}

	this.setUp = function()
	{
		//pick the word
		wordIndex=Math.floor((Math.random()*this.dictionary.length));
		
		
		
		//split the word up into letters in an array
		this.letterHolder = this.dictionary[wordIndex].split("");
		
		for(var i=0; i<this.letterHolder.length; i++)
		{
			
			
			$("#wordArea").append('<input disabled readonly type="password" value="'+this.letterHolder[i]+'" />');
		}
		
		return this.letterHolder;
		
	}

	this.solved = function()
	{
		//test if the word is solved yet or not and the game is a win for the player
		
		if ( $("input[type='password']").length === 0 ) {
			
			//game win game over
			
			alert('you solved it! great job! Try again');
			location.reload();
		}
	}
}

//instantiate all our game objects and event listeners
game.init = function()
{
	
	//pick the word, set up the DOM, and return our word as letters in an array
	var word = new Word();
	word.setUp();
	
	
	//event listener
	$("#guess").click(function(){
		currentLetter = $("#guessBox").val();
		//set all entries to lower case
		currentLetter = currentLetter.toLowerCase();
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
