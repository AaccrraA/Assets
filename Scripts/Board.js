class Board{
	var X : int;
	var Y : int;
	var size;
	var field;
	var boardLables : Texture2D[];

	function Board(x : int, y : int, s : int, brdLbls : Texture2D[]) {
		X = x;
		Y = y;
		size = s;
		boardLables = brdLbls;
		field = new Array(s);
		for (var i = 0; i < s; i++) {
			field[i] = new Array(s);
			for (var j = 0; j < s; j++) {
				field[i][j] = new Field(i, j);
			}
		}
	}
	
	function Draw(game : GameVariables) {
		// Field Buttons
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (GUI.Button(Rect(X+j*boardLables[0].width, Y+i*boardLables[0].height, boardLables[0].width, boardLables[0].height), boardLables[field[i][j].state+1]) && field[i][j].state == 0) {	
					field[i][j].state = game.turn;
					game.turn *= -1;
					//isWin(field[i][j], game);
				}
			}
		}
	}
	
	function isWin(f : Field, game : GameVariables) { // -1 - X; 1 - O
		for (var i = 0; i < game.fieldsForWin; i++) {
			if (f.x + i < size) {
				var count = 0;
				for (var j = 1; j < game.fieldsForWin; j++) {
					if (f.x-j >= 0) {
						if (this.field[f.x-j][f.y].state == f.state) {
							count++;
							if (count == game.fieldsForWin) {
								return true;
							}
						}
						else {
							break;
						}
					}
				}
			}
			else {
				break;
			}
		
		}
	}
	
	function CalculateWeight(player : int, f : Field, game : GameVariables) {
		var K = 1;
		var weightOfField : int = 0;
		var weightOfSequence : int = 0;
		var count : int = 0;
		// Horizontal
		for (var i = 0; i < game.fieldsForWin; i++) {
			if (f.i+i < size) {
				weightOfSequence = 0;
				for (var k = 0; k < game.fieldsForWin; k++) {
					count = 0;
					if (f.i-k >= 0) {
						if (field[f.i-k][f.j].state == player*(-1)) {
							count = 0;
							break;
						}
						else if (field[f.i-k][f.j].state == player) {
							count++;
						}
					}
					if (count == game.fieldsForWin-1) {
						weightOfSequence = 10;
					}
				}
				if (weightOfSequence != 0) {
					weightOfField += Mathf.Pow(K, weightOfSequence);
				}
			}
		}
		// Vertical
		for (i = 0; i < game.fieldsForWin; i++) {
			if (f.i+i < size) {
				weightOfSequence = 0;
				for (k = 0; k < game.fieldsForWin; k++) {
					count = 0;
					if (f.i-k >= 0) {
						if (field[f.i-k][f.j].state == player*(-1)) {
							count = 0;
							break;
						}
						else if (field[f.i-k][f.j].state == player) {
							count++;
						}
					}
					if (count == game.fieldsForWin-1) {
						weightOfSequence = 10;
					}
				}
				if (weightOfSequence != 0) {
					weightOfField += Mathf.Pow(K, weightOfSequence);
				}
			}
		}
		// Left Diagonal \
		// Right Diagonal /
	}
	
	function Print() {
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				Debug.Log("[" + i + "," + j + "]=" + "x:" + field[i][j].x + ", y:" + field[i][j].y);
			}
		}
	}
	
	function Reset() {
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				field[i][j].Reset();
			}
		}
	}
}