class GamePanel {
	// Position  in Unity GUI
	var X : int;
	var Y : int;
	
	// Background
	var backGround : Texture2D;
	
	// Score Labels
	var xScoreDigits : Texture2D[];
	var oScoreDigits : Texture2D[];
	
	// Turn Labels
	var xTurnLable : Texture2D[];
	var oTurnLable : Texture2D[];
	
	// Score Offsets
	private var xScoreOffset_X : int;
	private var xScoreOffset_Y : int;
	private var oScoreOffset_X : int;
	private var oScoreOffset_Y : int;
	
	// Score Spacing
	var scoreSpacing : int;
	
	// Turn Offsets
	private var xTurnOffset_X : int;
	private var xTurnOffset_Y : int;
	private var oTurnOffset_X : int;
	private var oTurnOffset_Y : int;
	
	public function GamePanel(x : int, y : int, bckGrnd : Texture2D, xScrDgts : Texture2D[], oScrDgts : Texture2D[], xTrnLbl : Texture2D[], oTrnLbl: Texture2D[]) {
		// Position  in Unity GUI
		X = x;
		Y = y;
		// Background
		backGround = bckGrnd;
		// Score Labels
		xScoreDigits = xScrDgts;
		oScoreDigits = oScrDgts;
		// Turn Labels
		xTurnLable = xTrnLbl;
		oTurnLable = oTrnLbl;
		// Score Offsets
		xScoreOffset_X = 120;
		xScoreOffset_Y = 10;
		oScoreOffset_X = 320;
		oScoreOffset_Y = 10;
		// Score Spacing
		scoreSpacing = 10;
		// Turn Offsets
		xTurnOffset_X = 20;
		xTurnOffset_Y = 24;
		oTurnOffset_X = 510;
		oTurnOffset_Y = 24;
	}
	
	public function Draw(game : Game) {
		// Background
		GUI.Label(Rect(X, Y, backGround.width, backGround.height), backGround);
		
		// Indicators
		if (game.CurrentTurn() == -1) {
		GUI.Label(Rect(X+xTurnOffset_X, Y+xTurnOffset_Y, xTurnLable[0].width, xTurnLable[0].height), xTurnLable[1]);
		GUI.Label(Rect(X+oTurnOffset_X, Y+oTurnOffset_Y, oTurnLable[0].width, oTurnLable[0].height), oTurnLable[0]);
		}
		else if (game.CurrentTurn() == 1){
			GUI.Label(Rect(X+oTurnOffset_X, Y+oTurnOffset_Y, oTurnLable[0].width, oTurnLable[0].height), oTurnLable[1]);
			GUI.Label(Rect(X+xTurnOffset_X, Y+xTurnOffset_Y, xTurnLable[0].width, xTurnLable[0].height), xTurnLable[0]);
		}
		
		// Score
		var lDigit : int;
		var rDigit : int;
		// X
		lDigit = game.scoreTable[0]/10;
		rDigit = game.scoreTable[0]%10;
		if (lDigit > 9) {
			lDigit = 9;
		}
		GUI.Label(Rect(X+xScoreOffset_X, Y+xScoreOffset_Y, xScoreDigits[0].width, xScoreDigits[0].height), xScoreDigits[lDigit]);
		GUI.Label(Rect(X+xScoreOffset_X+xScoreDigits[0].width+scoreSpacing, Y+xScoreOffset_Y, xScoreDigits[0].width, xScoreDigits[0].height), xScoreDigits[rDigit]);
		// O
		lDigit = game.scoreTable[2]/10;
		rDigit = game.scoreTable[2]%10;
		if (lDigit > 9) {
			lDigit = 9;
		}
		GUI.Label(Rect(X+oScoreOffset_X, Y+oScoreOffset_Y, oScoreDigits[0].width, oScoreDigits[0].height), oScoreDigits[lDigit]);
		GUI.Label(Rect(X+oScoreOffset_X+oScoreDigits[0].width+scoreSpacing, Y+oScoreOffset_Y, oScoreDigits[0].width, oScoreDigits[0].height), oScoreDigits[rDigit]);
	}
}