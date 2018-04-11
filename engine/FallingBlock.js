class FallingBlock extends Enemy {
    
    constructor(height, width, x, y, fallSpeed) {
        super(height, width, x, y);

        this.fallSpeed = fallSpeed;
    }

    // This completely overrides any parent update methods.
    update(context) {
        super.movedown(this.fallSpeed);

        if(!this.outOfBounds())
            super.update(context, [40]);
    }

    outOfBounds() {
        return this.y > 270;
    }

    // todo: garbage collection
}