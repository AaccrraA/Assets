class GamePanel extends System.ValueType {
	var x : int;
	var y : int;
	
	public function GamePanel(x : int, y : int) {
		this.x = x;
		this.y = y;
	}
	
	public function Draw(backGround : Texture2D, lDigit : int) {
		GUI.Label(Rect(this.x, this.y, this.backGround.width, this.backGround.height), this.backGround);
	}
}