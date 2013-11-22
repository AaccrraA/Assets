
/*
var boardArray = new Array(5);
for (var i = 0; i < 5; i++) {
	boardArray[i] = new Array(5);
	for (var j = 0; j < 5; j++) {
		boardArray[i][j] = new Field(i, j);
		print("[" + i + "," + j + "]=" + "x:" + boardArray[i][j].x + ", y:" + boardArray[i][j].y);
	}
}
*/

class Board extends System.ValueType {
	var size : int;
	var field;

	public function Board(s : int) {
		this.size = s;
		this.field = new Array(s);
		for (var i = 0; i < s; i++) {
			field[i] = new Array(s);
			for (var j = 0; j < s; j++) {
				field[i][j] = new Field(i, j);
				field[i][j].x = i;
				field[i][j].y = j;
				//Debug.Log("b");
				//print("[" + i + "," + j + "]=" + "x:" + field[i][j].x + ", y:" + field[i][j].y);
			}
		}
	}
	
	public function print() {
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				Debug.Log("[" + i + "," + j + "]=" + "x:" + field[i][j].x + ", y:" + field[i][j].y);
			}
		}
	}
}

/*
public class Board extends MonoBehaviour {
	var size : int;
	var field;
	
	public function Board(s : int) {
		this.size = s;
		this.field = new Array(s);
		for (var i = 0; i < s; i++) {
			field[i] = new Array(s);
			for (var j = 0; j < s; j++) {
				field[i][j] = new Field(i, j);
				field[i][j].x = i;
				field[i][j].y = j;
				print("_");
				//print("[" + i + "," + j + "]=" + "x:" + field[i][j].x + ", y:" + field[i][j].y);
			}
		}
	}
}*/