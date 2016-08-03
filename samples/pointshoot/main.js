var gameP;
var obst = [];
var bullets = [];
var score;
var time;
var cooldown = 50;
var spawnTime = 150;
var lastshot = 0;
var crapDestroyed = 0;

var speedMultiplier = 1;

function startGame() {
	gameP = new component(30, 30, "red", 10, 120);
  score = new textEnt("30px", "Consolas", "black", 280, 40);
	time = new textEnt("20px", "Consolas", "black", 20, 250)
	gameArea.start();
}

var gameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function(e) {
			gameArea.keys = (gameArea.keys || []);
			gameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			gameArea.keys[e.keyCode] = false;
		})
		window.addEventListener('mousemove', function(e) {
			gameArea.x = e.pageX;
			gameArea.y = e.pageY;
		})
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
	stop : function () {
		clearInterval(this.interval);
	}
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
	this.speedX = 0;
	this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.moveup = function() {
		this.speedY = -1 * speedMultiplier;
	}
	this.movedown = function() {
		this.speedY = speedMultiplier;
	}
	this.moveleft = function() {
		this.speedX = -1 * speedMultiplier;
	}
	this.moveright = function() {
		this.speedX = speedMultiplier;
	}
	this.crashWith = function(obj) {
		var left = this.x;
		var right = this.x + (this.width);
		var top = this.y;
		var bottom = this.y + (this.height);
		var objleft = obj.x;
		var objright = obj.x + (obj.width);
		var objtop = obj.y;
		var objbottom = obj.y + (obj.height);
		var crash = true;
		if ((bottom < objtop) ||
				(top > objbottom) ||
				(right < objleft) ||
				(left > objright)) {
			crash = false;
		}
		return crash;
	}
}

function textEnt(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;

	this.update = function() {
		ctx = gameArea.context;
		ctx.font = this.width + " " + this.height;
		ctx.fillStyle = color;
		ctx.fillText(this.text, this.x, this.y);
	}
}

/*
 * Games main update loop
 */
function updateGameArea() {
	var x, y;

	// check if we should raise the difficulty
	if(gameArea.frameNo > (200 * speedMultiplier)) {
		// increase speed of errything
		speedMultiplier++;
	}

	// check if we colided against an obstacle
	// move to player specific class
	for(i = 0; i < obst.length; i++) {
		if(gameP.crashWith(obst[i])) {
			gameArea.stop();
			return;
		}
	}

	gameArea.clear();
	gameArea.frameNo++;

	// every 150 milliseconds spawn something
	if(gameArea.frameNo == 1 || everyinterval(spawnTime)) {
		addProjectile();
	}

	updateObstacles();

	updateBullets();

	score.text="SCORE: " + crapDestroyed;
	time.text="Time: " + gameArea.frameNo;
	score.update();
	time.update();

	gameP.speedX = 0;
	gameP.speedY = 0;

	takeInput();

	gameP.newPos();
	gameP.update();
}
// end main game upate

/*
 * Returns if we are at a certain interval
 */
function everyinterval(n) {
	if((gameArea.frameNo / n) % 1 == 0)
		return true;
	return false;
}

/*
 * Keyboard input for player
 */
function takeInput() {
	if(gameArea.keys)
		if(gameArea.keys[37])
			gameP.moveleft();
		if(gameArea.keys[39])
			gameP.moveright();
		if(gameArea.keys[38])
			gameP.moveup();
		if(gameArea.keys[40])
			gameP.movedown();
		if(gameArea.keys[32])
			shoot();
}

/*
 *Adds a projectile to damage the player
 */
function addProjectile() {
	for(var i = 0; i < speedMultiplier; i++) {
		//x = randomCanvasX();
		x = gameArea.canvas.width;
		y = randomCanvasY();
		obst.push(new component(10, 10, "green", x, y));
	}
}

/*
 * Returns a random integer between 0 and width of canvas
 */
function randomCanvasX() {
	return Math.floor((Math.random() * gameArea.canvas.width) + 1);
}

/*
 * Returns a random integer between 0 and height of canvas
 */
function randomCanvasY() {
	return Math.floor((Math.random() * gameArea.canvas.height) + 1);
}

/*
 * Spawns a bullet from players location
 */
function shoot() {
	if((gameArea.frameNo - lastshot ) > cooldown) {
		lastshot = gameArea.frameNo;
		x = gameP.x;
		y = gameP.y;
		bullets.push(new component(10, 10, "#936c6c", x, y));
	}
}

/*
 * Update logic for bullets
 */
function updateBullets() {
	for(i = 0; i < bullets.length; i++) {
		bullets[i].speedX = 4;
		bullets[i].newPos();
		bullets[i].update();

		// check if bullets hit an obstacle
		for(var z = 0; z < obst.length; z++)
			if(bullets[i].crashWith(obst[z])) {
				delete bullets[i];
				delete obst[z];
				bullets.splice(i, 1);
				obst.splice(z, 1);
				crapDestroyed++;
			}

		// if the bullets off screen
		if(bullets[i].x > gameArea.canvas.width){
			delete bullets[i];
			bullets.splice(i, 1);
		}
	}
}

/*
 * Update logic for obstacles
 */
function updateObstacles() {
	for (i = 0; i < obst.length; i++) {
		obst[i].speedX = -1 * speedMultiplier;
		obst[i].newPos();
		obst[i].update();
		if(obst[i].x < 0){
			delete obst[i];
			obst.splice(i, 1);
		}
	}
}
