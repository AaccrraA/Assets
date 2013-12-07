class Menu {
	// Menu Window
	var X : int;
	var Y : int;
	var width : int;
	var height : int;
	var backGround : Texture2D;
	
	// Choices
	var choice_X : int;
	var choice_Y : int;
	
	var choiceWidth : int;
	var choiceHeight : int;
	
	var menuChoices=["Resume",
					"New Game",
					"Options",
					"Quit"];
	
	function Menu(bckGrnd : Texture2D) {
		width = 400;
		height = 500;
		
		X = Screen.width/2 - width/2;
		Y = Screen.height/2 - height/2;
		
		backGround = bckGrnd;
		
		choiceWidth = width;
		choiceHeight = 66;
		choice_X = X + 0;
		choice_Y = Y + choiceHeight*2;
		
	}
	
	function Open(game : Game, board : Board) {
		GUI.DrawTexture(Rect(X, Y, width, height), backGround);
		GUI.Label(Rect(X, Y, width, choiceHeight), "MENU");
		for (var i = 0; i < menuChoices.length; i++) {
			switch(i) {
				case 0: // Resumre
					if (game.IsGameStarted() && GUI.Button(Rect(choice_X, choice_Y+i*choiceHeight, choiceWidth, choiceHeight), menuChoices[i])) {
					}
					break;
				case 1: // New Game
					if (GUI.Button(Rect(choice_X, choice_Y+i*choiceHeight, choiceWidth, choiceHeight), menuChoices[i])) {
						//Debug.Log("Your choice - 0");
						game.SetPaused(false);
						game.StartNewGame();
						board.Reset();
					}
					break;
				case 2: // Options
					if (GUI.Button(Rect(choice_X, choice_Y+i*choiceHeight, choiceWidth, choiceHeight), menuChoices[i])) {
					}
					//Debug.Log("Your choice - 1");
					break;
				case 3: // Quit
					if (GUI.Button(Rect(choice_X, choice_Y+i*choiceHeight, choiceWidth, choiceHeight), menuChoices[i])) {
						//Debug.Log("Your choice - 2");
						Application.Quit();
					}
					break;
			}
		}
	}
}