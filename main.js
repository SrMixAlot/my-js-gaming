// game objects
var gameArea;
var player;
var enemy;
var fallingBlock;
var objs = [];

/*
 * Initializes game objects
 */
function startGame() {
	gameArea = new GameArea(270,480);
	player = new Player(30,30, 10, 120);
	enemy = new Enemy(30,30, 50, 120);

	gameArea.addObj(player);

	setInterval(function() {
		spawnFallingBlock();
	}, 2000);
	
	gameArea.start();
}

/*
 * Spawns block at random position along top of the screen
 */
function spawnFallingBlock() {
	// random integer between 0 - 480
	var xcoord = Math.floor(Math.random() * (480));

	gameArea.addObj(new FallingBlock(30, 10, xcoord, 0, 2));
}
