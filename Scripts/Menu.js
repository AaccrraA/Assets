class Menu {
	// Menu Window
	private var X : int;
	private var Y : int;
	private var width : int;
	private var height : int;
	private var backGround : Texture2D;
	
	// Choices
	private var choice_X : int;
	private var choice_Y : int;
	
	private var choiceWidth : int;
	private var choiceHeight : int;
	
	private var menuChoices=["Resume",
					"New Game",
					"Quit"];
	
	function Menu(bckGrnd : Texture2D) {
		width = 400;
		height = 264;
		
		X = Screen.width/2 - width/2;
		Y = Screen.height/2 - height/2;
		
		backGround = bckGrnd;
		
		choiceWidth = width;
		choiceHeight = 66;
		choice_X = X + 0;
		choice_Y = Y + choiceHeight;
		
	}
	
	function Open(game : Game, board : Board) {
		GUI.DrawTexture(Rect(X, Y, width, height), backGround);
		GUI.Label(Rect(X, Y, width, choiceHeight), "MENU");
		for (var i = 0; i < menuChoices.length; i++) {
			switch(i) {
				case 0: // Resumre
					if (game.IsGameStarted() && GUI.Button(Rect(choice_X, choice_Y+i*choiceHeight, choiceWidth, choiceHeight), menuChoices[i])) {
						game.SetPaused(false);
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
				case 2: // Quit
					if (GUI.Button(Rect(choice_X, choice_Y+i*choiceHeight, choiceWidth, choiceHeight), menuChoices[i])) {
						//Debug.Log("Your choice - 2");
						Application.Quit();
					}
					break;
			}
		}
	}
}