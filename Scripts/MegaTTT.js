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
// Button Lables For Unity Inspector
var boardButtons : Texture2D[]; // массив трех текстур кнопки
// Board
var board : Board;

//////////////
//GAME PANEL//
//////////////
var gamePanel : GamePanel;

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
var gameVars : GameVariables;

function Start() {
	// BOARD INIT
	// Size
	var boardSize : int;
	if (Screen.width > Screen.height - gamePanelBackground.height) {
		boardSize = (Screen.height - gamePanelBackground.height)/boardButtons[0].height;
	}
	else {
		boardSize = Screen.width/boardButtons[0].width;
	}
	board = new Board(boardSize, boardButtons);
	// Position
	var x : int;
	var y : int;
	x = Screen.width/2 - (size*bB[0].width)/2;
	y = gamePanelBackground.height;

	// GAMEPANEL INIT
	// Position
	x = Screen.width/2 - gamePanelBackground.width/2;
	y = 0;
	gamePanel = new GamePanel(gamePanelBackground, );
	// GameVariables
	gameVars = new GameVariables();
}

///////////
//MAIN UI//
///////////
function OnGUI() {
	GUI.skin = myGUISkin;
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backGround);
	DrawGamePanel();
	board.Draw(gameVars);
}

function DrawGamePanel() {
	// Background
	GUI.Label(Rect(X, Y, gamePanelBackground.width, gamePanelBackground.height), gamePanelBackground);
	
	//Score
	var xScoreOffset_x : int;
	var xScoreOffset_y : int;
	var oScoreOffset_x : int;
	var oScoreOffset_y : int;
	xScoreOffset_x = 105;
	xScoreOffset_y = 10;
	oScoreOffset_x = 335;
	oScoreOffset_y = 10;
	var lDigit : int;
	var rDigit : int;
	
	//Turn Indicators
	var xTurnImageOffset_x : int;
	var xTurnImageOffset_y : int;
	var oTurnImageOffset_x : int;
	var oTurnImageOffset_y : int;
	xTurnImageOffset_x = 20;
	xTurnImageOffset_y = 24;
	oTurnImageOffset_x = 510;
	oTurnImageOffset_y = 24;
	
	if (gameVars.turn == -1) {
		GUI.Label(Rect(X+xTurnImageOffset_x, Y+xTurnImageOffset_y, xTurnImage[0].width, xTurnImage[0].height), xTurnImage[1]);
		GUI.Label(Rect(X+oTurnImageOffset_x, Y+oTurnImageOffset_y, oTurnImage[0].width, oTurnImage[0].height), oTurnImage[0]);
	}
	else if (gameVars.turn == 1){
		GUI.Label(Rect(X+oTurnImageOffset_x, Y+oTurnImageOffset_y, oTurnImage[0].width, oTurnImage[0].height), oTurnImage[1]);
		GUI.Label(Rect(X+xTurnImageOffset_x, Y+xTurnImageOffset_y, xTurnImage[0].width, xTurnImage[0].height), xTurnImage[0]);
	}
	
	// Score
}

function Update () {

}