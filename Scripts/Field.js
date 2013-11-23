class Field {
	var i : int;
	var j : int;
	var state : int;
	var weightForX : int;
	var weightForO : int;
	var isNearBy : boolean;

	function Field(i : int, j : int) {
		this.i = i;
		this.j = j;
		state = 0;
		weightForX = -1;
		weightForO = -1;
		isNearBy = false;
	}
	
	function GetWeight() {
		if (state == -1) {
			return weightForX;
		}
		else if (state == 1) {
			return weightForO;
		}
		else {
			return -1;
		}
	}
	
	function Reset() {
		state = 0;
		weightForX = -1;
		weightForO = -1;
		isNearBy = false;
	}
}