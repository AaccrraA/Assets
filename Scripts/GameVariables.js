class GameVariables {
	var turn; // -1 -> X; 1 -> O;
	var winner;
	var tie : boolean;
	var fieldsForWin : int;
	var turnNum : int;
	// Score Table
	var scoreTable : int[];
	
	function GameVariables() {
		turn = -1;
		winner = -1;
		tie = false;
		fieldsForWin = 3;
		turnNum = 0;
		scoreTable = new int[3]; // 0: X; 1: tie; 2: O 
		for (var i : int = 0; i < 3; i++) {
			scoreTable[i] = 0;
		}
	}
	
	function NextTurn() {
		turn = turn * (-1);
	}
	
	function Reset() {
	}
}