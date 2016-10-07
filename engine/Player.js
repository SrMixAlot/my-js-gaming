class Player extends GameObject {

    /*
     * Player constructor, initializes player speed and game object
     */
    constructor(height, width, x, y) {
        super(height, width, x ,y);
        this.speedX = 0;
        this.speedY = 0;
    }

    /*
     * updates position of player and redraws it onto the canvas
     */
    update(context, keys) {
        _takeInput(keys);
        _newPos();
        super.draw(context);
    }

    /*
     * Updates Players x, y coordinates according to their speed
     */
    _newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    /*
     * Moves the player upward vertically
     */
    moveup(speed) {
        this.speedY = -1 * speed;
    }

    /*
     * Moves the player downward vertically
     */
    movedown(speed) {
        this.speedY = speed;
    }

    /*
     * Moves the player left horizontally
     */
    moveleft(speed) {
        this.speedX = -1 * speed;
    }

    /*
     * Moves the player right horizontally
     */
    moveright(speed) {
        this.speedX = speed;
    }

    /*
     * Detects if we have collided with the given object
     */
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

    /*
     * Given an array of key codes, take the appropriate action
     */
    _takeInput(keys) {
        if(keys)
            if(keys[37])
                moveleft();
            if(keys[39])
                moveright();
            if(keys[38])
                moveup();
            if(keys[40])
                movedown();
    }
}
