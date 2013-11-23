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
				if (GUI.Button(Rect(X+j*boardLables[0].width, Y+i*boardLables[0].height, boardLables[0].width, boardLables[0].height), boardLables[field[i][j].state+1])) {
					if ((game.tie || game.winner) != 0) {
						Reset();
						return;
					}
					else if (field[i][j].state == 0) {
						field[i][j].state = game.turn;
						game.turn *= -1;
					}
				}
			}
		}
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
				field[i][j].state = 0;
				field[i][j].weight = 0;
				field[i][j].isNearBy = false;
			}
		}
	}
}