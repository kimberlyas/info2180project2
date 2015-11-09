//Fifteen Puzzle Javascript Document

//Variables 
var n = 15; //Number of tiles
var win = false;
var counter = 0; //Keeps track of number of moves made
var puzzleHeight = 400; 
var emptySquare; 

var j = 0; //resizing of divs
var k = 0; //background cropping

var puzzleDic = {"1":[0,0],"2":[0,100],"3":[0,200],"4":[0,300],"5":[100,0],"6":[100,100],"7":[100,200],"8":[100,300],"9":[200,0],"10":[200,100],"11":[200,200],"12":[200,300],"13":[300,0],"14":[300,100],"15":[300,200]}; //Reference of correct positioning of puzzle pieces 


window.onload = function()
{
	"use strict";
	
	// Get puzzle piece elements
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div');
	
	// Arrange puzzle on screen
	position(pieces);
	
	// Shuffle pieces
	document.getElementById("shufflebutton").onclick = shuffle; 
	
	emptySquare = getSpace();
	
	// Play game
	for (var i=0; i< pieces.length; i++)
	{
		pieces[i].className = 'puzzlepiece'; //re-sizes the div
		//pieces[i].onmouseover = movablePiece; 
		//pieces[i].onmouseout = resetPiece;
		
		//console.log("Call was made to movePiece with "+pieces[i].offsetTop+", "+pieces[i].offsetLeft);
    	pieces[i].onclick = movePiece;
	}
	
	// New Play Game
	/*while(!win){
		for (var i=0; i< pieces.length; i++)
		{
			pieces[i].className = 'puzzlepiece'; //re-sizes the div
			//pieces[i].onmouseover = movablePiece; 
			//pieces[i].onmouseout = resetPiece;
			
			console.log("Call was made to movePiece with "+movePiece);
    		pieces[i].onclick = movePiece;
			
			if(hasWon(pieces[i]){
				win = true;	
			}
		}
	}**/
};

/*function hasWon(){
	
}*/

function position(pieces)
{
	//"use strict";
	
	// The puzzle element dimensions
	//var puzzle = document.getElementById("puzzlearea");
	//var puzzleHeight = puzzle.offsetHeight;
	
	// Get puzzle piece elements
	//var pieces = document.getElementById("puzzlearea").getElementsByTagName('div');
		
	
	// Tile positioning
	
	for (var x = 0; x < puzzleHeight; x+= 100)
	{
		for (var y = 0; y < puzzleHeight; y +=100)
		{	
			if(j!==15){
				pieces[j].style.top = x + "px";
				pieces[j].style.left = y + "px";
				j++;
				//console.log(x,y);
			}	
			else{
				break;
			}
		}
	}
	
	// Background image positioning 
	
	for (var yPos = puzzleHeight; yPos >= 100; yPos-= 100)
	{
		for (var xPos = 0; xPos >= -1*(puzzleHeight-100); xPos -= 100)
		{
			if(k!==15){
				pieces[k].style.backgroundPosition = (xPos + "px ") + (yPos + "px");
				//console.log(xPos, yPos);
				k++;
			}
			else{
				break;
			}
		}
	}
}
	
function resetPiece()
{
		this.className = 'puzzlepiece'; //re-sizes the div
} //Once the cursor is no longer hovering over the square, its appearance should revert to its original state

function shuffle()
{	//"use strict";
	
	var listAdjPos = [];
	var c = 0;
	
	do{
		for(key in puzzleDic){
			if(movable(puzzleDic[key])){
				listAdjPos.push(puzzleDic[key]);
			}
		}// Finding the list of positions adjacent to the empty space from the values in the dictionary
		
		if(c!==0){
			//priorPos = getSpace;// Delimiter - Get current empty position prior to swap
			var remove = listAdjPos.indexOf(priorPos);// Finding the index of the prior position
			listAdjPos.splice(remove,1);// Removing this from the list of adjacent positions
		}// Ensures that the swap isn't reversed at any point in the shuffling
			
		var choice = Math.floor(Math.random() * (listAdjPos.length-1));// Selection
		movePiece(listAdjPos[choice]);// Position swap with empty space 
		
		c++;	
	}while(c<n && spacePos!==[300,300])
}//Shuffles puzzle pieces when the button is clicked

function movePiece() // Move puzzle piece to empty slot
{		
	//"use strict";
	var temp = [];
	
	// Get location of empty slot
	//var emptySquare = getSpace();
	//console.log("Empty Square coordinates: "+emptySquare);
	
	if (moveable(this))
	{
		console.log(emptySquare);
		// Get location of piece to be moved
		//var pieceLocation = [parseInt(this.style.top),parseInt(this.style.left)];
		// Switch locations
		//temp = pieceLocation;
		temp = [parseInt(this.style.top),parseInt(this.style.left)];
		//pieceLocation = emptySquare;
		//emptySquare = temp;
		
		// Execute move of given puzzle piece
		this.style.top = emptySquare[0] + "px";
	    	this.style.left = emptySquare[1] + "px";
		
		//Change coordinates of empty square
		emptySquare[0] = temp[0];
		emptySquare[1] = temp[1];
		// Count move
		counter++;
		console.log("Count of Moves: "+counter);
	}
	else
	{ console.log("In movePiece. This: X --> "+this.offsetTop+" Y --> "+this.offsetLeft+" ... Not able to be moved");}
}

