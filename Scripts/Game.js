class Game {
	private var turn; // -1 -> X; 1 -> O;
	private var winner; // 0 -> X; 1 -> Tie; 2 -> O
	
	var K : int;
	private var fieldsForWin : int;
	var scoreTable : int[];
	
	// Winner Lables
	private var winnerLables : Texture2D[];
	private var X;
	private var Y;
	private var winnerLablesButtonOffset_X;
	private var winnerLablesButtonOffset_Y;
	
	private var paused : boolean;
	private var gameStarted : boolean;
	
	function Game(wnnrLbls : Texture2D[]) {
		turn = -1;
		winner = -1;
		fieldsForWin = 3;
		K = 3; //1 - Easy
		
		ResetScore();
		
		winnerLables = wnnrLbls;
		X = Screen.width/2-winnerLables[0].width/2;
		Y = Screen.height/2-winnerLables[0].height/2;
		winnerLablesButtonOffset_X = X + 0;
		winnerLablesButtonOffset_Y = Y + 141;
		
		paused = true;
		gameStarted = false;
	}
	
	function NextTurn() {
		turn = turn * (-1);
	}
	
	function CurrentTurn() {
		return turn;
	}
	
	function SetFieldsForWin(fldsFrWn : int) {
		fieldsForWin = fldsFrWn;
	}
	
	function FieldsForWin() {
		return fieldsForWin;
	}
	
	function ResetWinner() {
		winner = -1;
	}
	
	function ResetScore() {
		scoreTable = new int[3]; // 0 -> X; 1 -> Tie; 2 -> O
		for (var i : int = 0; i < 3; i++) {
			scoreTable[i] = 0;
		}
	}
	
	function SetWinner(w : int) {
		winner = w;
	}
	
	function GetWinner() {
		return winner;
	}
	
	function IsPaused() {
		return paused;
	}
	
	function SetPaused(p : boolean) {
		paused = p;
	}
	
	function IsGameStarted() {
		return gameStarted;
	}
	
	function StartNewGame() {
		gameStarted = true;
		Debug.Log("Game Started - " + gameStarted);
		ResetWinner();
		ResetScore();	
	}
	
	function AnounceResults(board : Board) {
		GUI.Label(Rect(X, Y, winnerLables[0].width, winnerLables[0].height), winnerLables[winner]);
		if (GUI.Button(Rect(winnerLablesButtonOffset_X, winnerLablesButtonOffset_Y, 383, 50), "")) {
			board.Reset();
			ResetWinner();
		}
	}
}