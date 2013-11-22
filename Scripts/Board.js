class Board extends System.ValueType {
	var size : int;
	var field;
	var buttonLabels : Texture2D[];
	
	public function Board(s : int, bttnLbls : Texture2D[]) {
		this.size = s;
		this.field = new Array(s);
		for (var i = 0; i < s; i++) {
			field[i] = new Array(s);
			for (var j = 0; j < s; j++) {
				field[i][j] = new Field(i, j);
				field[i][j].x = i;
				field[i][j].y = j;
				//Debug.Log("[" + i + "," + j + "]=" + "x:" + field[i][j].x + ", y:" + field[i][j].y);
			}
		}
		for (var i = 0; i < bttnLbls.Length; i++) {
			this.buttonLabels[i] = bttnLbls[i];
		}
	}
	
	public function Print() {
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				Debug.Log("[" + i + "," + j + "]=" + "x:" + field[i][j].x + ", y:" + field[i][j].y);
			}
		}
	}
	
	public function Reset() {
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				field[i][j].state = 0;
				field[i][j].weight = 0;
				field[i][j].isNearBy = false;
			}
		}
	}
	
	public function defineWeights() {
		
	}
}