function getSpace() // Keep track of where the empty square is
{
	//"use strict";
	
	// 1(puzzlearea) - (all inner divs) = size of empty slot and if empty exists
	// width/top = x, height/left = y
	
	// Inside the puzzle
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div');
	
	// Empty square
	var emptyX = 0;
	var emptyY = 0;
	
	// Row/Column Grid
	var column1 = 0;
	var column2 = 0;
	var column3 = 0;
	var column4 = 0;
	var row1 = 0;
	var row2 = 0;
	var row3 = 0;
	var row4 = 0;
	
	// Calculate the points of the empty square
	for (var i=0; i< pieces.length; i++)
	{
		//Rows (x)
		switch (parseInt(pieces[i].style.top))
		{
			case 0:   row1 += parseInt(pieces[i].style.left); console.log(" Added to Row 1: "+row1);  break;
			case 100: row2 += parseInt(pieces[i].style.left);console.log("Added to Row 2: "+row2); break;
			case 200: row3 += parseInt(pieces[i].style.left); console.log("Added to Row 3: "+row3);break;
			case 300: row4 += parseInt(pieces[i].style.left); console.log("Added to Row 4: "+row4);break;
			default: console("Damn Stupid 1 thing! #kmft - In Top Switch");break;
		}
		
		console.log("Row 1: "+row1);console.log("Row 2: "+row2);
		console.log("Row 3: "+row3);console.log("Row 4: "+row4);
		
		// Columns (y)
		switch (parseInt(pieces[i].style.left))
		{
			case 0:   column1 += parseInt(pieces[i].style.top); console.log("Added to Column 1: "+column1);break;
			case 100: column2 += parseInt(pieces[i].style.top);console.log("Added to Column 2: "+column2); break;
			case 200: column3 += parseInt(pieces[i].style.top); console.log("Added to Column 3: "+column3);break;
			case 300: column4 += parseInt(pieces[i].style.top);console.log("Added to Column 4: "+column4); break;
			default: console("Damn Stupid2 thing! #kmft - In Left Switch");break;
		}
		
		console.log("Column 1: "+column1);console.log("Column 2: "+column2);
		console.log("Column 3: "+column3);console.log("Column 4: "+column4);
		
	}
	
	if (row1 !== 600) {emptyX = 0;}
		else if (row2 !== 600) {emptyX = 100;}
			else if (row3 !== 600) {emptyX = 200;}
				else if (row4 !== 600) {emptyX = 300;}
					else if(row1===600 && row2===600 && row3===600 && row4===600)
						{
							console.log("Hardcode --> Row 1?!");
							/*switch(emptyX)
							{
								case 0:   emptyX = (row1-300); break;
								case 100: emptyX = (row1-200); break;
								case 200: emptyX = (row1-100); break;
								case 300: emptyX = (row1-0); break;
							}*/
					}
					
	if (column1 !== 600) {emptyY = 0;}
		else if (column2 !== 600) {emptyY = 100;} 
			else if (column3 !== 600) {emptyY = 200;}
	 			else if (column4 !== 600) {emptyY = 300;}
					else if(column1===600 && column2===600 && column3===600 && column4===600){
						console.log("Hardcode --> Column 1?!");
						/*switch(emptyY)
							{
								case 0:   emptyY = (column1-300); break;
								case 100: emptyY = (column1-200); break;
								case 200: emptyY = (column1-100); break;
								case 300: emptyY = (column1-0); break;
							}*/
					}
					
	//console.log(emptyX,emptyY);
	return [emptyX,emptyY]; 
}
	
function moveable(square) // Determine whether a given square can move or not 
{	
	//"use strict";	
		
	// Get location of empty square
	//var emptySquare = getSpace();
	console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
	console.log("(Comparison) SpaceTop(x): "+emptySquare[0]+" SpaceLeft(y): "+emptySquare[1]);
	
	// Determine whether it neighbors the empty square
	if ( parseInt(square.style.top) === emptySquare[0] )
	{
		if ( parseInt(square.style.left) + 100 === emptySquare[1] || 
			 parseInt(square.style.left) - 100 === emptySquare[1] )
		{
			console.log("In moveable. Top - Same & Left - Changes. Can be moved");
			return true;
		}
		else{
			return false;	
		}
	}
	else if ( parseInt(square.style.left) === emptySquare[1] )
		 {   
			if ( parseInt(square.style.top) + 100 === emptySquare[0] || 
			     parseInt(square.style.top) - 100 === emptySquare[0] )
			{
				console.log("In moveable. Top - Changes & Left - Same. Can be moved");
				return true;
			}
			else{
				return false;
			}
		 }
	else
	{
		console.log("In moveable - Not adjacent possibly");
		console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
		console.log("(Comparison) SpaceTop(x): "+emptySquare[0]+" SpaceLeft(y): "+emptySquare[1]);
		return false;
	}
		
}

function movablePiece() //Highlight piece if moveable
{
	//"use strict";
		if (moveable(this))
		{
			this.className = 'movablepiece';
		}
	
} 
