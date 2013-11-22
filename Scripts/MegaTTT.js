//////////
//GUI SKIN
//////////
var myGUISkin : GUISkin; // skin без оформления(невидимый)

////////////
//BACKGROUND
////////////
var backGround : Texture2D;
private var Screen_width = Screen.width;
private var Screen_height = Screen.height;

///////
//BOARD
///////
// Board Size
var boardSize : int;
if (Screen.width > Screen.height - gamePanelBackground.height) {
	boardSize = (Screen.height - gamePanelBackground.height)/boardButtons[0].height;
}
else {
	boardSize = Screen.width/boardButtons[0].width;
}
// Button Lables
var boardButtons : Texture2D[]; // массив трех текстур кнопки

// Board
var board : Board = new Board(boardSize);

////////////
//GAME PANEL
////////////
var gamePanelBackground : Texture2D;
// Score Table
private var scoreTable : int[];
scoreTable = new int[3]; // 0: X; 2: O 
for (score in scoreTable) {
	score = 0;
}
// Score Labels
var xScoreDigits : Texture2D[]; //текстуры для X
var oScoreDigits : Texture2D[]; //текстуры для O

// Turn Labels
var xTurnImage : Texture2D[];
var oTurnImage : Texture2D[];

//////////
//GAMEPLAY
//////////
// Other Variables
private var turn : int; // -1 -> X; 1 -> O;
turn = -1;
private var winner : int;
private var tie : boolean;
private var scoreSums : int[];
winner = 0;
tie = false;
scoreSums = new int[8]; // 8 выигрышных комбинаций
for (score in scoreSums) {
	score = 0;
}

/////////
//MAIN UI
/////////
function OnGUI() {
	GUI.skin = myGUISkin;
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backGround);
	DrawGamePanel();
	DrawBoard();
	Debug.Log(boardButtons.Length);
}

function DrawGamePanel() {
	// Position
	var X : int;
	var Y : int;
	X = Screen.width/2 - gamePanelBackground.width/2;
	Y = 0;
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
	
	if (turn == -1) {
		GUI.Label(Rect(X+xTurnImageOffset_x, Y+xTurnImageOffset_y, xTurnImage[0].width, xTurnImage[0].height), xTurnImage[1]);
		GUI.Label(Rect(X+oTurnImageOffset_x, Y+oTurnImageOffset_y, oTurnImage[0].width, oTurnImage[0].height), oTurnImage[0]);
	}
	else if (turn == 1){
		GUI.Label(Rect(X+oTurnImageOffset_x, Y+oTurnImageOffset_y, oTurnImage[0].width, oTurnImage[0].height), oTurnImage[1]);
		GUI.Label(Rect(X+xTurnImageOffset_x, Y+xTurnImageOffset_y, xTurnImage[0].width, xTurnImage[0].height), xTurnImage[0]);
	}
	
	// Score
}

function DrawBoard() {
	// Position
	var x : int;
	var y : int;
	x = Screen.width/2 - (board.size*boardButtons[0].width)/2;
	y = gamePanelBackground.height;
	
	// Field Buttons
	for (var i = 0; i < boardSize; i++) {
		for (var j = 0; j < boardSize; j++) {
			if (GUI.Button(Rect(x+j*boardButtons[0].width, y+i*boardButtons[0].height, boardButtons[0].width, boardButtons[0].height), boardButtons[board.field[i][j].state + 1])) {
				if ((tie || winner) != 0) {
					board.Reset();
					return;
				}
				else if (board.field[i][j].state == 0) {
					board.field[i][j].state = turn;
					turn *= -1;
				}
			}
		}
	}
}

function Update () {

}