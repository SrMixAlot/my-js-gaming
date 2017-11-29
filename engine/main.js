var gameArea;
var player;
var enemy;
var objs = [];

/*
 * Initializes game objects
 */
function startGame() {
	gameArea = new GameArea(270,480);
	player = new Player(30,30, 10, 120);
	enemy = new Enemy(30,30, 50, 120);

	gameArea.addObj(player);
	gameArea.addObj(enemy);
	
	gameArea.start();
}
