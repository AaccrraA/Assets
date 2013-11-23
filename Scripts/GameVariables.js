class GameVariables {
	var turn; // -1 -> X; 1 -> O;
	var winner;
	var tie : boolean;
	// Score Table
	var scoreTable : int[];
	
	function gameVars() {
		turn = -1;
		winner = 0;
		tie = false;
		scoreTable = new int[3]; // 0: X; 1: tie; 2: O 
		for (int i = 0; i < 3; i++) {
			scoreTable[i] = 0;
		}
	}

	function Reset() {
	}
}