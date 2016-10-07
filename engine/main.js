var gameArea;
var gameP;

/*
 * Initializes game objects
 */
function startGame() {
	gameArea = new GameArea(270,480);
	player = new Player(30,30, 10, 120);

	player.draw(gameArea.context);

	gameArea.start();
}
