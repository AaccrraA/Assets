class GamePanel {
	// Position  in Unity GUI
	var X : int;
	var Y : int;
	
	// Background
	var backGround : Texture2D;
	
	// Score Labels
	var xScoreDigits : Texture2D[]; //текстуры для X
	var oScoreDigits : Texture2D[]; //текстуры для O
	
	// Turn Labels
	var xTurnLable : Texture2D[];
	var oTurnLable : Texture2D[];
	
	public function GamePanel(x : int, y : int, bckGrnd : Texture2D, xScrDgts : Texture2D[], oScrDgts : Texture2D[], xTrnLbl : Texture2D[], oTrnLbl: Texture2D[]) {
		X = x;
		Y = y;
		backGround = bckGrnd;
		xScoreDigits = xScrDgts;
		oScoreDigits = oScrDgts;
		xTurnLable = xTrnLbl;
		oTurnLable = oTrnLbl;
		
	}
	
	public function Draw(backGround : Texture2D, lDigit : int) {
		GUI.Label(Rect(this.x, this.y, this.backGround.width, this.backGround.height), this.backGround);
	}
}