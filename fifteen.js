//Fifteen Puzzle Javascript Document

/*ID: 620076399 Extra features implemented: Multiple backgrounds*/

//Variables 
var n = 15; //Number of tiles
var win = false;
var counter = 0; //Keeps track of number of moves made
var puzzleHeight = 400; 
var emptySquare; 
var imglink = '';
//var clicked = false;

var j = 0; //resizing of divs
var k = 0; //background cropping

var puzzleDic = {"1":[0,0],"2":[0,100],"3":[0,200],"4":[0,300],"5":[100,0],"6":[100,100],"7":[100,200],"8":[100,300],"9":[200,0],"10":[200,100],"11":[200,200],"12":[200,300],"13":[300,0],"14":[300,100],"15":[300,200]}; //Reference of correct positioning of puzzle pieces 


window.onload = function()
{
	"use strict";
	
	// Get puzzle piece elements
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div');

	//UI
	var controls = document.getElementById("controls");

	//Select background
	var background = document.createElement("SELECT");
	background.id = "background";
	controls.appendChild(document.createTextNode("Select a different background:"));
	//Create array of options to be added
	var backgroundOptions = ["Samus","Zero Suit Samus","Sheik","Zelda"];
	//Create and append the options
	for (var i = 0; i < backgroundOptions.length; i++) 
	{
    	var option = document.createElement("option");
    	option.value = i;
    	option.text = backgroundOptions[i];
    	background.appendChild(option);
	}
	controls.appendChild(background);

	// Random Background
	var link = '';
	switch( Math.floor(Math.random() * (backgroundOptions.length)) )
		{
			case 0 : link = 'url(https://googledrive.com/host/0B3zmJAfIk6jvd0dCcmlybWVaUEE)'; break;
			case 1 : link = 'url(https://googledrive.com/host/0B3zmJAfIk6jvb0ZNZkRHaU1CWjg)'; break;
			case 2 : link = 'url(https://googledrive.com/host/0B3zmJAfIk6jvT2NwMHpwNGpCd1E)'; break;
			case 3 : link = 'url(https://googledrive.com/host/0B3zmJAfIk6jvWnFvYVd0dGU1Sjg)'; break;
		}
	
	
	// Arrange puzzle on screen
	position(pieces);

	// Shuffle pieces
	var shuffleButton =	document.getElementById("shufflebutton")
	shuffleButton.onclick = shuffle; 

	// Locate the empty space
	emptySquare = getSpace();
	
	
	// Play game
	for (var i=0; i< pieces.length; i++)
	{
		pieces[i].style.backgroundImage = link;
		pieces[i].className = 'puzzlepiece'; //re-sizes the div
		pieces[i].onmouseover = function(){if(moveable(this)){this.classList.add("movablepiece");}else{this.classList.remove("movablepiece");}}//Highlight piece if moveable
		pieces[i].onclick = movePiece;
			
	}

	//Change background
	background.onchange = changeBackground;
	
};

function changeBackground() //Provide several background images (at least 4) to choose from.
{

	//Get choice
	switch(document.getElementById("background").options[document.getElementById("background").selectedIndex].value)
	{
			case 0 : imglink = 'url(https://googledrive.com/host/0B3zmJAfIk6jvd0dCcmlybWVaUEE)'; break;
			case 1 : imglink = 'url(https://c83317c3d5bfbc5ada632d48ba102de5b6690188.googledrive.com/host/0B3zmJAfIk6jvb0ZNZkRHaU1CWjg)'; break;
			case 2 : imglink = 'url(https://googledrive.com/host/0B3zmJAfIk6jvT2NwMHpwNGpCd1E)'; break;
			case 3 : imglink = 'url(https://googledrive.com/host/0B3zmJAfIk6jvWnFvYVd0dGU1Sjg)'; break;
	}

	var puzzlepieces = document.getElementById("puzzlearea").getElementsByTagName('div');	

	for (var b = 0; b < puzzlepieces.length; b++)
	{
		puzzlepieces[b].style.backgroundImage = imglink;
	}
}

