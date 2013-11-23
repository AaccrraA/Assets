class Field {
	var i : int;
	var j : int;
	var state : int;
	var weight : int;
	var isNearBy : boolean;

	function Field(i : int, j : int) {
		this.i = i;
		this.j = j;
		state = 0;
		weight = 0;
		isNearBy = false;
	}
	
	function Reset() {
		state = 0;
		weight = 0;
		isNearBy = false;
	}
}