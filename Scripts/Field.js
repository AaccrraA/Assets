class Field extends System.ValueType{
	var x : int;
	var y : int;
	var state : int;
	var weight : int;
	var isNearBy : boolean;

	public function Field(i : int, j : int) {
		this.x = i;
		this.y = j;
		this.state = 
		this.weight = 0;
		isNearBy = false;
	}
}