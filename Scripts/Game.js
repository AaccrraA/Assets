class Game {
	private var turn; // -1 -> X; 1 -> O;
	var winner; // 0 -> X; 1 -> Tie; 2 -> O
	
	var K : int;
	private var fieldsForWin : int;
	var scoreTable : int[];
	
	// Winner Lables
	var winnerLables : Texture2D[];
	var winnerLablesOffset_X;
	var winnerLablesOffset_Y;
	var winnerLablesButtonOffset_X;
	var winnerLablesButtonOffset_Y;
	
	function Game(wnnrLbls : Texture2D[]) {
		turn = -1;
		winner = -1;
		fieldsForWin = 3;
		K = 2;
		
		scoreTable = new int[3]; // 0 -> X; 1 -> Tie; 2 -> O
		for (var i : int = 0; i < 3; i++) {
			scoreTable[i] = 0;
		}
		
		winnerLables = wnnrLbls;
		winnerLablesOffset_X = Screen.width/2-winnerLables[0].width/2;
		winnerLablesOffset_Y = Screen.height/2-winnerLables[0].height/2;
		winnerLablesButtonOffset_X = winnerLablesOffset_X + 0;
		winnerLablesButtonOffset_Y = winnerLablesOffset_Y + 141;
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
	
	function Reset() {
		winner = -1;
	}
	
	function AnounceResults(board : Board) {
		GUI.Label(Rect(winnerLablesOffset_X, winnerLablesOffset_Y, winnerLables[0].width, winnerLables[0].height), winnerLables[winner]);
		if (GUI.Button(Rect(winnerLablesButtonOffset_X, winnerLablesButtonOffset_Y, 383, 50), "")) {
			board.Reset();
			Reset();
		}
	}
}