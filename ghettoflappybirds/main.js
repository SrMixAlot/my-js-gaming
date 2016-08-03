var gameP;
var obst = [];
var score;

function startGame() {
	gameP = new component(30, 30, "red", 10, 120);
  score = new textEnt("30px", "Consolas", "black", 280, 40);
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
		this.speedY--;
	}
	this.movedown = function() {
		this.speedY++;
	}
	this.moveleft = function() {
		this.speedX--;
	}
	this.moveright = function() {
		this.speedX++;
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

function updateGameArea() {
	var x, y;

	for(i = 0; i < obst.length; i++) {
		if(gameP.crashWith(obst[i])) {
			gameArea.stop();
			return;
		}
	}

	gameArea.clear();
	gameArea.frameNo++;

	// every 150 milliseconds spawn something
	if(gameArea.frameNo == 1 || everyinterval(150)) {
		x = gameArea.canvas.width;
		y = gameArea.canvas.height - 200;
		obst.push(new component(10, 200, "green", x, y));
	}

	for (i = 0; i < obst.length; i++) {
		obst[i].speedX = -1;
		obst[i].newPos();
		obst[i].update();
	}

	score.text="SCORE: " +gameArea.frameNo;
	score.update();

	gameP.speedX = 0;
	gameP.speedY = 0;

	takeInput();

	gameP.newPos();
	gameP.update();
}

function everyinterval(n) {
	if((gameArea.frameNo / n) % 1 == 0)
		return true;
	return false;
}

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
}
