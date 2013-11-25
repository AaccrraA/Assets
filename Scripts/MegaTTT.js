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
private var board : Board;
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

////////
//GAME//
////////
private var game : Game;
// WinnerLable
var winnerLables : Texture2D[];

////////
//MENU//
////////
var menu : Menu;
// MenuBackGround For Unity Inspector
var menuBackGround : Texture2D;
// Menu Choices
var menuChoices : Texture2D[];

//////////////
//START INIT//
//////////////
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
	
	// GAME
	// Init
	game = new Game(winnerLables);
	if (boardSize < 5) {
		game.SetFieldsForWin(3);
	}
	else if (boardSize == 5) {
		game.SetFieldsForWin(4);
	}
	else {
		game.SetFieldsForWin(5);
	}
	
	// MENU
	menu = new Menu(menuBackGround, menuChoices);
}

///////////
//MAIN UI//
///////////
function OnGUI() {
	GUI.skin = myGUISkin;
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backGround);

	if (game.IsPaused() == true) {
		menu.Open(game, board);
	}
	else {
		GameCycle();
		if (Input.GetKeyUp(KeyCode.Escape)) {
			game.SetPaused(!game.IsPaused());
		}
	}
}

function GameCycle () {
	gamePanel.Draw(game);
	board.Draw(game);
	if (game.GetWinner() == -1) {
		if (game.CurrentTurn() == -1) {
			if (board.HumanTurn(game)) {
				board.Update(game);
			}
		}
		else if (game.CurrentTurn() == 1){
			board.AITurn(game);
			board.Update(game);
		}
	}
	else {
		game.AnounceResults(board);
	}
}