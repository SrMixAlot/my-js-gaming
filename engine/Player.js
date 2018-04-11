/*
* Player controlled character
*/
class Player extends GameObject {

    /*
     * Player constructor, initializes player speed and game object
     */
    constructor(height, width, x, y) {
        super(height, width, x, y);

        this.speedX = 0;
        this.speedY = 0;
    }

    /*
     * Updates position of player and redraws it onto the canvas
     */
    update(context, keys) {
        this._fall();
        this._takeInput(keys);
        this._newPos();

        super.draw(context);
        
        this.speedX = 0;
        this.speedY = 0;
    }

    /*
     * Adds gravity to player
     */
    _fall() {
        if(this.y < 240) {
            this.movedown(1);
        }
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
        console.log(this.y);
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
        
        if ((bottom < objtop) ||
            (top > objbottom) ||
            (right < objleft) ||
            (left > objright)) {
            return false;
        }

        return true;
    }

    /*
     * Given an array of key codes, take the appropriate action
     */
    _takeInput(keys) {

        if (keys) {
            if (keys[37])
                this.moveleft(1);
            if (keys[39])
                this.moveright(1);
            if (keys[38])
                this.moveup(1);
            if (keys[40])
                this.movedown(1);
        }
    }
}