function position(pieces)
{
	//"use strict";
			
	
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
	

function shuffle() //Rearrange the puzzle pieces
{	//"use strict";
	
	var pieces = document.getElementById("puzzlearea").getElementsByTagName('div'); //Accessing the div of 15 divs
	var listAdjPos = [];
	var c = 0;
	
	do{
		for(var s = 0; s<pieces.length; s++){
			if(moveable(pieces[s])){
				console.log(pieces[s]);
				listAdjPos.push(pieces[s]);
			}
			else
			{
				console.log("Not moveable");
			}
		}// Finding the list of positions adjacent to the empty space from the values in the dictionary
		
		
		if(c!==0){
		
			
			for(var i=0; i<listAdjPos.length; i++){
				if(((parseInt(listAdjPos[i].style.top)) === (emptySquare[0])) && (parseInt((listAdjPos[i].style.left)) === (emptySquare[1]))){
					listAdjPos.splice(i,1);// Removing this from the list of adjacent positions
					break;
				}
			}
			
		}// Ensures that the swap isn't reversed at any point in the shuffling
			
		var choice = Math.floor(Math.random() * (listAdjPos.length-1));// Selection
		console.log("Choice:"+choice);
		//movePiece;// Position swap with empty space 
		console.log(emptySquare);
		// Switch locations
		prevPos = [parseInt(listAdjPos[choice].style.top),parseInt(listAdjPos[choice].style.left)];		
		// Execute move of given puzzle piece
		listAdjPos[choice].style.top = emptySquare[0] + "px";
	    listAdjPos[choice].style.left = emptySquare[1] + "px";
	    // Animate move
	    var movex = emptySquare[0] + "px";
	    var movey = emptySquare[1] + "px";
	    //listAdjPos[choice].style.transform = "translate3d(movex,movey, 0px)";
	    
		//Change coordinates of empty square
		emptySquare[0] = prevPos[0];
		emptySquare[1] = prevPos[1];
		
		c++;	
	}while(c<n && emptySquare!==[300,300])
}//Thus function shuffles puzzle pieces when the button is clicked

function movePiece() // Move puzzle piece to empty slot
{		
	//"use strict";
	this.setAttribute("clicked",true);
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
	
	// Calculate the points of the empty square using a grid inversion
	for (var i=0; i< pieces.length; i++)
	{
		//Rows (x)
		switch (parseInt(pieces[i].style.top))
		{
			case 0:   row1 += parseInt(pieces[i].style.left); break;
			case 100: row2 += parseInt(pieces[i].style.left); break;
			case 200: row3 += parseInt(pieces[i].style.left); break;
			case 300: row4 += parseInt(pieces[i].style.left); break;
		}
		
		
		// Columns (y)
		switch (parseInt(pieces[i].style.left))
		{
			case 0:   column1 += parseInt(pieces[i].style.top); break;
			case 100: column2 += parseInt(pieces[i].style.top); break;
			case 200: column3 += parseInt(pieces[i].style.top); break;
			case 300: column4 += parseInt(pieces[i].style.top); break;
		}
		
		
	}
	
	if (row1 !== 600) {emptyX = 0;}
		else if (row2 !== 600) {emptyX = 100;}
			else if (row3 !== 600) {emptyX = 200;}
				else if (row4 !== 600) {emptyX = 300;}
					
					
	if (column1 !== 600) {emptyY = 0;}
		else if (column2 !== 600) {emptyY = 100;} 
			else if (column3 !== 600) {emptyY = 200;}
	 			else if (column4 !== 600) {emptyY = 300;}
				
					
	//console.log(emptyX,emptyY);
	return [emptyX,emptyY]; 
}
	
function moveable(square) // Determine whether a given square can move or not 
{	
	//"use strict";	
		
	// Get location of empty square
	//var emptySquare = getSpace();
	console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
	console.log("SpaceTop(x): "+emptySquare[0]+" SpaceLeft(y): "+emptySquare[1]);
	
	// Determine whether it neighbors the empty square
	if ( parseInt(square.style.top) === emptySquare[0] )
	{
		if ( parseInt(square.style.left) + 100 === emptySquare[1] || 
			 parseInt(square.style.left) - 100 === emptySquare[1] )
		{
			//console.log("In moveable. Top - Same & Left - Changes. Can be moved");
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
				//console.log("In moveable. Top - Changes & Left - Same. Can be moved");
				return true;
			}
			else{
				return false;
			}
		 }
	else
	{
		console.log("In moveable - Not adjacent possibly");
		//console.log("Square Top(x): "+square.offsetTop+" Square Left(y):"+square.offsetLeft);
		//console.log("(Comparison) SpaceTop(x): "+emptySquare[0]+" SpaceLeft(y): "+emptySquare[1]);
		return false;
	}
		
}
