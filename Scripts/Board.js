class Board {
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
						field[i][j].Reset();
						field[i][j].state = game.turn;
						//check for win
						game.NextTurn();
						AITurn(game);
					}
				}
			}
		}
	}
	
	function AITurn(game : GameVariables) {
		DefineNearByFields();
		var nearByFields = new Array();
		var maxWeight = 0;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (field[i][j].isNearBy == true) {
					//Debug.Log("We check Field["+i+"]["+j+"] that is Nearby");
					nearByFields.Push(field[i][j]);
					CalculateWeight(game.turn, field[i][j], game);
					if (field[i][j].weight > maxWeight) {
						maxWeight = field[i][j].weight;
					}
				}
			}
		}
		//Debug.Log(nearByFields.length);
		for (i = 0; i < nearByFields.length; i++) {
			//Debug.Log("Field["+nearByFields[i].i+"]["+nearByFields[i].j+"].weight = "+nearByFields[i].weight);
			for (j = 0; j < nearByFields.length; j++) {
				if (nearByFields[i].weight > nearByFields[j].weight) {
					nearByFields.RemoveAt(j);
					
				}
			}
		}
		for ( i = 0; i < nearByFields.length; i++) {
			Debug.Log("Field["+nearByFields[i].i+"]["+nearByFields[i].j+"].weight = "+nearByFields[i].weight);
		}
		Debug.Log("_-_-_-_");
	}

	function DefineNearByFields() {
		var count = 0;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (field[i][j].state != 0) {
					//Debug.Log("Field["+i+"]["+j+"].state != 0");
					for (var k = -1; k < 2; k++) {
						for (var z = -1; z < 2; z++) {
							if (i+k >= 0 && j+z >= 0 && i+k < size && j+z < size && (k!=0 || z !=0)) {
								if (field[i+k][j+z].isNearBy == false && field[i+k][j+z].state == 0) {
									field[i+k][j+z].isNearBy = true;
									count++;
									//Debug.Log("Field["+i+"+"+k+"]["+j+"+"+z+"] is new nearByField");
								}
							}
						}
					}
				}
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
	
	function CalculateWeight(p : int, f : Field, game : GameVariables) {
		var weightForO : int = 0;
		var weightForX : int = 0;
		weightForO = HorCalcWeight(p, f, game) + VerCalcWeight(p, f, game) + LDiagCalcWeight(p, f, game) + RDiagCalcWeight(p, f, game);
		//Debug.Log("Weight of F["+f.i+"]["+f.j+"] is "+weightForO+" for "+p);
		weightForX = HorCalcWeight(p*(-1), f, game) + VerCalcWeight(p*(-1), f, game) + LDiagCalcWeight(p*(-1), f, game) + RDiagCalcWeight(p*(-1), f, game);
		//Debug.Log("Weight of F["+f.i+"]["+f.j+"] is "+weightForX+" for "+p*(-1));
		f.weight = weightForO+weightForX;
		/*
		if (weightForO > weightForX) {
			f.weight = weightForO;
		}
		else {
			f.weight = weightForX;
		}
		*/
	}
	
	function HorCalcWeight(p : int, f : Field, game : GameVariables) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		// Horizontal
		for (var i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (var k = 0; k < game.fieldsForWin; k++) {
				if (f.j+i-k >= 0 && f.j+i-k < size) {
					if (field[f.i][f.j+i-k].state == p*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i][f.j+i-k].state == p) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					if (p == 1) {
						weightOfSequence = 11;
					}
					else {
						weightOfSequence = 10;
					}
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(game.K, weightOfSequence);
			}
		}
		//Debug.Log("H _ wF = " + weightOfField);
		
		return weightOfField;
	}
	
	function VerCalcWeight(p : int, f : Field, game : GameVariables) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		
		// Vertical
		for (i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.fieldsForWin; k++) {
				if (f.i+i-k >= 0 && f.i+i-k < size) {
					if (field[f.i+i-k][f.j].state == p*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i+i-k][f.j].state == p) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					if (p == 1) {
						weightOfSequence = 11;
					}
					else {
						weightOfSequence = 10;
					}
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(game.K, weightOfSequence);
			}
		}
		//Debug.Log("V _ wF = " + weightOfField);
		
		return weightOfField;
	}
	
	function LDiagCalcWeight(p : int, f : Field, game : GameVariables) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		
		// Left Diagonal \
		for (i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.fieldsForWin; k++) {
				if ((f.i+i-k >= 0 && f.i+i-k < size) && (f.j+i-k >= 0 && f.j+i-k < size)) {
					if (field[f.i+i-k][f.j+i-k].state == p*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i+i-k][f.j+i-k].state == p) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					if (p == 1) {
						weightOfSequence = 11;
					}
					else {
						weightOfSequence = 10;
					}
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(game.K, weightOfSequence);
			}
		}
		//Debug.Log("LD _ wF = " + weightOfField);
		
		return weightOfField;
	}
	
	function RDiagCalcWeight(p : int, f : Field, game : GameVariables) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		
		// Right Diagonal /
		for (i = 0; i < game.fieldsForWin; i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.fieldsForWin; k++) {
				if ((f.i+i-k >= 0 && f.i+i-k < size) && (f.j-i+k >= 0 && f.j-i+k < size)) {
					if (field[f.i+i-k][f.j+k-i].state == p*(-1)) {
						weightOfSequence = 0;
						break;
					}
					else if (field[f.i+i-k][f.j+k-i].state == p) {
						weightOfSequence++;
					}
				}
				else {
					weightOfSequence = 0;
					break;
				}
				if (weightOfSequence == game.fieldsForWin-1) {
					if (p == 1) {
						weightOfSequence = 11;
					}
					else {
						weightOfSequence = 10;
					}
				}
			}
			
			if (weightOfSequence != 0) {
				weightOfField += Mathf.Pow(game.K, weightOfSequence);
			}
		}
		//Debug.Log("RD _ wF = " + weightOfField);
		
		return weightOfField;
	}
}