class Field {
	var x : int;
	var y : int;
	var state : int;
	var weight : int;
	var isNearBy : boolean;

	function Field(i : int, j : int) {
		x = i;
		y = j;
		state = 0;
		weight = 0;
		isNearBy = false;
	}
}