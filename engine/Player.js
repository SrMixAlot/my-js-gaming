class Player extends GameObject {
    constructor(height, width, x, y) {
        super(height, width, x ,y);
        this.speedX = 0;
        this.speedY = 0;
    }

    update() {
        _newPos();
        super.draw();
    }

    _newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    moveup(speed) {
        this.speedY = -1 * speed;
    }

    movedown(speed) {
        this.speedY = speed;
    }

    moveleft(speed) {
        this.speedX = -1 * speed;
    }

    moveright(speed) {
        this.speedX = speed;
    }

    crashWith(obj) {
        var left = x;
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
