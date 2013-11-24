class Game {
	private var turn; // -1 -> X; 1 -> O;
	var winner; // 0 -> X; 1 -> Tie; 2 -> O
	
	var K : int;
	private var fieldsForWin : int;
	var scoreTable : int[];
	
	function Game() {
		turn = -1;
		winner = -1;
		
		fieldsForWin = 3;
		K = 2;
		scoreTable = new int[3]; // 0 -> X; 1 -> Tie; 2 -> O
		for (var i : int = 0; i < 3; i++) {
			scoreTable[i] = 0;
		}
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
		if (winner == 1) {
			turn = -1;
		}
		else if (winner == -1){
			turn = 1;
		}
		winner = -1;
	}
}