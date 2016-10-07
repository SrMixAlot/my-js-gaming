var gameArea;
var gameP;

function startGame() {
	gameArea = new GameArea(270,480);
	gameP = new Player(30,30, 10, 120);
	gameP.draw(gameArea.context);
	gameArea.start();
}
