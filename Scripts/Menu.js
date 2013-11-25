class Menu {
	var X : int;
	var Y : int;
	var backGround : Texture2D;
	var choices : Texture2D[];
	
	// Choices
	var choices_X;
	var choices_Y;
	
	function Menu(bckGrnd : Texture2D, chces : Texture2D[]) {
		X = Screen.width/2 - bckGrnd.width/2;
		Y = Screen.height/2 - bckGrnd.height/2;
		
		backGround = bckGrnd;
		choices = chces;
		
		choices_X = X + 0;
		choices_Y = Y + 190;
	}
	
	function Open(game : Game, board : Board) {
		GUI.Label(Rect(X, Y, backGround.width, backGround.height), backGround);
		for (var i = 0; i < choices.Length; i++) {
			if (i!=0 && GUI.Button(Rect(choices_X, choices_Y+(i-1)*choices[0].height, choices[0].width, choices[0].height), choices[i-1])) {
				switch(i) { // 0 - resume
					case 1:
						Debug.Log("Your choice - 0");
						game.SetPaused(false);
						game.StartNewGame();
						board.Reset();
						break;
					case 2:
						Debug.Log("Your choice - 1");
						break;
					case 3:
						Debug.Log("Your choice - 2");
						Application.Quit();
						break;
				}
			}
			else if (game.IsGameStarted()) {
				if (GUI.Button(Rect(choices_X, choices_Y-choices[0].height, choices[0].width, choices[0].height), choices[3])) {
					game.SetPaused(!game.IsPaused());
				}
			}
		}
	}
}