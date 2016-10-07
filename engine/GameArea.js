class GameArea {

    constructor(height, width) {
        this.canvas = document.createElement("canvas");
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
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
        this.interval = setInterval(this.update, 20);
        window.addEventListener('keydown', function(e) {
			this.keys = (gameArea.keys || []);
			this.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			this.keys[e.keyCode] = false;
		})
		window.addEventListener('mousemove', function(e) {
			this.x = e.pageX;
			this.y = e.pageY;
		})
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
        this.clear;
        this.frameNo++;
    }

    /*
     * Clears the canvas
     */
    clear() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
}
