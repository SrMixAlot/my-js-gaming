class GameArea {

    constructor(height, width) {
        this.canvas = document.createElement("canvas");
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        this.gameobjs = [];
        this.keys = [];
    }

    /*
     * Inserts an html canvas onto the page
     * Initializes the frame number to zero
     * Sets the update interval to 20 milliseconds
     * Adds mouse and keyboard listeners to the window
     */
    start() {
        // insert canvas to doc
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(this.update.bind(this), 20);
        //this.clear.bind(this.interval);

        // arrow functions necessary here to retain correct this
        // explained here https://stackoverflow.com/questions/30446622/es6-class-access-to-this-with-addeventlistener-applied-on-method
        window.addEventListener('keydown', e => {
            this.keys = (this.keys || []);
            this.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', e => {
            this.keys[e.keyCode] = false;
        });
    }

    /*
     * Stops the update interval
     */
    stop() {
        clearInterval(this.interval);
    }

    /*
     * Makes a class to clear(), and updates the frame number
     */
    update() {
        //this.clear.bind(this);
        this.clear();
        this.frameNo++;

        // each game object in the game area
        // updates itself
        for (var i = 0; i < this.gameobjs.length; i++)
            this.gameobjs[i].update(this.context, this.keys);
    }

    /*
     * Clears the canvas
     */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /*
     * Add a game object to this GameArea
     */
    addObj(obj) {
        // should do some type checking here
        this.gameobjs.push(obj);
    }

    /*
     * Property getter/setters
     */

    get keys() {
        return this._keys;
    }

    set keys(val) {
        this._keys = val;
    }
}