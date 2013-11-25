class Board {
	var X : int;
	var Y : int;
	var size;
	var field;
	var boardLables : Texture2D[];
	var lastField : Field;
	
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
		lastField = field[0][0];
	}
	
	function Draw(game : Game) {
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				GUI.Label(Rect(X+j*boardLables[0].width, Y+i*boardLables[0].height, boardLables[0].width, boardLables[0].height), boardLables[field[i][j].state+1]);
			}
		}
	}
	
	function HumanTurn(game : Game) {
		var isMadeTurn = false;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (GUI.Button(Rect(X+j*boardLables[0].width, Y+i*boardLables[0].height, boardLables[0].width, boardLables[0].height), "") && field[i][j].state == 0) {
					//  && game.CurrentTurn() == -1) {
					field[i][j].Reset();
					field[i][j].state = game.CurrentTurn();
					lastField = field[i][j];
					game.NextTurn();
					Debug.Log("You had turn at field["+i+"]["+j+"]");
					isMadeTurn = true;
				}
			}
		}
		return isMadeTurn;
	}
	
	function Update(game : Game) {
		if (game.GetWinner() == -1) {
			var isEnd = false;
			var f = lastField;
			// Horiontal
			if (!isEnd) {
				var count = 1;
				for (var z = 1; z < game.FieldsForWin(); z++) {
					if (f.j-z >= 0) {
						if (field[f.i][f.j-z].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.j+z < size) {
						if (field[f.i][f.j+z].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				if (count >= game.FieldsForWin()) {
					game.SetWinner(f.state + 1);
					game.scoreTable[f.state+1]++;
					//Reset();
					//game.Reset();
					isEnd = true;
				}
				//Debug.Log("H _ count ="+count);
			}
			
			// Vertical
			if (!isEnd) {
				count = 1;
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.i-z >= 0) {
						if (field[f.i-z][f.j].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.i+z < size) {
						if (field[f.i+z][f.j].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				if (count >= game.FieldsForWin()) {
					game.SetWinner(f.state + 1);
					game.scoreTable[f.state+1]++;
					//Reset();
					//game.Reset();
					isEnd = true;
				}
				//Debug.Log("V _ count ="+count);
			}
			
			if (!isEnd) {
				// Left Diagonal \count = 1;
				count = 1;
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.i-z >= 0 && f.j-z >= 0) {
						if (field[f.i-z][f.j-z].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.i+z < size && f.j+z < size) {
						if (field[f.i+z][f.j+z].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				if (count >= game.FieldsForWin()) {
					game.SetWinner(f.state + 1);
					game.scoreTable[f.state+1]++;
					//Reset();
					//game.Reset();
					isEnd = true;
				}
				//Debug.Log("LD _ count ="+count);
			}
			
			if (!isEnd) {
				// Right Diagonal /
				count = 1;
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.i-z >= 0 && f.j+z < size) {
						if (field[f.i-z][f.j+z].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				for (z = 1; z < game.FieldsForWin(); z++) {
					if (f.i+z < size && f.j-z >= 0) {
						if (field[f.i+z][f.j-z].state == f.state) {
							count++;
						}
						else {
							break;
						}
					}
				}
				if (count >= game.FieldsForWin()) {
					game.SetWinner(f.state + 1);
					game.scoreTable[f.state+1]++;
					//Reset();
					//game.Reset();
					isEnd = true;
				}
				//Debug.Log("RD _ count ="+count);
			}
			
			if (!isEnd) {
				// Tie
				count = 0;
				for(var i = 0; i < size; i++) {
					for (var j = 0; j < size; j++) {
						if (field[i][j].state == 0) {
							count++;
						}
					}
				}
				if (count == 0) {
					game.SetWinner(1);
					//Reset();
					//game.Reset();
					isEnd = true;
				}
				//Debug.Log("Tie = " + isEnd);
			}
		}
		
		return isEnd;
	}
	
	function AITurn(game : Game) {
		DefineNearByFields();
		var nearByFields = new Array();
		var maxWeight = 0;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (field[i][j].isNearBy == true) {
					//Debug.Log("We check Field["+i+"]["+j+"] that is Nearby");
					nearByFields.Push(field[i][j]);
					CalculateWeight(game.CurrentTurn(), field[i][j], game);
					if (field[i][j].weight > maxWeight) {
						maxWeight = field[i][j].weight;
					}
				}
			}
		}
		
		//Debug.Log("MAX WEIGHT IS "+maxWeight);
		for ( i = 0; i < nearByFields.length; i++) {
			if (maxWeight > nearByFields[i].weight) {
				//Debug.Log("field["+nearByFields[i].i+"]["+nearByFields[i].j+"] need to remove in index "+i);
				nearByFields.RemoveAt(i);
				i--;
			}
		}
		
		var r : int;
		if (nearByFields.length != 0) {
			r = Random.Range(0,nearByFields.length);
			nearByFields[r].Reset();
			nearByFields[r].state = game.CurrentTurn();
			lastField = nearByFields[r];
			game.NextTurn();
			Debug.Log("O had turn at field["+nearByFields[r].i+"]["+nearByFields[r].j+"]");
		}
		else {
			var emptyFields = new Array();
			Debug.Log("Lol There is No NEARBYFIELDS +O+O++O+O");
			for (i = 0; i < size; i++) {
				for (j = 0; j < size; j++) {
					if (field[i][j].state == 0) {
						emptyFields.push(field[i][j]);
					}
				}
			}
			if (emptyFields.length != 0) {
				r = Random.Range(0,emptyFields.length);
				emptyFields[r].Reset();
				emptyFields[r].state = game.CurrentTurn();
				lastField = emptyFields[r];
				game.NextTurn();
				Debug.Log("O had turn at field["+emptyFields[r].i+"]["+emptyFields[r].j+"]");
			}
		}
	}

	function DefineNearByFields() {
		var nearByCount = 0;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (field[i][j].state != 0) {
					//Debug.Log("Field["+i+"]["+j+"].state != 0");
					for (var k = -1; k < 2; k++) {
						for (var z = -1; z < 2; z++) {
							if (i+k >= 0 && j+z >= 0 && i+k < size && j+z < size && (k!=0 || z !=0)) {
								if (field[i+k][j+z].isNearBy == false && field[i+k][j+z].state == 0) {
									field[i+k][j+z].isNearBy = true;
									nearByCount++;
									//Debug.Log("Field["+i+"+"+k+"]["+j+"+"+z+"] is new nearByField");
								}
							}
						}
					}
				}
			}
		}
		
		return nearByCount;
	}
	
	function Reset() {
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				field[i][j].Reset();
			}
		}
	}
	
	function CalculateWeight(p : int, f : Field, game : Game) {
		var weightForO : int = 0;
		var weightForX : int = 0;
		weightForO = HorCalcWeight(p, f, game) + VerCalcWeight(p, f, game) + LDiagCalcWeight(p, f, game) + RDiagCalcWeight(p, f, game);
		//Debug.Log("Weight of F["+f.i+"]["+f.j+"] is "+weightForO+" for "+p);
		weightForX = HorCalcWeight(p*(-1), f, game) + VerCalcWeight(p*(-1), f, game) + LDiagCalcWeight(p*(-1), f, game) + RDiagCalcWeight(p*(-1), f, game);
		//Debug.Log("Weight of F["+f.i+"]["+f.j+"] is "+weightForX+" for "+p*(-1));
		f.weight = weightForO+weightForX;
	}
	
	function HorCalcWeight(p : int, f : Field, game : Game) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		// Horizontal
		for (var i = 0; i < game.FieldsForWin(); i++) {
			weightOfSequence = 0;
			for (var k = 0; k < game.FieldsForWin(); k++) {
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
				if (weightOfSequence == game.FieldsForWin()-1) {
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
	
	function VerCalcWeight(p : int, f : Field, game : Game) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		
		// Vertical
		for (i = 0; i < game.FieldsForWin(); i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.FieldsForWin(); k++) {
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
				if (weightOfSequence == game.FieldsForWin()-1) {
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
	
	function LDiagCalcWeight(p : int, f : Field, game : Game) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		
		// Left Diagonal \
		for (i = 0; i < game.FieldsForWin(); i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.FieldsForWin(); k++) {
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
				if (weightOfSequence == game.FieldsForWin()-1) {
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
	
	function RDiagCalcWeight(p : int, f : Field, game : Game) {
		var weightOfField = 0;
		var weightOfSequence = 0;
		
		// Right Diagonal /
		for (i = 0; i < game.FieldsForWin(); i++) {
			weightOfSequence = 0;
			for (k = 0; k < game.FieldsForWin(); k++) {
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
				if (weightOfSequence == game.FieldsForWin()-1) {
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