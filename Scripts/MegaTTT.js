////////////
//GUI SKIN//
////////////
var myGUISkin : GUISkin; // skin без оформления(невидимый)

//////////////
//BACKGROUND//
//////////////
var backGround : Texture2D;

/////////
//BOARD//
/////////
var board : Board;
// Button Lables For Unity Inspector
var boardLables : Texture2D[]; // массив трех текстур кнопки

//////////////
//GAME PANEL//
//////////////
private var gamePanel : GamePanel;
// GamePanel Background For Unity Inspector
var gamePanelBackground : Texture2D;
// Score Labels
var xScoreDigits : Texture2D[]; //текстуры для X
var oScoreDigits : Texture2D[]; //текстуры для O
// Turn Labels
var xTurnLable : Texture2D[];
var oTurnLable : Texture2D[];

////////////
//GAMEPLAY//
////////////
var gameVars : Game;

function Start() {
	// BOARD
	// Size
	var boardSize : int;
	if (Screen.width > Screen.height - gamePanelBackground.height) {
		boardSize = (Screen.height - gamePanelBackground.height)/boardLables[0].height;
	}
	else {
		boardSize = Screen.width/boardLables[0].width;
	}
	// Position
	var x : int;
	var y : int;
	x = Screen.width/2 - (boardSize*boardLables[0].width)/2;
	y = gamePanelBackground.height;
	// Init
	board = new Board(x, y, boardSize, boardLables);
	
	// GAMEPANEL
	// Position
	x = Screen.width/2 - gamePanelBackground.width/2;
	y = 0;
	// Init
	gamePanel = new GamePanel(x, y, gamePanelBackground, xScoreDigits, oScoreDigits, xTurnLable, oTurnLable);
	
	// GAME VARIABLES
	// Init
	gameVars = new Game();
	if (boardSize < 5) {
		gameVars.SetFieldsForWin(3);
	}
	else if (boardSize == 5) {
		gameVars.SetFieldsForWin(4);
	}
	else {
		gameVars.SetFieldsForWin(5);
	}
}

///////////
//MAIN UI//
///////////
function OnGUI() {
	GUI.skin = myGUISkin;
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backGround);
	gamePanel.Draw(gameVars);
	board.DrawAndHumanTurn(gameVars);
}

function Update () {

}