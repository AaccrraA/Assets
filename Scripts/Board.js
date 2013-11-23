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
					if (field[i][j].state == 0) {
						field[i][j].state = game.turn;
						if (field[i][j].isNearBy) {
							field[i][j].isNearBy = false;
							Debug.Log("We something change^^");
						}
						game.turn *= -1;
						AITurn(game);
					}
				}
			}
		}
	}

	function CalculateWeight(player : int, f : Field, game : GameVariables) {
		var K = 2;
		var weightOfField : int = 0;
		var weightOfSequence : int = 0;

		// Horizontal
		for (var i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (var k = 0; k < game.fieldsForWin; k++) {
				if (f.j+i-k >= 0 && f.j+i-k < size) {
					if (field[f.i][f.j+i-k].state == player*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i][f.j+i-k].state == player) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					weightOfSequence = 10;
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(K, weightOfSequence);
			}
		}
		Debug.Log("H _ wF = " + weightOfField + " _ wS = " + weightOfSequence);
		
		// Vertical
		for (i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.fieldsForWin; k++) {
				if (f.i+i-k >= 0 && f.i+i-k < size) {
					if (field[f.i+i-k][f.j].state == player*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i+i-k][f.j].state == player) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					weightOfSequence = 10;
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(K, weightOfSequence);
			}
		}
		Debug.Log("V _ wF = " + weightOfField + " _ wS = " + weightOfSequence);
		
		// Left Diagonal \
		for (i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.fieldsForWin; k++) {
				if ((f.i+i-k >= 0 && f.i+i-k < size) && (f.j+i-k >= 0 && f.j+i-k < size)) {
					if (field[f.i+i-k][f.j+i-k].state == player*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i+i-k][f.j+i-k].state == player) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					weightOfSequence = 10;
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(K, weightOfSequence);
			}
		}
		Debug.Log("LD _ wF = " + weightOfField + " _ wS = " + weightOfSequence);

		// Right Diagonal /
		for (i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.fieldsForWin; k++) {
				if ((f.i+i-k >= 0 && f.i+i-k < size) && (f.j-i+k >= 0 && f.j-i+k < size)) {
					if (field[f.i+i-k][f.j+k-i].state == player*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i+i-k][f.j+k-i].state == player) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					weightOfSequence = 10;
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(K, weightOfSequence);
			}
		}
		Debug.Log("RD _ wF = " + weightOfField + " _ wS = " + weightOfSequence);
		
		if (player == -1) {
			f.weightForX = weightOfField;
		}
		else {
			f.weightForO = weightOfField;
		}
	}
	
	function AITurn(game : GameVariables) {
		DefineNearByFields();
	}
	
	function DefineNearByFields() {
		var count = 0;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (field[i][j].state != 0) {
					for (var k = -1; k < 2; k++) {
						for (var z = -1; z < 2; z++) {
							if (i+k >= 0 && j+z >= 0 && i+k < size && j+z < size && (k!=0 || z !=0)) {
								if (field[i+k][j+z].isNearBy == false && field[i+k][j+z].state == 0) {
									field[i+k][j+z].isNearBy = true;
									count++;
								}
							}
						}
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
				field[i][j].Reset();
			}
		}
	}
}