class GameObject {

    constructor(height, width, x, y) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    // gameobject draws itself on the canvas
    draw(context) {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
