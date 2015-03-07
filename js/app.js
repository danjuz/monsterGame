

var theGame = {


	grid: function () {
		var gameBoard = document.getElementById('gamePlace'); //Get the gamePlace from the HTML
		var table = document.createElement('table'); //Create the table element

		for (i = 0; i < 15; i++) {
			var tr = document.createElement('tr'); //In the first loop create tr element and give it the variable name tr

			for (j = 0; j < 15; j++) {
				var td = document.createElement('td'); //In the second loop create a td element and give it the variable naame td

				tr.appendChild(td); //append td to tr 
				table.appendChild(tr); //append tr to table
				gameBoard.appendChild(table); //append table to gameBoard in the app.html
			}
		}

		theGame.idToTd();
	},

	idToTd: function () {
		var tdAll = document.getElementsByTagName('td'); //Get all td that has been created in theGame.grid.
		for (i = 0; i < tdAll.length; i++) { //loop trough all td
			tdAll[i].setAttribute("id", i); //give every td a unique id from the loop
		}
		return tdAll; //send all td's with unique id to backgroundToTd
	},

	backgroundToTd: function () {
		backgrounToTdFunction = function (letter, startingPos, endNum, spanNum) { //a function that loops out the grassWall
			var allTd = theGame.idToTd(); //catch the returned tdAll from idToTd
			var letter = startingPos; //The letter of the loop and what number it has to start on

			while (letter <= endNum) { //Loops out pic to all the TD's at the LEFT side
				var walls = document.createElement('img'); //Create a Img element
				walls.src = 'img/grassSmall.gif'; //append the grass url to the img element
				allTd[letter].appendChild(walls); //Loops out the walls to the right td's
				letter += spanNum; //How much it has to increase
			};
		}

		backgrounToTdFunction('i', 0, 14, 1); //The upper wall
		backgrounToTdFunction('j', 29, 209, 15); //The rigth wall
		backgrounToTdFunction('k', 210, 224, 1); //The bottom wall
		backgrounToTdFunction('l', 15, 195, 15); //The left wall


		var finaldoorTd = document.getElementById('198'); //The td position for the finalDoor
		var door = document.getElementById('door'); //Get the door trough id

		finaldoorTd.appendChild(door); //Append the img to position
		
		
		theGame.monsterMove(); //Starting next function in the object tree
	},

	monsterMove: function () {
		var randomPosition = Math.floor(Math.random() * ((28 - 16) + 1) + 16); //get an exact number between 16 - 28 
		var position = document.getElementById(randomPosition); //get the td with random id. It will be the starting point for the monster

		var monster = document.getElementById('monster'); //Get the monster by ID
		position.appendChild(monster); //append monster to position

		document.onkeydown = function (e) { //If you for example press down LEFT button it reacts


			keyDownPush = function (plusminus, moveNum) { //a function that updates the newposition for updateMove() function.
				position = monster.parentElement.id; //Update the position to where the monster are on the grid
				var newPosition = (plusminus === 'plus') ? Number(position) + Number(moveNum) : position - moveNum; //function :)
				updateMove(newPosition);
			};

			switch (e.keyCode) {
			case 37: //left arrow
				keyDownPush('minus', 1); //Input to keyDownPush() function
				break;
			case 38: //up arrow
				keyDownPush('minus', 15); //  --||--
				break;

			case 39: //right arrow
				keyDownPush('plus', 1); //  --||--
				break;

			case 40: //down arrow
				keyDownPush('plus', 15); //  --||--
				break;

			}
		}

		updateMove = function (newPosition) { //Function that moves the Monster to different TD based on pressed arrow
			if (document.getElementById(newPosition).childNodes.length) { //If the newPosition has a childNodes:
				alert("CRASCH!! You can't go true an obstacle")
			} else if (newPosition === 198) { //If the newPosition is the TD with id 198:
				alert("YEY VICTORY!!");
			} else {
				var updatedPosition = document.getElementById(newPosition); //get the td with the heigher id (newPosition)
				updatedPosition.appendChild(monster); //Append the monster to the new td
			}
		}
		theGame.obstacle(); //start obstacle funktion
	},
	obstacle: function () {
		var allTd = theGame.idToTd() //Get de variable from idToTd() function where the variable got returned

		//TD position where I want the obstacle IMG to be.
		var obstaclePos = [allTd[31], allTd[32], allTd[33], allTd[34], allTd[35], allTd[36], allTd[38], allTd[39], allTd[40], allTd[51], allTd[66], allTd[81], allTd[94], allTd[64], allTd[79], allTd[109], allTd[110], allTd[112], allTd[111], allTd[113], allTd[98], allTd[68], allTd[83], allTd[53], allTd[41], allTd[42], allTd[43], allTd[62], allTd[77], allTd[107], allTd[108], allTd[92], allTd[136], allTd[137], allTd[138], allTd[139], allTd[140], allTd[141], allTd[142], allTd[143], allTd[144], allTd[145], allTd[130], allTd[115], allTd[100], allTd[101], allTd[102], allTd[55], allTd[70], allTd[71], allTd[72], allTd[73], allTd[117], allTd[147], allTd[162], allTd[177], allTd[192], allTd[205], allTd[207], allTd[175], allTd[190], allTd[170], allTd[171], allTd[172], allTd[173], allTd[188], allTd[203], allTd[185], allTd[200], allTd[182], allTd[183], allTd[167], allTd[168], allTd[197], allTd[186], allTd[187], allTd[201], allTd[202]];

		var i = 0;
		
		while (i <= 132) { //loop
			var imgContainer = document.createElement('img'); //Create a Img element
			imgContainer.src = 'img/StoneSmall.gif'; //append the stone url to the img element
			obstaclePos[i].appendChild(imgContainer); //Loops out the stonePic to the right td's
			i++;
		}
		theGame.final();
	}
};

theGame.grid();
theGame.backgroundToTd();